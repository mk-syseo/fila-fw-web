import dataRegex from '@/utils/dataRegex';

class utils {
	/**
	 * Empty 체크
	 * @param {*} value
	 * @returns
	 */
	static isEmpty(value) {
		if (
			value == '' ||
			value == null ||
			value == 'null' ||
			value == undefined ||
			(value != null && typeof value == 'object' && !Object.keys(value).length)
		) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * NVL
	 * @param {*} strValue null 값 비교 대상
	 * @param {*} nullValue strValue가 null일 경우의 반환값
	 * @returns
	 */
	static nvl(strValue, nullValue) {
		if (this.isEmpty(strValue)) return nullValue;
		return strValue;
	}

	/***************** 문자열 *****************/
	/**
	 * 문자열에 들어 있는 특정한 문자를 지운다. removedChar 지워질 문자열
	 */
	static removeChar(str, removedChar) {
		if (typeof str == 'undefined' || str == null) return str;
		if (typeof removedChar == 'undefined' || removedChar == null) return str;
		if (typeof str != 'string') str = new String(str);
		let regExp = new RegExp(removedChar, 'g');
		return str.replace(regExp, '');
	}

	/**
	 * 문자열에 있는 모든 영어를 소문자로 바꾸는 Basic API
	 */
	static toLower(args) {
		if (this.isNull(args)) return '';
		return String(args).toLowerCase();
	}

	/**
	 * 특수문자 제거
	 */
	static removeSpacCharRegExr(str, regExp) {
		return str.replace(regExp, '');
	}

	static removeSpecChar(str) {
		let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
		return removeSpacCharRegExr(str, regExp);
	}

	/**
	 * Byte 입력 제한 체크
	 */
	static checkMaxbyte(obj, maxByte) {
		let $objInput = $(obj);
		let val = $objInput.val();
		// let text = !isNull($objInput.attr('title'))
		// 	? $objInput.attr('title')
		// 	: $objInput.attr('id');

		// 숫자포맷팅이 되어 있는 경우 콤마를 제거하여 검사한다.
		if ($objInput.hasClass('number') && $objInput.attr('mask')) {
			val = val.replace(/,/g, '');
		}
		// Byte 입력 제한 체크
		if (val.getByte() > maxByte) {
			showMessage('MSG.COM.VAL.035', maxByte).done(function () {
				$objInput.select();
				$objInput.focus();
			});
			return false;
		} else {
			return true;
		}
	}

	/**
	 *  숫자 입력 제한 체크
	 */
	static checkMaxNumber(obj, maxNumber) {
		let $objInput = $(obj);
		let val = $objInput.val();
		val = val.replace(/,/g, '');
		val = val.replace(/%/g, '');
		// let title = $objInput.attr('title');
		if (val == '') return true;
		let regExp;
		let strMsg;
		if (maxNumber.indexOf(',') != -1) {
			let arr = maxNumber.split(',');
			if (arr[1] == 0) {
				regExp = new RegExp('^\\d{1,' + arr[0] + '}$', 'g');
				strMsg = '정수 : ' + arr[0] + '자리 이하로 입력하여 주십시오.';
			} else {
				regExp = new RegExp(
					'^\\d{1,' + (arr[0] - arr[1]) + '}(\\.\\d{1,' + arr[1] + '})?$',
					'g',
				);
				strMsg =
					'정수 ' +
					(arr[0] - arr[1]) +
					'자리 / 소수 ' +
					arr[1] +
					'자리 이하로 입력하여 주십시오.';
			}
		} else {
			regExp = new RegExp('^\\d{1,' + maxNumber + '}$', 'g');
			strMsg = '정수 : ' + maxNumber + '자리 이하로 입력하여 주십시오.';
		}
		if ($objInput.attr('title') != undefined)
			strMsg = $objInput.attr('title') + '은(는) ' + strMsg;
		if (regExp.test(val)) return true;
		showMessageByText(strMsg).done(function () {
			$objInput.focus();
		});
		return false;
	}

	/**
	 * GET Method 요청 시 param에 '[', ']' 포함 여부
	 * @param {*} request Axios Request GET Method에 전달되는 parameters
	 * @returns boolean
	 */
	static checkGetReqParam(request = {}) {
		let res = true;

		Object.keys(request).forEach(key => {
			if (
				typeof request[key] !== 'array' &&
				dataRegex.validSearchChar(request[key])
			) {
				res = false;
				return;
			}
		});

		return res;
	}

	/**
	 * Object value 값 확인
	 * @param {*} obj
	 * @param {*} value
	 * @returns 있으면 value, 없으면 undefined
	 */
	static getKeyByValue(obj, value) {
		return Object.keys(obj).find(key => obj[key] === value);
	}

	static getImageUrl(image) {
		return `${import.meta.env.VITE_URL}/images/${image}`;
	}
}

export default utils;
