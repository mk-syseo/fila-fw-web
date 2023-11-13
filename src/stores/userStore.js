import { defineStore } from 'pinia';
import _ from 'lodash-es';

import i18n from '@/lang';
import apiCall from '@/plugins/apiCall';

import cookiesStorage from '@/stores/cookie';
import useMenuStore from '@/stores/menuStore';

import { DEFAULT_LOCALE } from '@/utils/constCommon';
import { LOCALES } from '@/utils/constCommon';
import commonUtils from '@/utils/commonUtils';

const initialUser = {
	user: {},
	accessToken: '',
	refreshToken: '',
	locale: DEFAULT_LOCALE,
	theme: 'default',
	langs: [...LOCALES],
	isAccessInfo: false,
	loginType: false,
	logDtm: '',
	ipAddr: '',
};

const useUserStore = defineStore({
	id: 'userStore',
	state: () => _.cloneDeep(initialUser),
	actions: {
		async load() {
			// 로그인 상태 user 현행화
			if (!commonUtils.isEmpty(this.accessToken)) {
				// 토큰만료 새로고침 화면 멈춤 현상으로 catch 적용
				await apiCall
					.get('/common/main/user')
					.then(res => {
						if (res && res.data && res.data.data) {
							this.user = Object.assign({}, res.data.data);

							// TO-DO 개인화 정보 넣기
							// this.locale = res.data.locale ?? DEFAULT_LOCALE;
						} else {
							this.logout();
						}
					})
					.catch(() => {});

				apiCall.get('/common/main/getLatestLogin').then(res => {
					this.logDtm = res.data.data[0].logDtm;
					this.ipAddr = res.data.data[0].ipAddr;
				});
			}
		},
		async setLocale(locale) {
			console.log('userStore setLocale', locale);
			i18n.setLocale(locale);
			await useMenuStore().load();
			window.location.reload();
		},
		// reset() {
		// 	let locale = i18n.getLocale();
		// 	this.$reset();
		// 	// reset 시간 충돌
		// 	setTimeout(() => {
		// 		i18n.setLocale(locale);
		// 	}, 50);
		// },
		login(accessToken, refreshToken) {
			this.accessToken = accessToken;
			this.refreshToken = refreshToken;
		},
		sessionCheck() {
			if (
				!commonUtils.isEmpty(this.accessToken) &&
				!commonUtils.isEmpty(this.refreshToken)
			) {
				return true;
			} else {
				return false;
			}
		},
		logout() {
			Object.keys(initialUser).map(key => {
				this[key] = initialUser[key];
			});
		},
	},
	persist: {
		enabled: true,
		strategies: [
			// {
			// 	key: constCommon.STORAGE.USER_TOKEN,
			// 	storage: localStorage,
			// 	paths: ['accessToken', 'isAccessInfo'],
			// },
			// {
			// 	key: constCommon.STORAGE.LOCALE,
			// 	storage: localStorage,
			// 	paths: ['locale'],
			// },
			{
				key: 'user',
				storage: localStorage,
				paths: ['user', 'locale'],
			},
			{
				key: 'theme',
				storage: cookiesStorage,
				paths: ['theme'],
			},
			{
				key: 'accessToken',
				storage: cookiesStorage,
				paths: ['accessToken'],
			},
			{
				key: 'refreshToken',
				storage: cookiesStorage,
				paths: ['refreshToken'],
			},
		],
	},
});

export default useUserStore;
