import VueCookies from 'vue-cookies';

const cookiesStorage = {
	setItem(key, state) {
		VueCookies.set(key, JSON.parse(state)[key]);
	},
	getItem(key) {
		return JSON.stringify({ [key]: VueCookies.get(key) });
	},
};
export function setCookie(key, state) {
	VueCookies.set(key, JSON.parse(state)[key]);
}

export function getCookie(key) {
	return JSON.stringify({ [key]: VueCookies.get(key) });
}

export function setTheme(theme) {
	VueCookies.set('theme', theme);
	window.location.reload();
}
export function getTheme() {
	return VueCookies.get('theme');
}

export default cookiesStorage;
