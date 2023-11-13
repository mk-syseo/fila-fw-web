export const MENU_INFO = Object.freeze({
	APP_ID: 'app',
	APP_PATH: '/',
	PAGE_ID: 'page',
	HOME_ID: 'home',
	HOME_PATH: '/home',
	HOME_NAME: 'Home',
	LOGIN_PATH: '/login',
	SYSMGT_MENU_PATH: '/sysmgt/func/menu/menu',
	NOT_FOUND_NAME: 'notFound',
	REFRESH_PATH: '/refresh',
	MAX_TAB_SIZE: 10,
});

export const DEFAULT_MENU_ICON = 'icon-pc-monitor';
export const MENU_ICON = Object.freeze({
	FO_MGT_STD_01: 'icon-pc-code', // 공통코드관리
	FO_MGT_STD_17: 'icon-pc-code-book', // 공통코드 다국어관리
	FO_MGT_STD_02: 'icon-pc-list-check', // 메뉴관리
	FO_MGT_STD_03: 'icon-pc-list', // 메뉴 다국어관리
	FO_MGT_STD_04: 'icon-pc-options', // 권한관리
	FO_MGT_STD_05: 'icon-pc-carousel', // 권한별 메뉴관리
	FO_MGT_STD_06: 'icon-pc-house-check', // 권한별 사용자관리
	FO_MGT_STD_07: 'icon-pc-user', // 사용자관리
	FO_MGT_STD_08: 'icon-pc-note', // 배치 수행 이력
	FO_MGT_STD_10: 'icon-pc-shield-check', // IP허용 예외관리
	FO_MGT_STD_13: 'icon-pc-monitor', // 시스템 예외 이력
});

// LOCALE
export const DEFAULT_LOCALE = 'ko-KR';
export const LOCALES = Object.freeze([
	{ value: 'ko-KR', label: 'ko-KR' },
	{ value: 'en-US', label: 'en-US' },
	{ value: 'zh-CN', label: 'zh-CN' },
]);
