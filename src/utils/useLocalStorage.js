import useUserStore from '@/stores/userStore';
import useMenuStore from '@/stores/menuStore';

/**
 *
 * @param {object} parameter
 * @property {string} store 대상 스토어명(portal)
 * @property {string} field 스토어의 필드명
 */
export function useLocalStorage(store, field) {
	const userStore = useUserStore();
	const menuStore = useMenuStore();

	switch (store) {
		case 'user':
			return userStore[field];
		case 'menu':
			return menuStore[field];
	}
}

/**
 *
 * @param {object} parameter
 * @property {string} store 대상 스토어명(portal)
 * @property {*} field 업데이트할 필드
 * @property {*} data  업데이트할 데이터
 */
export function setLocalStorage(store, field, data) {
	const userStore = useUserStore();
	const menuStore = useMenuStore();

	switch (store) {
		case 'user':
			userStore[field] = data;

			// 추가 액션이 필요한 경우
			switch (field) {
				case 'locale':
					userStore.setLocale(data);
					break;
			}
			break;
		case 'menu':
			menuStore[field] = data;
			break;
	}
}
