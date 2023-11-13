class dataRegex {
	/***************** 유효성 체크 *****************/
	/**
	 * 이메일
	 * @param {String} email
	 * @returns Boolean
	 */
	static validEmail(email) {
		let reg =
			/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		return reg.test(email);
	}

	/**
	 * 숫자
	 * @param {String} num
	 * @returns Boolean
	 */
	static validNumber(num) {
		let reg = /[0-9]/;
		return reg.test(num);
	}

	/**
	 * 특수문자
	 * @param {String} str
	 * @returns Boolean
	 */
	static validSpecial(str) {
		let reg = /[~!@#$%^&*()_+|<>?:{}]/;
		return reg.test(str);
	}

	/**
	 * 영문 (대소문자)
	 * @param {String} num
	 * @returns Boolean
	 */
	static validEnglish(str) {
		let reg = /[a-zA-Z]/;
		return reg.test(str);
	}

	/**
	 * 영문 (대소문자) 및 숫자
	 * @param {String} str
	 * @returns Boolean
	 */
	static validEnglishAndNum(str) {
		let reg = /^[0-9a-zA-Z]+$/;
		return reg.test(str);
	}

	/**
	 * 연속된 숫자 확인
	 * @param {*} num
	 * @param {*} cnt
	 * @returns
	 */
	static repeatNumber(num, cnt) {
		let replace = '[0-9]{' + cnt + '}';
		let reg = new RegExp(replace);
		return reg.test(num);
	}

	static repeatEnglish(str, cnt) {
		let replace = '[a-zA-Z]{' + cnt + '}';
		let reg = new RegExp(replace);
		return reg.test(str);
	}

	static repeatSpecial(str, cnt) {
		let replace = '[~!@#$%^&*()_+|<>?:{}]{' + cnt + '}';
		let reg = new RegExp(replace);
		return reg.test(str);
	}

	static getByteLength(str) {
		let totalByte = 0;

		for (let i in str) {
			totalByte += this.getCharByte(str[i]);
		}
		return totalByte;
	}

	static getCharByte(char) {
		if (char == null || char.length == 0) {
			return 0;
		}

		let charCode = char.charCodeAt(0);

		if (charCode <= 0x00007f) {
			return 1;
		} else if (charCode <= 0x0007ff) {
			return 2;
		} else if (charCode <= 0x00ffff) {
			return 3;
		} else {
			return 4;
		}
	}

	/***************** File Upload *****************/
	/**
	 * 확장자가 이미지인지 확인
	 * @param {*} str
	 * @returns
	 */
	static isImage(str) {
		let reg = new RegExp('gif|jpe?g|tiff?|png|webp|bmp$/i');
		return reg.test(str);
	}

	/**
	 * FormData로 전송받은 decodeDisposition decoding
	 * @param {*} disposition
	 * @returns URI
	 */
	static decodeDisposition(disposition) {
		return decodeURI(
			disposition.split('filename=')[1].replace(/\"/g, ''),
		).replace(/\;/g, '');
	}

	/**
	 * 파일 제한 조건(사이즈, 파일 종류) 검증
	 * @param	file  : 선택된 파일
	 *			sizeLimit  : 제한 파일 사이즈
	 *			extLimit : 제한 확장자 목록 (;구분자로 여러 파일 지정 - 서버 설정)
	 */
	static checkUploadFile(file, sizeLimit, extLimit) {
		// 파일 용량 제한 확인.
		let limit = toNum(decode(sizeLimit, null, -1, sizeLimit));
		if (limit != -1) {
			if (file.size > limit * 1024) {
				showMessage('업로드 가능한 용량을 초과하였습니다.');
				return false;
			}
		}
		let fileName = file.name;
		// 파일 확장자 체크. 파일명에 . 이 들어갔을 경우 업로드 가능해야 한다.
		let ext = String(fileName).substr(fileName.lastIndexOf('.') + 1);
		let arrExt = String(extLimit).split('|');
		if (length(arrExt) > 0) {
			let extValid = false;
			for (let i = 0; i < length(arrExt); i++) {
				if (arrExt[i] == toLower(ext)) {
					extValid = true;
					break;
				}
			}
			if (!extValid) {
				showMessage('업로드 가능한 파일이 아닙니다.');
				return false;
			}
		}
		return true;
	}

	/**
	 * 필수 입력 체크
	 */
	static checkRequired(obj) {
		let $objInput = $(obj);
		let text = $objInput.attr('id');
		try {
			text = $objInput.prev('label').text();
			if (isNull(text)) {
				text = $objInput.parent().prev().find('label').text();
			}
			if (isNull(text)) {
				text = $objInput.attr('title');
			}
		} catch (e) {}
		if ($objInput.hasClass('number')) {
			if ($objInput.val() == '' || parseFloat($objInput.val().trim()) == 0) {
				showMessage('MSG.COM.VAL.006', text).done(function () {
					$objInput.focus();
				}); // {0}을(를) 입력해 주십시오.
				return false;
			} else {
				return true;
			}
		} else {
			if (
				$objInput.get(0).type == 'checkbox' ||
				$objInput.get(0).type == 'radio'
			) {
				let objName = $objInput.get(0).name;
				if ($("input[name='" + objName + "']:checked").length == 0) {
					showMessage('MSG.COM.VAL.006', text).done(function () {
						$objInput.focus();
					}); // {0}을(를) 입력해 주십시오.
					return false;
				} else {
					return true;
				}
			} else if ($objInput.hasClass('calendarM')) {
				if ($objInput.val() == '') {
					showMessage('MSG.COM.VAL.006', text); // {0}을(를) 입력해 주십시오.
					return false;
				} else {
					return true;
				}
			} else {
				if ($.trim($objInput.val()) == '') {
					showMessage('MSG.COM.VAL.006', text).done(function () {
						$objInput.focus();
					}); // {0}을(를) 입력해 주십시오.
					return false;
				} else {
					return true;
				}
			}
		}
	}

	/**
	 * 입력유효성체크
	 *
	 * @param  parentId
	 * @return bool(true:유효하지않음, false:유효함)
	 * @example
	 *   if (isNotValid('searchForm')) return;
	 *   if (isNotValid('saveForm')) return;
	 *   if (isNotValid('otherDiv')) return;
	 */
	static isNotValid(parentId) {
		let isValid = true;
		$('#' + parentId)
			.find(':input:not(:disabled)')
			.each(function () {
				let input = $(this);
				if (input.attr('required') != undefined) {
					isValid = checkRequired(input);
					if (!isValid) return isValid;
				}
				if (input.attr('maxbyte') != undefined) {
					isValid = checkMaxbyte(input, input.attr('maxbyte'));
					if (!isValid) return isValid;
				}
				if (input.attr('maxnumber') != undefined) {
					isValid = checkMaxNumber(input, input.attr('maxnumber'));
					if (!isValid) return isValid;
				}
			});
		return !isValid;
	}

	/**
	 * 검색어 valid
	 * [] 포함 확인
	 * @param {*} char
	 * @returns 포함(true), 미포함(false)
	 */
	static validSearchChar(char) {
		let reg = /[\[\]]/g;
		return reg.test(char ?? '');
	}
}
export default dataRegex;
