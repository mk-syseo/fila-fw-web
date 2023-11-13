import { nextTick } from 'vue';

import { v4 as uuidv4 } from 'uuid';

import router from '@/routes';
import useMenuStore from '@/stores/menuStore';

import commonUtils from '@/utils/commonUtils';
import { MENU_INFO } from '@/utils/constCommon';

import { useMessage } from '@/plugins/message/message';

const message = useMessage();
class tabUtils {
	static async moveMenu(menu) {
		// 총 10개 화면 open
		if (useMenuStore().openedTabs.length > MENU_INFO.MAX_TAB_SIZE) {
			message.showAlert({
				message: '최대 열 수 있는 메뉴 수는 10개입니다.need18',
			});
			return;
		}

		const openedMenu = useMenuStore().isOpenTabByPath(menu.menuUrl);
		if (!commonUtils.isEmpty(openedMenu)) {
			message.showConfirm({
				message:
					'이미 열린 화면이 있습니다. 기존화면으로 이동하시겠습니까?need18',
				onConfirm: () => {
					message.hide();
					nextTick(() => {
						router.push({ path: menu.menuUrl.toLowerCase() });
					});
					useMenuStore().setNowUUID(openedMenu.uuid);
				},
				onCancel: () => {
					const menuStore = useMenuStore();
					const uuid = uuidv4();
					menuStore.openedTabs.push({
						title: openedMenu.title,
						path: openedMenu.path,
						component: openedMenu.component,
						uuid: uuid,
					});
					useMenuStore().setNowUUID(uuid);
					message.hide();
				},
			});
		} else {
			nextTick(() => {
				router.push({ path: menu.menuUrl.toLowerCase(), hash: '#' + uuidv4() });
			});
		}
	}
}

export default tabUtils;
