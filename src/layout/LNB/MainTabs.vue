<template>
	<div class="tab-wrap">
		<!-- D&D -->
		<div ref="refTabWrapper" class="tab-item-wrap">
			<VueDraggableNext :list="tabs" :move="onMoveCallback">
				<div
					v-for="(tab, index) in tabs"
					:id="'tab-' + index"
					:key="tab.path"
					:ref="setItemRef"
					class="tab-item"
					@click="onClickTabMenu(tab)"
				>
					<FButton
						v-if="tab.title === 'home'"
						class="size40"
						:class="[tab.current ? 'on' : '']"
						text
						icon="ico-16-home"
					>
					</FButton>
					<span v-else :class="[tab.current ? 'on' : '']" :title="tab.title">
						{{ tab.title }}
					</span>
					<FButton
						class="tab-close size12"
						text
						icon="ico-12-btnTabClose"
						@click.stop="closeTab(tab)"
					/>
				</div>
			</VueDraggableNext>
		</div>

		<!-- 탭 우측 버튼 -->
		<div class="tab-icon-wrap">
			<FButton text icon="ico-16-newWindow" class="size40" />
			<FButton
				ref="refLeftButton"
				text
				icon="ico-16-leftArrow"
				class="size40"
				@click="onClickBtnMove('left')"
			/>
			<FButton
				id="rightBtn"
				text
				icon="ico-16-rightArrow"
				class="size40"
				@click="onClickBtnMove('right')"
			/>
			<FButton
				text
				icon="ico-16-tabClose"
				class="size40"
				@click="closeAllTab"
			/>
			<FButton text icon="ico-16-tabMore" class="size40" @click="refreshTab" />
		</div>
	</div>
</template>

<script setup>
import _ from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import { VueDraggableNext } from 'vue-draggable-next';

import { MENU_INFO } from '@/utils/constCommon';

import FButton from '@/components/FButton.vue';
import { useMessage } from '@/plugins/message/message';
// import commonUtils from '@/utils/commonUtils';

import useMenuStore from '@/stores/menuStore';

// const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const menuStore = useMenuStore();

const tabs = ref(menuStore.openedTabs);
const refTabWrapper = ref(null);
const refTabItems = ref([]);

// 왼쪽/오른쪽 버튼
const refLeftButton = ref(null);

function setItemRef(element) {
	refTabItems.value.push(element);
}

onMounted(() => {
	// cloneTabs();

	let findMenu = menuStore.isOpenTabByUUID(menuStore.nowUUID);

	currentTab(findMenu);
});

/**
 * 탭 메뉴 위치 이동
 * @param {*} type left: 좌측 이동, right: 우측 이동
 */
function onClickBtnMove(type) {
	if (type === 'left') {
		refTabWrapper.value.scrollTo({ left: 0, behavior: 'smooth' });
	} else {
		refTabWrapper.value.scrollTo({ left: 10000, behavior: 'smooth' });
	}
}

/**
 * 탭 메뉴 클릭으로 이동
 * @param {*} selectedTab 선택한 탭의 title(=메뉴명), path(=소문자), name(=component), page 정보
 */
function onClickTabMenu(selectedTab) {
	openTabMenu(selectedTab);
}

/**
 * 선택한 탭 변경
 * @param {*} selectedTab 선택한 탭의 title(=메뉴명), path(=소문자), name(=component), page 정보
 */
function currentTab(selectedTab) {
	tabs.value.map(t => {
		_.isEqual(t, selectedTab) ? (t.current = true) : (t.current = false);
	});
}

/**
 * 탭 메뉴 복사
 */
// function cloneTabs() {
// 	tabs.value = menuStore.openedTabs;
// }

function onMoveCallback(evt) {
	try {
		if (
			evt.draggedContext.element.title === 'home' ||
			evt.relatedContext.element.title === 'home'
		) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		return false;
	}
}

/**
 * 전체 탭 닫기
 */
const message = useMessage();
function closeAllTab() {
	// 메뉴가 존재하는 경우
	if (tabs.value.length > 1) {
		message.showConfirm({
			message: '닫으시렵니까?need18',
			onConfirm: () => {
				menuStore.openedTabs.splice(1);
				openTabMenu({ path: MENU_INFO.HOME_PATH });
				message.hide();
			},
		});
	}
}

const nowUUID = computed(() => {
	return useMenuStore().nowUUID;
});

/**
 * page refresh 기능
 */
watch(nowUUID, () => {
	let findMenu = menuStore.isOpenTabByUUID(menuStore.nowUUID);

	refTabItems.value = [];
	currentTab(findMenu);

	//탭 위치 지정
	nextTick(() => moveTabPosition(route));
});

/**
 * 리플레시 탭
 * KeepAlive cache 변환 작업
 */
function refreshTab() {
	// 현재 탭 찾기 (리플레시 탭 타겟)
	const tabIndex = menuStore.openedTabs.findIndex(
		item => item.path === route.path && item.current,
	);

	// page 구분 값 설정
	const refreshPage = uuidv4();
	menuStore.openedTabs[tabIndex].page = refreshPage;

	// [중복 탭] 수정
	// 리플레시 탭 실행
	router.push({
		name: menuStore.openedTabs[tabIndex].component,
		params: { page: refreshPage },
		// query 사용 시
		// path: menuStore.openedTabs[tabIndex].path,
		// query: { page: refreshPage },
	});
}

/**
 * 탭 메뉴로 이동
 * @param {*} selectedTab
 */
function openTabMenu(selectedTab) {
	menuStore.setNowUUID(selectedTab.uuid);
	nextTick(() => {
		router.push({ path: selectedTab.path, hash: '#' + uuidv4() });
	});
}

/**
 * 탭 메뉴 삭제
 */
function closeTab(selectedTab) {
	// HOME 삭제 불가
	if (selectedTab.path === MENU_INFO.HOME_PATH) {
		return;
	}

	// 마지막 메뉴 확인(삭제 전)
	const isLastTab = _.isEqual(selectedTab, tabs.value[tabs.value.length - 1]);

	// 탭 삭제
	let findIndex = -1;
	for (let i = 0; i < tabs.value.length; i++) {
		const tab = tabs.value[i];
		console.log('Before delete tabs :', tab);
		if (tab.uuid === selectedTab.uuid) {
			findIndex = i;
			break;
		}
	}

	tabs.value.splice(findIndex, 1);
	// 현재 메뉴 확인
	let currentTab = tabs.value.find(data => data.current === true);
	if (_.isEqual(selectedTab, currentTab)) {
		// 메뉴 이동
		if (tabs.value.length > 0) {
			if (isLastTab) {
				// 마지막 Tab (앞으로 이동)
				openTabMenu(tabs.value[tabs.value.length - 1]);
			} else {
				// 마지막 Tab 아닌 경우 (이동 없이 뒤에 메뉴)
				openTabMenu(tabs.value[findIndex]);
			}
		}
	} else {
		if (isLastTab) {
			// 마지막 Tab (홈 메뉴)
			openTabMenu(tabs.value[tabs.value.length - 1]);
		} else {
			if (currentTab === undefined || currentTab === '') {
				// 마지막 Tab 아닌 경우 (이동 없이 뒤에 메뉴)
				openTabMenu(tabs.value[findIndex]);
			} else {
				// 마지막 Tab 아닌 경우 (선택된 메뉴로 유지)
				openTabMenu(tabs.value[tabs.value.indexOf(currentTab)]);
			}
		}
	}
}

/**
 * 탭 이동 위치
 */
function moveTabPosition() {
	// 탭 element
	const findIndex = tabs.value.findIndex(item => item.path === route.path);

	if (findIndex >= 0) {
		let tabElement = refTabItems.value[findIndex];
		let tabLeftPoint = tabElement.getBoundingClientRect().x;
		let tabRightPoint = tabElement.getBoundingClientRect().right;

		// left 버튼 element
		let btnLeftPoint =
			tabElement.previousElementSibling?.getBoundingClientRect().left;

		// DIV 전체 영역
		let refLeftPoint = refTabWrapper.value.getBoundingClientRect().x;

		// 앞으로 이동
		if (refLeftPoint > tabLeftPoint) {
			let scrollRange = tabLeftPoint - refLeftPoint;
			refTabWrapper.value.scrollBy({ left: scrollRange, behavior: 'smooth' });
		}

		// 뒤로 이동
		if (tabRightPoint > btnLeftPoint) {
			let scrollRange = tabRightPoint - btnLeftPoint;
			refTabWrapper.value.scrollBy({ left: scrollRange, behavior: 'smooth' });
		}
	}
}
</script>

<style lang="scss" scoped>
.tab-wrap {
	position: relative;
	display: flex;
	border: 1px solid var(--border-color);
	border-width: 1px 0;
	height: 42px;
	button {
		width: 48px;
		height: 40px;
		border: 0;
		outline: 0;
		background-color: transparent;
		border-left: 1px solid #e5e5e5;
		padding: 0;
		&.tab-close {
			border-left: none;
		}
	}
	.tab-item-wrap {
		flex: 1;
		height: 41px;
		max-width: calc(100% - 240px);
		overflow-x: auto;
		overflow-y: hidden;
		> div {
			display: flex;
			height: 100%;
			.tab-item {
				position: relative;
				min-width: 160px;
				height: 40px;
				line-height: 40px;
				border-left: 1px solid var(--maintab-border-right);
				text-align: center;
				cursor: pointer;
				// home tab
				&:first-child {
					min-width: 48px;
					width: 48px;
					border-left: 0;
					&:has(.on) {
						background-color: var(--maintab-first);
						&::after {
							background-color: var(--maintab-first-border);
						}
					}
					button {
						margin: 0 auto;
						background-color: transparent;
						border-radius: 0;
						border-left: none;
					}
					.tab-close {
						display: none;
					}
				}
				// tab name
				span {
					font-size: 14px;
					color: #777;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					display: block;
					cursor: pointer;
				}
				&:last-child {
					border-right: 1px solid var(--maintab-border-right);
				}
				&:has(span) {
					padding: 0 12px;
				}
				&:has(.on) {
					position: relative;
					border-color: var(--border-color);
					background-color: var(--maintab-on-bg);
					span {
						font-weight: bold;
						color: var(--btn-text);
					}
					& + .tab-item {
						border-left: 1px solid var(--border-color);
					}
					&::after {
						content: '';
						position: absolute;
						left: 0;
						bottom: -1px;
						width: 100%;
						height: 1px;
						background-color: var(--maintab-on);
					}
					&::before {
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translate(-50%, 0);
						content: '';
						width: 0;
						height: 0;
						border-top: 4px solid red;
						border-left: 4px solid transparent;
						border-right: 4px solid transparent;
					}
				}
				.tab-close {
					position: absolute;
					top: 0;
					right: 0;
					opacity: 0;
					width: 20px;
					height: 40px;
					padding-right: 8px;
					&:hover {
						opacity: 1;
					}
				}
			}
		}
	}
	.tab-icon-wrap {
		display: flex;
		button {
			border-left: 1px solid var(--user-section-border-color);
			border-radius: 0;
		}
	}
}
</style>
