import { createRouter, createWebHistory } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import routes from '~pages';
import Login from '@/views/Login.vue';

import jwt from '@/utils/jwt';
import commonUtils from '@/utils/commonUtils';
import { MENU_INFO } from '@/utils/constCommon';

import useMenuStore from '@/stores/menuStore';
import useUserStore from '@/stores/userStore';

/**
 * 커스텀 Route
 */
export const customRoute = [
  {
    path: '/',
    redirect: 'login',
    name: 'cm',
    meta: { auth: true, layout: true },
    children: [...routes.filter(route => route.path !== '/login')],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      return requireAuth(to, from, next);
    },
  },
  {
    path: '/samples',
    name: 'sample',
    meta: { auth: false },
    children: [...routes.filter(route => route.path.startsWith('/samples'))],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: customRoute,
});

router.beforeEach(async (to, from, next) => {
  if (to.hash) {
    return next({ path: to.path, hash: '' });
  }

  // 1. 권한 인증이 필요한 경우
  if (to.meta.auth) {
    if (!useUserStore().sessionCheck()) {
      // 1-1. 세션이 유효하지않은 경우
      useUserStore().logout();
      return next(MENU_INFO.LOGIN_PATH);
    }
    to.hash = '';

    // 1-2. 탭 추가
    const getMenu = getMenuData(to.path);
    if (to.path !== MENU_INFO.HOME_PATH && commonUtils.isEmpty(getMenu)) {
      return next({ name: MENU_INFO.NOT_FOUND_NAME });
    } else {
      if (commonUtils.isEmpty(useMenuStore().isOpenTabByPath(to.path))) {
        addTabMenu({ ...to, uuid: uuidv4() }, getMenu);
      } else if (!useMenuStore().isOldMenu) {
        addTabMenu({ ...to, uuid: uuidv4() }, getMenu);
        useMenuStore().setOldMenu(true);
      } else {
        if (commonUtils.isEmpty(useMenuStore().nowUUID)) {
          const nowUU = useMenuStore().isOpenTabByPath(to.path).uuid;
          useMenuStore().setNowUUID(nowUU);
        }
      }
      to.meta = { ...to.meta, ...getMenu };
    }
  }
  return next();
});

/**
 * 메뉴 트리 데이터 가져오기
 * @param {*} path web url path 정보
 * @returns
 */
function getMenuData(path) {
  try {
    const menuStore = useMenuStore();
    let getTree = menuStore?.menuTree.children;
    return menuStore.getSearchMenuTree(path, getTree);
  } catch (e) {
    console.log('getMenuData', e);
    return null;
  }
}

function requireAuth(to, from, next) {
  if (jwt.sessionCheck()) {
    return next(MENU_INFO.HOME_PATH);
  }
  return next();
}

/**
 * 탭 메뉴 추가
 * @param {*} menuInfo title(=메뉴명), path(=소문자), name(=component), page 정보
 * @param {*} menuData menuId, menuNm, menuUrl(=대문자 포함) 외 정보
 */
function addTabMenu(menuInfo, menuData) {
  const menuStore = useMenuStore();

  if (menuInfo.path === MENU_INFO.HOME_PATH) {
    return;
  }
  useMenuStore().setNowUUID(menuInfo.uuid);
  menuStore.openedTabs.push({
    title: menuData.menuNm,
    path: menuInfo.path,
    component: menuInfo.name,
    uuid: menuInfo.uuid,
  });
}

export default router;
