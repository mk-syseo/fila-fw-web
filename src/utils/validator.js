import _ from 'lodash-es';
import commonUtils from '@/utils/commonUtils';

const validator = {
	init() {
		/**
		 * element : 검증 대상 Element(<input> 태그)
		 * validates : 검증 조건   (ex) required, minLen10, ...
		 * validateFn : 사용자 정의 검증 함수
		 */
		this.elements = new Map();
		this.validates = new Map();
		this.elementsTitle = new Map();
		this.validateFn = new Map();
		return this;
	},
	/**
	 * 주어진 element에서 disabled가 아닌 검증 대상을 찾아 반환한다
	 * @param {element} element
	 */
	getValidateElements(element) {
		const collections = _.concat(
			...element.getElementsByTagName('input'),
			...element.getElementsByTagName('textarea'),
		);

		let targetElement;
		for (let idx = 0; idx < collections.length; idx++) {
			if (
				!commonUtils.isEmpty(collections[idx]) &&
				!collections[idx].disabled
			) {
				targetElement = collections[idx];
				break;
			}
		}

		return targetElement;
	},
	/**
	 *
	 * @param {element} targetElement 검증 대상 element
	 * @param {array} expression 검증 조건의 배열 (ex) ['required', 'minLen10', ... ]
	 * @param {*} title element의 타이틀 속성
	 * @param {function} validateFn 사용자 정의 검증 함수
	 */
	addValidator(targetElement, expression, title, validateFn) {
		this.elements.set(targetElement.id, targetElement);
		this.validates.set(targetElement.id, expression);
		this.elementsTitle.set(targetElement.id, title);
		if (!commonUtils.isEmpty(validateFn)) {
			this.validateFn.set(targetElement.id, validateFn);
		}
	},
	/**
	 * 검증 대상과 조건을 저장
	 * @param {element} key 검증 대상 element 정보
	 *                      id는 <input id="value">에서의 value
	 * @param {string} expression 검증 조건의 목록 (ex) required|minLen10|...
	 * @param {function} validateFn 사용자 정의 검증 함수
	 * @returns
	 */
	setupValidator(key, expression, validateFn) {
		if (key === undefined || expression === undefined) return;

		const validates = expression
			.replace(/'/g, '')
			.split('|')
			.map(validate => {
				let numberIndex = validate.search(/[0-9]/);

				if (numberIndex !== -1) {
					return {
						condition: validate.slice(0, validate.search(/[0-9]/)),
						param: validate.slice(validate.search(/[0-9]/)),
					};
				} else {
					return {
						condition: validate,
					};
				}
			});

		switch (key.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
				this.addValidator(key, validates, key.title, validateFn);
				break;
			default:
				// <a-select>, <a-radio>, <div> 내에 존재 시
				let targetElement = this.getValidateElements(key);

				if (commonUtils.isEmpty(targetElement)) {
					// <a-radio>의 경우 mounted 시점에 HTML Collection이 감지되지않기때문에 딜레이를 주어야한다
					setTimeout(() => {
						targetElement = this.getValidateElements(key);
						this.addValidator(targetElement, validates, key.title, validateFn);
					}, 100);
				} else {
					this.addValidator(targetElement, validates, key.title, validateFn);
				}
				break;
		}
		return;
	},

	/**
	 * 입력된 값이 등록된 검증 조건을 만족하는지 검증을 수행한다
	 * @param {array[object]} checkList setupValidator에 등록된 id와 각 값이 key-value로 저장된 배열
	 *                                  (ex) PopBbs.vue의 bbsData
	 * @param {string} optional 동일한 변수명이 있는 경우 구분을 위한 구분자
	 * @returns
	 */
	checkInputValidation(checkList, optional = null) {
		// object는 전달받은 데이터의 key로, validates의 <id>와 동일하다. (ex) PopBbs.vue의 bbsData 내 bbsTpCd 등
		for (const object in checkList) {
			console.log('checkInputValidation', object);

			// 구분자가 있는 경우, validates/elements에서는 변경된 Key를 사용하고 checkList에서는 object를 사용한다
			const target = optional ? object + optional : object;
			const validateFn = this.validateFn.get(target);

			if (this.validates.has(target)) {
				// checkList는 전달받은 데이터 리스트. 검증 조건을 만족하는지 이 값으로 판단
				for (const condition of this.validates.get(target)) {
					let result = validateCondition(
						condition,
						checkList[object],
						checkList,
						validateFn,
					);

					if (result === false || result === undefined) {
						const errorNode = this.elements.get(target);
						const label =
							errorNode.getAttribute('title') ??
							this.elementsTitle.get(target) ??
							object;

						errorNode.parentNode.classList.add('error');
						errorNode.focus();
						console.log('errorNode!', errorNode);
						console.log('object', object);
						console.log('condition', condition);
						console.log('------------------------------------------\n\n');
						return { errorNode, object, condition, label };
					}
				}
			}
		}
		return {};
	},

	/**
	 * Directive validation 체크
	 * parent 화면의 id와 v-model value 값이 일치해야됨
	 * @param {*} data
	 * @returns
	 */
	checkFormValidation(data, optional = null) {
		// const { t } = i18n.getI18n().global;

		const { errorNode, object, condition, label } = this.checkInputValidation(
			data,
			optional,
		);

		console.log('label~~', label);

		// let strI18n = this.elementsTitle.get(object);
		if (object !== undefined) {
			// 유효 검증 미충족
			if (condition.condition !== 'func') {
				// messageBox.showAlert(
				// 	'',
				// 	t(`validation.${condition.condition}`, [label, condition?.param]),
				// 	false,
				// 	() => {
				// 		errorNode.focus();
				// 	},
				// );
				console.log('error', object);
				console.log('error Condition', condition.condition);
			} else {
				errorNode.focus();
			}
			return false;
		}
		return true;
	},
};

export default validator.init();

/**
 * Validate Function
 * - 검증 조건(condition)별 검증 로직
 */
function validateCondition(validate, value, data, validateFn) {
	switch (validate.condition) {
		case 'required':
			if (commonUtils.isEmpty(value)) {
				return false;
			} else {
				return true;
			}
		case 'email':
			return dataRegex.validEmail(value);
		case 'number':
			return dataRegex.validNumber(value);
		case 'minLen':
			if (commonUtils.isEmpty(value) || value.length < validate.param) {
				return false;
			} else {
				return true;
			}
		case 'maxByte':
			if (dataRegex.getByteLength(value) > value.param) {
				return false;
			} else {
				return true;
			}
		case 'func':
			// 사용자 정의 검증 함수
			if (commonUtils.isEmpty(validateFn)) {
				messageBox.showAlert('', t(`validation.noCustomFn`), false);
				return false;
			}
			return validateFn(value, data);

		default:
			return true;
	}
}
