import { defineStore } from 'pinia';
import _ from 'lodash-es';

import apiCall from '@/plugins/apiCall';
import commonUtils from '@/utils/commonUtils';
import { MENU_ICON } from '@/utils/constCommon';
import { v4 as uuidv4 } from 'uuid';

const initialMenu = {
	menuTree: {},
	menuList: {},
	openedTabs: [
		{
			title: 'home',
			path: '/home',
			component: 'Home',
			uuid: uuidv4(),
		},
	],
	leftMenuItems: {},
	leafMenuList: [],
	isFold: false,
	isOldMenu: true,
	nowUUID: '',
	isToggle: false,
};

const useMenuStore = defineStore({
	id: 'menuStore',
	state: () => _.cloneDeep(initialMenu),
	//state: () => initialMenu,
	getters: {
		/**
		 * left menu tree
		 * @param {*} state
		 * @returns
		 */
		getLeftMenus: state => {
			return state.leftMenuItems;
		},
		/**
		 * left 오픈 메뉴 설정
		 * 초기 좌측 메뉴 open 되게 설정 (2depth 까지)
		 * @param {*} state
		 * @returns
		 */
		getLeftMenuDefault: state => {
			let resultArray = [];
			if (!commonUtils.isEmpty(state.menuTree.children)) {
				state.menuTree.children.forEach(item => {
					resultArray.push(item.menuId);
					item.children.forEach(subItem => {
						resultArray.push(subItem.menuId);
					});
				});
			}
			return resultArray;
		},
		/**
		 * 최하위 depth 메뉴 list
		 * @param {*} state
		 * @returns
		 */
		getLeafMenuList: state => {
			return state.leafMenuList;
		},
	},
	actions: {
		/**
		 * Load Menu
		 */
		async load() {
			const response = await apiCall
				.get('/common/main/menulist')
				.then(res => res);

			// origin data
			this.leafMenuList = response.data.data;
			this.setMenuList(response.data.data);
			let customData = this.makeCustomData(response.data.data);

			// TO-DO 추후 제거
			let idx = 1;
			customData.map(menu => {
				if (menu.upperMenuId === null) {
					menu.menuIcon = `aside-ico-${idx}`;
					idx++;
				}
			});

			// 메뉴 트리 형태 변경
			this.menuTree = {
				root: true,
				children: Object.assign([], this.mergeMenuTree(customData)),
			};

			this.addLeafMenuList(this.menuTree);
		},
		/**
		 * 키-값으로 지정된 메뉴리스트 저장
		 * @param {array} menuList
		 */
		setMenuList(menuList) {
			menuList.map(menu => {
				this.menuList[menu.menuId] = menu;
			});
		},
		/**
		 * 좌측 메뉴 셋팅
		 * @param {*} parentMenuId rootId
		 */
		setLeftMenu(rootId) {
			let result = [];
			if (this.menuTree.children) {
				const findMenu = this.menuTree.children.find(
					el => el.menuId === rootId,
				);
				if (findMenu) {
					result = findMenu.children;
				}
			}
			this.leftMenuItems = result;
		},
		/**
		 * 좌측 메뉴 셋팅
		 * @param {*} parentMenuId rootId
		 */
		setOldMenu(check) {
			this.isOldMenu = check;
		},
		setNowUUID(uuid) {
			this.nowUUID = uuid;
		},
		/**
		 * 트리구조 메뉴 만들기
		 * @param {*} items api response row data
		 * @param {*} menuId
		 * @param {*} link
		 * @returns
		 */
		mergeMenuTree(items, menuId = null, link = 'upperMenuId') {
			return items
				.filter(item => item[link] === menuId)
				.map(item => ({
					...item,
					children: this.mergeMenuTree(items, item.menuId),
				}));
		},
		/**
		 * 메뉴 트리 url 검색
		 * router index 에서 사용
		 * @param {*} url menuUrl
		 * @param {*} tree 메뉴tree object
		 * @returns menuItem
		 */
		getSearchMenuTree(url, tree) {
			if (commonUtils.isEmpty(tree)) {
				return null;
			}
			// component 이름으로 routing 시 url이 모두 소문자로 변환
			let findTree = tree.find(item => item.menuUrl?.toLowerCase() === url);
			if (findTree) {
				return findTree;
			}

			let nextTree = tree.flatMap(item => item.children).filter(c => c);
			return this.getSearchMenuTree(url, nextTree);
		},
		/**
		 * 메뉴 데이터 커스텀
		 * @param {*} data
		 * @returns
		 */
		makeCustomData(data) {
			const idColumn = 'rootMenuId';
			const iconColumn = 'menuIcon';

			let customData = data.map(item => {
				// 1. root id 추가
				if (item.upperMenuId) {
					item[idColumn] = this.findRootId(data, item.menuId, item.upperMenuId);
				} else {
					item[idColumn] = '';
				}
				// 2. icon 설정
				if (!commonUtils.isEmpty(this.setIcon(item.menuId))) {
					item[iconColumn] = this.setIcon(item.menuId);
				}
				return item;
			});
			return customData;
		},
		/**
		 * 상위메뉴 리스트 찾기
		 * @param {string} currentMenu
		 */
		findHierachy(currentMenu) {
			let hierachy = [];
			let cur = { ...currentMenu };

			do {
				let parent = this.menuList[cur.upperMenuId];

				if (parent) {
					hierachy.push(parent);
				}
				cur = { ...parent };
			} while (cur.upperMenuId !== null);

			return hierachy;
		},
		/**
		 * rootId 찾기
		 * @param {*} menuList menu response 결과
		 * @param {*} menuId 메뉴ID
		 * @param {*} upperMenuId 상위ID
		 * @returns 최상위 rootId
		 */
		findRootId(menuList, menuId, upperMenuId) {
			if (!upperMenuId) {
				return menuId;
			}
			let findItem = menuList.find(item => item.menuId === upperMenuId);
			if (findItem) {
				return this.findRootId(menuList, findItem.menuId, findItem.upperMenuId);
			}
		},
		setIcon(menuId) {
			return MENU_ICON.hasOwnProperty(menuId) ? MENU_ICON[menuId] : '';
		},
		/**
		 * 최하위 메뉴 리스트 생성
		 * @param {*} menu tree 메뉴 구조 object
		 * @returns
		 */
		addLeafMenuList(menu) {
			if (commonUtils.isEmpty(menu.children)) {
				this.leafMenuList.push(menu);
				return;
			}

			menu.children.map(child => {
				this.addLeafMenuList(child);
			});
		},
		/**
		 * 현재 탭 중에서 동일 메뉴 존재 시 반환
		 * @param {*} menuUrl
		 * @returns
		 */
		isOpenTabByPath(menuUrl) {
			let findTab = this.openedTabs.find(
				tab => tab.path === menuUrl.toLowerCase(),
			);
			return findTab;
		},
		/**
		 * 현재 탭 중에서 path가 일치하는 목록 중에서 page가 일치하는 탭 객체 반환
		 * @param {Object(string path, string page, ...)} menuInfo path(=소문자만), page
		 * @returns
		 */
		isOpenTabByUUID(menuUUID) {
			let findTab = this.openedTabs.find(tab => tab.uuid === menuUUID);
			return findTab;
		},
		logout() {
			Object.keys(initialMenu).map(key => {
				this[key] = initialMenu[key];
			});
		},
	},
	persist: {
		enabled: true,
		strategies: [
			{
				key: 'menu',
				storage: localStorage,
				paths: ['menuTree', 'menuList', 'openedTabs', 'leafMenuList'],
			},
		],
	},
});

export default useMenuStore;
