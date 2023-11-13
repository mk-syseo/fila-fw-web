import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

import 'dayjs/locale/ko';

/**
 * i18n
 * default: es
 * https://day.js.org/docs/en/installation/installation
 */
dayjs.locale('ko');

class dateUtils {
	/**
	 * 날짜 설정
	 * @param {string} date 날짜 값
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns Boolean
	 */
	static setDate(date, format) {
		return dayjs(date).format(format);
	}

	/**
	 * 유효한 날짜인지 확인
	 * @param {String} date 날짜 값
	 * @param {String} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns Boolean
	 */
	static isValidDate(date, format) {
		return dayjs(date, format, true).isValid();
	}

	/**
	 * 기간 계산
	 * @param {object} duration 두 날짜 사이의 기간을 얻기위한 변수
	 * @property {date} duration.from 시작일자
	 * @property {date} duration.to 종료일자
	 * @property {string} duration.unit 단위(일, 월, 연 등), 기본값은 일('d')
	 * @return 두 날짜 사이의 기간
	 */
	static getDuration(duration) {
		const { from, to, unit = 'd' } = duration;

		return Math.abs(dayjs(from).diff(dayjs(to), unit));
	}

	/**
	 * 현재 시간
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static getToday(format) {
		if (format) {
			return dayjs().format(format);
		}
		return dayjs().format();
	}

	/**
	 * 날짜 더하기 (일)
	 * @param {string} date 날짜 값
	 * @param {number} num 변경 숫자
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static addDays(date, num, format) {
		if (format) {
			return dayjs(date).add(Number(num), 'day').format(format);
		}
		return dayjs(date).add(Number(num), 'day').format();
	}

	/**
	 * 날짜 더하기 (월)
	 * @param {string} date 날짜 값
	 * @param {number} num 변경 숫자
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static addMonths(date, num, format) {
		if (format) {
			return dayjs(date).add(Number(num), 'month').format(format);
		}
		return dayjs(date).add(Number(num), 'month').format();
	}

	/**
	 * 날짜 더하기 (년)
	 * @param {string} date 날짜 값
	 * @param {number} num 변경 숫자
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static addYear(date, num, format) {
		if (format) {
			return dayjs(date).add(Number(num), 'year').format(format);
		}
		return dayjs(date).add(Number(num), 'year').format();
	}

	/**
	 * 날짜 빼기 (일)
	 * @param {string} date 날짜 값
	 * @param {number} num 변경 숫자
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static subtractDays(date, num, format) {
		if (format) {
			return dayjs(date).subtract(Number(num), 'day').format(format);
		}
		return dayjs(date).subtract(Number(num), 'day').format();
	}

	/**
	 * 날짜 빼기 (월)
	 * @param {string} date 날짜 값
	 * @param {number} num 변경 숫자
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static subtractMonths(date, num, format) {
		if (format) {
			return dayjs(date).subtract(Number(num), 'month').format(format);
		}
		return dayjs(date).subtract(Number(num), 'month').format();
	}

	/**
	 * 날짜 빼기 (년)
	 * @param {string} date 날짜 값
	 * @param {number} num 변경 숫자
	 * @param {string} format 날짜 형식 (YYYY-MM-DD HH:mm:ss)
	 * @returns
	 */
	static subtractYear(date, num, format) {
		if (format) {
			return dayjs(date).subtract(Number(num), 'year').format(format);
		}
		return dayjs(date).subtract(Number(num), 'year').format();
	}

	/**
	 * date validation - 유효한 날짜인지 확인
	 * @param {string} date 날짜 값
	 * @param {*} type
	 * @returns Boolean
	 */
	static isValid(date, type) {
		return dayjs(date, type, true).isValid();
	}

	/**
	 * 이전 일자 여부
	 * @param {string} from 시작 날짜
	 * @param {string} to 종료 날짜
	 * @returns true (시작 < 종료), false (시작 >= 종료)
	 */
	static isBefore(from, to) {
		return dayjs(from).isBefore(dayjs(to));
	}

	/**
	 * 이후 일자 여부
	 * @param {string} from 시작 날짜
	 * @param {string} to 종료 날짜
	 * @returns true (시작 > 종료), false (시작 <= 종료)
	 */
	static isAfter(from, to) {
		return dayjs(from).isAfter(dayjs(to));
	}

	/**
	 * 이전 일자 여부 (동일 포함)
	 * @param {string} from 시작 날짜
	 * @param {string} to 종료 날짜
	 * @returns true (시작 <= 종료), false (시작 > 종료)
	 */
	static isSameOrBefore(from, to) {
		return dayjs(from).isSameOrBefore(dayjs(to));
	}

	/**
	 * 이후 일자 여부 (동일 포함)
	 * @param {string} from 시작 날짜
	 * @param {string} to 종료 날짜
	 * @returns true (시작 >= 종료), false (시작 < 종료)
	 */
	static isSameOrAfter(from, to) {
		return dayjs(from).isSameOrAfter(dayjs(to));
	}

	/**
	 * 타임존 변경(from 타임존 → to 타임존)
	 * @param {string} time 변경대상 일시
	 * @param {string} from 변경대상 타임존
	 * @param {string} to 변경목표 타임존
	 * @returns
	 */
	// static changeTimeZone(time, from, to) {
	// 	if (time == null || from == to) {
	// 		return time;
	// 	}

	// 	return dayjs.tz(time, from).clone().tz(to).format('YYYY-MM-DD HH:mm:ss');
	// }

	/**
	 *
	 * @param {object} changeObj
	 */
	static changeTimeZone(changeObj) {
		const { time, from, to, format } = changeObj;

		if (time == null || from == to) {
			return time;
		}

		return dayjs
			.tz(time, from)
			.clone()
			.tz(to)
			.format(format ?? 'YYYY-MM-DD HH:mm:ss');
	}
}

export default dateUtils;
