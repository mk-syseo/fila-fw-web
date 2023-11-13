import axios from 'axios';
import { createI18n } from 'vue-i18n';

import ko from '@/lang/ko';
import en from '@/lang/en';

import { useLocalStorage } from '@/utils/useLocalStorage';

// script 사용을 위한 변수
let globalI18n = null;

export default {
	install(app) {
		let locale = useLocalStorage('user', 'locale');

		// create I18n
		this.i18n = createI18n({
			legacy: false,
			inheritLocale: true,
			locale: locale.substring(0, 2),
			fallbackLocale: 'ko',
			messages: { ko, en },
		});

		// locale 적용
		this.setLocale(locale);

		app.config.globalProperties.$i18n = this.i18n;
		globalI18n = this.i18n;
		app.use(this.i18n);
	},
	setLocale(locale) {
		if (this.i18n?.global) {
			// i18n 글로벌 등록
			const lang = locale.substring(0, 2);
			this.i18n.global.locale.value = lang;

			// axios header 수정
			const acceptLanguage = { 'Accept-language': locale };
			axios.defaults.headers.get = acceptLanguage;
			axios.defaults.headers.post = acceptLanguage;
			axios.defaults.headers.put = acceptLanguage;
			axios.defaults.headers.delete = acceptLanguage;
		}
	},
	getLocale() {
		// default: ko-KR
		return useLocalStorage('user', 'locale');
	},
	getI18n() {
		return globalI18n;
	},
};
