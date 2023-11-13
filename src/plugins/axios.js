import axios from 'axios';
import VueCookies from 'vue-cookies';

import router from '@/routes';

import { DEFAULT_LOCALE } from '@/utils/constCommon';
import jwt from '@/utils/jwt';
import { useLoading } from '@/plugins/loader/loader';
import { useMessage } from '@/plugins/message/message';

// Token refresh 중복 요청 처리
let subscribers = [];
let isRefresh = false;

const loader = useLoading();
const message = useMessage();

export default {
	install() {
		/**
		 * default settings
		 */
		axios.defaults.withCredentials = false;
		axios.defaults.baseURL = import.meta.env.VITE_API_URL;
		axios.defaults.timeout = 10000;

		const acceptLanguage = { 'Accept-language': DEFAULT_LOCALE };
		axios.defaults.headers.get = acceptLanguage;
		axios.defaults.headers.post = acceptLanguage;
		axios.defaults.headers.put = acceptLanguage;
		axios.defaults.headers.delete = acceptLanguage;

		/**
		 * request interceptors
		 */
		axios.interceptors.request.use(
			config => {
				// Request Header 정의
				const reqAccessToken = VueCookies.get('accessToken');

				if (reqAccessToken) {
					config.headers.Authorization = `Bearer ${reqAccessToken}`;
				} else {
					delete config.headers.Authorization;
				}
				// loading
				loader.show();
				return config;
			},
			error => {
				// loading
				loader.hide();
				return Promise.reject(error);
			},
		);

		/**
		 * response interceptors
		 */
		axios.interceptors.response.use(
			res => {
				// loding
				loader.hide();
				return res;
			},
			async error => {
				// loading
				loader.hide();

				const errorRes = error.response;
				console.log('errorResponse', error);

				if (errorRes === undefined) {
					// Network error
					router.push({ name: 'error', query: { type: 'error' } });
				} else {
					if (errorRes.status === 401) {
						// access token 만료
						if (errorRes.data?.statusCode === -1001) {
							// 새로 고침 진행중
							if (isRefresh) {
								return new Promise(resolve => {
									this.subscribeTokenRefresh(error.config, resolve);
								});
							}
							// 토큰 새로고침
							await this.getRefreshToken(error);
						} else {
							// access token 유효성 실패 및 토큰 만료(-1002)
							jwt.logout();
						}
					} else if (errorRes.status === 403 || errorRes.status === 404) {
						router.push({ name: 'error' });
					} else if (errorRes.status === 400) {
						message.showAlert({
							message: errorRes.data.statusMessage,
						});
					} else if (errorRes.status === 500) {
						message.showAlert({
							message:
								'시스템 오류가 발생하였습니다. 시스템관리자에 문의 바랍니다. need18',
						});
					} else {
						router.push({ name: 'error', query: { type: 'error' } });
					}
				}
				return Promise.reject(error);
			},
		);
	},
	/**
	 * 토큰 새로고침
	 * @param {*} error
	 */
	async getRefreshToken(error) {
		// refresh 실행
		isRefresh = true;
		let params = {
			accessToken: VueCookies.get('accessToken'),
			refreshToken: VueCookies.get('refreshToken'),
		};

		// refresh api
		await axios
			.post('/common/auth/refreshtoken', params)
			.then(res => {
				if (res.status === 200 && res.data?.statusCode === 0) {
					// 토큰 현행화
					const token = res.data.data;
					this.setToken(token, error);
					// 토큰 현행화 시간 대기
					setTimeout(() => {
						// 요청 API refresh
						isRefresh = false;
						axios.request(error.config);
						// 구독 API 호출 (재요청 리스트)
						subscribers.forEach(sub => {
							sub.resolve(axios.request(sub.config));
						});
						subscribers = [];
					}, 10);
				} else {
					isRefresh = false;
					subscribers = [];
					jwt.logout();
				}
			})
			.catch(() => {
				// 초기값
				isRefresh = false;
				subscribers = [];
			});
	},
	/**
	 * 토큰 설정
	 * @param {*} data
	 * @param {*} error
	 */
	setToken(data, error) {
		jwt.saveToken(data.accessToken, data.refreshToken);
		error.config.headers.Authorization = `Bearer ${data.accessToken}`;
	},
	/**
	 * 구독 토큰 정보
	 * @param {*} config
	 * @param {*} resolve
	 */
	subscribeTokenRefresh(config, resolve) {
		subscribers.push({ config: config, resolve: resolve });
	},
};
