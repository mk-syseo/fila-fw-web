<!-- 
	*************************************************************
	파일명	: AsideBookMark.vue
	설명		: 즐겨찾기 component 영역
	메뉴		: APP Index > BaseAside > 즐겨찾기
	*************************************************************
-->
<template>
	<ul>
		<li>
			{{ t('layout.bookmark.title') }}
			<FIcon icon="icon-lnb-star" />
		</li>

		<button @click="addBookMark">
			<FIcon icon="icon-lnb-plus" />{{ t('layout.bookmark.addBtn') }}
		</button>
	</ul>

	<dl v-for="(item, key) in bookmarkList" :key="key">
		<dd @click.stop="moveBookMarkPage(item)">
			<FIcon icon="icon-lnb-star" />
			{{ item.menuNm }}
			<FIcon icon="icon-pc-close-wh" @click.stop="deleteBookMark(item)" />
		</dd>
	</dl>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { MENU_INFO } from '@/utils/constCommon';
import commonUtils from '@/utils/commonUtils';

import apiCall from '@/plugins/apiCall';
import FIcon from '@/components/FIcon.vue';
import useMenuStore from '@/stores/menuStore';

/**
 * #################### 전역 변수 ####################
 */
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const fullMenuArray = ref([]);
const bookmarkList = ref([]);

// Lifecycle hook
onMounted(() => {
	selectBookMark();
});

/**
 * #################### Function ####################
 */
/**
 * 즐겨찾기 조회
 */
function selectBookMark() {
	bookmarkList.value = [];

	apiCall.get('/common/main/searchUsersMyMenu').then(res => {
		bookmarkList.value = res.data.data;
	});
}

/**
 * 즐겨찾기 추가
 */
function addBookMark() {
	// 즐겨찾기 확인
	let listIndex = bookmarkList.value.findIndex(el => el.menuUrl == route.path);
	if (listIndex >= 0) {
		// MessageBox
		// messageBox.showAlert('', t('com.bookmark.hasAdd'), false);
		return;
	}

	// menuList Merge
	fullMenuArray.value = [];
	menuTreeMerge(useMenuStore().menuTree);

	// 해당 화면 menu 정보검색
	let selectObj = fullMenuArray.value.find(
		el => el.menuUrl.toLowerCase() == route.path,
	);
	if (!commonUtils.isEmpty(selectObj)) {
		// 즐겨찾기 저장 API 호출
		postAPI(selectObj);
	} else {
		console.log('page error');
	}
}

/**
 * 즐겨찾기 저장 API
 * @param {*} obj
 */
function postAPI(obj) {
	// api 호출
	let params = {
		menuId: obj.menuId,
		menuNm: obj.menuNm,
		menuUrl: obj.menuUrl,
	};

	apiCall.post('/common/main/insertUsersMyMenu', params).then(() => {
		selectBookMark();
	});
}

/**
 * 메뉴 구조 Array로 변경 (메뉴 정보 확보 및 메뉴 검색 사용)
 */
function menuTreeMerge(arr) {
	if (arr.children.length != 0) {
		arr.children.forEach(el => {
			menuTreeMerge(el);
		});
	} else {
		fullMenuArray.value.push(arr);
	}
}

/**
 * 즐겨찾기 이동
 * TO-DO 탭 추가되는 경우 로직 변경 필요 (중복 탭)
 */
function moveBookMarkPage(item) {
	let moveUrl = item.menuUrl;

	// 총 10개 화면 open
	if (useMenuStore().openedTabs.length > MENU_INFO.MAX_TAB_SIZE) {
		// MessageBox
		// messageBox.showAlert('', t('com.msg.maxTabNumber'), false);
		return;
	}

	const openedMenu = useMenuStore().isOpenTabByPath(moveUrl);

	// [중복 탭] 수정
	// 같은 메뉴의 탭 존재 시
	if (!commonUtils.isEmpty(openedMenu)) {
		nextTick(() => {
			router.push({
				name: openedMenu.component,
				params: { page: uuidv4() },
				// query 사용 시
				// path: moveUrl.toLowerCase(),
				// query: { page: uuidv4() },
			});
		});

		// MessageBox
		// messageBox.showConfirm(
		// 	'',
		// 	t('com.msg.duplicateMenu'),
		// 	() => {
		// 		// [확인]을 누른 경우
		// 		nextTick(() => {
		// 			router.push({ path: moveUrl.toLowerCase() });
		// 		});
		// 	},
		// 	() => {
		// 		// [취소]를 누른 경우
		// 		nextTick(() => {
		// 			router.push({
		// 				name: openedMenu.component,
		// 				params: { page: uuidv4() },
		// 				// query 사용 시
		// 				// path: moveUrl.toLowerCase(),
		// 				// query: { page: uuidv4() },
		// 			});
		// 		});
		// 	},
		// );
	} else {
		nextTick(() => {
			router.push({ path: moveUrl.toLowerCase() });
		});
	}
}

/**
 * 즐겨찾기 삭제
 */
function deleteBookMark(item) {
	let params = { menuId: item.menuId };

	apiCall.post('/common/main/deleteUsersMyMenu', params).then(() => {
		selectBookMark();
	});
}
</script>

<style lang="scss" scoped></style>
