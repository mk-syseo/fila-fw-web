import VueCookies from 'vue-cookies';
import commonUtils from '@/utils/commonUtils';

export default {
	/**
	 * 토큰 저장
	 * @param {*} accessToken
	 * @param {*} refreshToken
	 */
	saveToken(accessToken, refreshToken) {
		//useUserStore().accessToken = accessToken;
		//useUserStore().refreshToken = refreshToken;
		VueCookies.set('accessToken', accessToken);
		VueCookies.set('refreshToken', refreshToken);
	},
	/**
	 * accessToken & refreshToken check
	 * @returns 존재(true), 미존재(false)
	 */
	sessionCheck() {
		// accessToken check
		if (commonUtils.isEmpty(VueCookies.get('accessToken'))) {
			return false;
			c;
		}
		// refreshToken check
		if (commonUtils.isEmpty(VueCookies.get('refreshToken'))) {
			return false;
		}
		// 정상
		return true;
	},
	logout() {
		VueCookies.remove('accessToken');
		VueCookies.remove('refreshToken');
		// router.push({ path: '/login' });
	},
};
