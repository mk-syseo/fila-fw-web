<template>
	<div class="header-wrap">
		<div class="menu-section">
			<FButton
				text
				icon="ico-32-menuOn"
				class="size50"
				@click="onClickAside"
			></FButton>
			<FButton text icon="ico-32-sitemap" class="size50" />
			<SearchMenu />
		</div>
		<nav>
			<!-- 대분류 -->
			<div
				v-for="(menu, index) in menus"
				:key="index"
				@click.stop="onClickTitleMenu(menu)"
			>
				<a :id="'header-' + menu.menuId" class="">
					{{ menu.menuNm }}
				</a>
				<ul>
					<!-- 중분류 -->
					<li
						v-for="(subMenu, idx) in menu.children"
						:id="'header-' + subMenu.menuId"
						:key="idx"
						class="sub"
						@mouseover.stop="onMouseSubMenu(subMenu)"
						@mouseout.stop="onMouseSubMenu(subMenu)"
					>
						<a>{{ subMenu.menuNm }}</a>
						<ul>
							<!-- 소분류 -->
							<li
								v-for="(cdMenu, i) in subMenu.children"
								:id="'header-' + cdMenu.menuId"
								:key="i"
								@click="onClickMoveMenu(cdMenu)"
							>
								<a>
									<FIcon
										:icon="
											cdMenu.menuIcon ? cdMenu.menuIcon : 'icon-pc-monitor'
										"
									/>
									{{ cdMenu.menuNm }}
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>

		<div class="user-section">
			<ul>
				<li>
					<FButton
						text
						icon="ico-32-alarm"
						class="size50"
						@click="onClickAlarmToggle"
					/>
				</li>
				<li>
					<span class="user-store">FHSK, 진장</span>
				</li>
				<li class="user-profile">
					<span class="image"></span>
					<span class="user-name">
						{{ userStore.user.userNm }}
					</span>
					<FButton
						text
						icon="ico-16-topArrow"
						class="size50"
						@click="onClickToggle"
					/>
				</li>
				<div class="user-alarm" :class="isAlarmToggle ? 'hide' : 'show'">
					<div class="user-alarm-title">
						<div class="user-alarm-title-item">
							<h2>알림</h2>
							<div class="total">6</div>
						</div>
						<div class="user-alarm-title-buttons">
							<FButton text @click="onClickisAlarmRead">전체 읽음처리</FButton>
							<FButton text>쪽지함</FButton>
						</div>
					</div>
					<div class="user-alarm-card">
						<div
							class="user-alarm-card-item"
							:class="isAlarmRead ? null : 'read'"
						>
							<div class="card-item-title">
								<h5>[긴급] 프로모션 확인</h5>
								<FButton v-if="isAlarmRead" text @click="onClickisAlarmRead"
									>읽음처리</FButton
								>
								<FButton v-if="!isAlarmRead" text @click="onClickisAlarmRead"
									>읽음</FButton
								>
							</div>
							<pre>FW 신상품 할인품목 재고 부족합니다.<br/>금일 입고예정 품목 아직 안들어왔어요!!</pre>
							<div class="card-item-info">
								<div class="card-item-info-writer">
									필라 안성점 홍길동 매니저
								</div>
								<div class="card-item-info-date">2023-10-11 14:45</div>
							</div>
						</div>
					</div>
				</div>
				<div class="user-pop-over" :class="isToggle ? 'hide' : 'show'">
					<div class="user-corp">
						<h5>법인</h5>
						<FSelect
							id="selectValue"
							v-model="selectValue"
							:options="options"
							placeholder="선택하세요"
						/>
					</div>
					<div class="user-lang">
						<h5>언어</h5>
						<UserSetting mode="locale" />
					</div>
					<div class="user-mode">
						<h5>테마</h5>
						<UserSetting mode="theme" />
					</div>
					<div class="user-setting">
						<div>
							<h5>개인정보 수정</h5>
							<FButton text icon="ico-16-set" class="size16" />
						</div>
						<div>
							<h5>사용자별 환경설정</h5>
							<FButton text icon="ico-16-set" class="size16" />
						</div>
					</div>

					<FButton class="w-full" primary @click="onClickLogout">
						로그아웃
					</FButton>
				</div>
			</ul>
		</div>
	</div>
</template>

<script setup>
import useUserStore from '@/stores/userStore';
import useMenuStore from '@/stores/menuStore';

import tabUtils from '@/utils/tabUtils';
import { MENU_INFO } from '@/utils/constCommon';

import FIcon from '@/components/FIcon.vue';
import FButton from '@/components/FButton.vue';
import FSelect from '@/components/FSelect.vue';

import SearchMenu from '@/layout/header/SearchMenu.vue';
import UserSetting from '@/layout/header/UserSetting.vue';

const menus = ref([]);
const menuStore = useMenuStore();

const selectValue = ref('');

const options = [
	{
		label: 'FSHK',
		value: 'first',
	},
	{
		label: 'KOREA',
		value: 'second',
	},
	{
		label: 'USA',
		value: 'third',
	},
];

/**
 * LNB
 */
function onClickAside() {
	menuStore.isFold = !menuStore.isFold;

	const timer = setInterval(() => {
		window.dispatchEvent(new Event('resize'));
	}, 0);

	setTimeout(() => {
		clearInterval(timer);
	}, 300);
}

/**
 * 사용자 정보 관련
 */
const userStore = useUserStore();

/**
 * 로그아웃
 */
const router = useRouter();

async function onClickLogout() {
	await userStore.logout();
	await menuStore.logout();

	nextTick(() => {
		router.push({ path: MENU_INFO.LOGIN_PATH });
	});
}

onMounted(() => {
	cloneMenus();
	window.addEventListener('click', onClick);
});

onUnmounted(() => {
	window.removeEventListener('click', onClick);
});

function onClick() {
	// 전체 메뉴 닫기
	menus.value.forEach(item => {
		removeClass('header-' + item.menuId);
	});
	// sub 메뉴 닫기
	let subElements = document.getElementsByClassName('sub');
	for (let i = 0; i < subElements.length; i++) {
		removeClass(subElements[i].id);
	}
}

function cloneMenus() {
	menus.value = menuStore.menuTree.children;
}

function onClickTitleMenu(param) {
	// title 닫기
	menus.value.forEach(item => {
		if (item.menuId !== param.menuId) {
			removeClass('header-' + item.menuId);
		}
	});

	// sub menu 닫기
	let subElements = document.getElementsByClassName('sub');
	for (let i = 0; i < subElements.length; i++) {
		if (subElements[i].id !== 'header-' + param.menuId) {
			removeClass(subElements[i].id);
		}
	}
	let element = document.getElementById('header-' + param.menuId);
	let menuIndex = element.className.indexOf('on');
	// 메뉴가 닫혀있는 경우만 열기
	if (menuIndex < 0) {
		activeClass('header-' + param.menuId);
	} else {
		removeClass('header-' + param.menuId);
	}
	// aside menu 변경
	useMenuStore().setLeftMenu(param.menuId);
}

function onMouseSubMenu(param) {
	// 중분류 삭제 (동일 메뉴 제외)
	let subElements = document.getElementsByClassName('sub');
	for (let i = 0; i < subElements.length; i++) {
		if (subElements[i].id !== 'header-' + param.menuId) {
			removeClass(subElements[i].id);
		}
	}
	let element = document.getElementById('header-' + param.menuId);
	let menuIndex = element.className.indexOf('on');
	// 메뉴가 닫혀있는 경우만 열기
	if (menuIndex < 0) {
		activeClass('header-' + param.menuId);
	} else {
		removeClass('header-' + param.menuId);
	}
}

function activeClass(id) {
	let element = document.getElementById(id);
	element.classList.toggle('on');
}

function removeClass(id) {
	let el = document.getElementById(id);
	el.classList.remove('on');
}

function onClickMoveMenu(menu) {
	tabUtils.moveMenu(menu);
}

/* 사용자 메뉴 토글 */

const isToggle = ref(true);

function onClickToggle() {
	isToggle.value = !isToggle.value;
}

/* 사용자 알림 토글 */

const isAlarmToggle = ref(true);

function onClickAlarmToggle() {
	isAlarmToggle.value = !isAlarmToggle.value;
}

/* 사용자 알림 읽음처리 */

const isAlarmRead = ref(true);

function onClickisAlarmRead() {
	isAlarmRead.value = !isAlarmRead.value;
}
</script>

<style lang="scss" scoped>
.header-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--background);
	height: 51px;
	padding-left: 10px;
	> .menu-section {
		display: flex;
		align-items: center;
	}
	nav {
		height: 51px;
		line-height: 51px;
		display: flex;
		position: relative;
		gap: 32px;
		div {
			display: none;
			ul {
				width: 180px;
				padding: 20px 0;
				border-radius: 4px;
				box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);
				background-color: #fff;
				position: absolute;
				z-index: -1;
				top: 40px;
				opacity: 0;
				visibility: hidden;
				overflow: visible;
				transition: all 0.1s ease;
				li {
					width: 100%;
					height: 46px;
					line-height: 46px;
					padding: 0 20px;
					position: relative;
					cursor: pointer;
					a {
						font-size: 14px;
						display: flex;
						align-items: center;
						svg {
							opacity: 0.4;
						}
					}
					&:hover {
						background-color: #f5f5f5;
						> a {
							color: #6965ff;
							font-weight: bold;
							svg {
								opacity: 1;
								fill: #6965ff;
							}
						}
					}
					&.sub {
						&:hover {
							> a {
								&::after {
									background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath stroke='%236965FF' stroke-linecap='round' stroke-linejoin='round' d='m6 3 4.993 5.003L6 13'/%3E%3Cpath d='M6.354 2.647a.5.5 0 0 0-.766.637l.058.07 4.641 4.648-4.64 4.645a.5.5 0 0 0-.058.637l.058.07a.5.5 0 0 0 .637.057l.07-.058 4.993-4.997a.5.5 0 0 0 .058-.637l-.058-.07-4.993-5.002z' fill='%236965FF' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E%0A");
								}
							}
						}
						> a {
							&::after {
								content: '';
								position: absolute;
								right: 15px;
								top: 15px;
								width: 16px;
								height: 16px;
								background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m6 3 4.993 5.003L6 13'/%3E%3Cpath d='M6.354 2.647a.5.5 0 0 0-.766.637l.058.07 4.641 4.648-4.64 4.645a.5.5 0 0 0-.058.637l.058.07a.5.5 0 0 0 .637.057l.07-.058 4.993-4.997a.5.5 0 0 0 .058-.637l-.058-.07-4.993-5.002z' fill='%231A1A1A' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E%0A");
							}
						}
						& {
							ul {
								position: absolute;
								left: 180px;
								top: 6px;
								li {
									background-color: #fff;
									height: 46px;
									line-height: 46px;
									&:hover {
										background-color: #f5f5f7;
										a {
											font-weight: bold;
										}
									}
									a {
										font-size: 13px;
										font-weight: normal;
									}
								}
							}
							&.on {
								ul {
									z-index: 9999;
									visibility: visible;
									transition: all 0.5s ease-in-out;
									opacity: 1;
									overflow: visible;
								}
							}
						}
					}
				}
			}
			a {
				text-decoration: none;
				font-size: 18px;
				font-weight: bold;
				letter-spacing: -0.2px;
				color: #002053;
				&.on {
					& + ul {
						z-index: 9999;
						visibility: visible;
						transition: all 0.5s ease-in-out;
						opacity: 1;
						overflow: visible;
					}
				}
			}
		}
	}
	.user-section {
		position: relative;
		ul {
			display: flex;
			align-items: center;
			li {
				min-width: 52px;
				height: 51px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-left: 1px solid var(--user-section-border-color);
				color: var(--btn-text);
				font-size: 13px;
				font-weight: bold;
				span {
					padding: 0 24px;
				}
				&.user-profile {
					padding-left: 16px;
					span {
						padding: 0;
					}
					.image {
						width: 32px;
						height: 32px;
						border-radius: 50%;
						background-image: url(/images/model.jpg);
						background-size: cover;
						margin-right: 16px;
					}
				}
			}
		}
		.user-alarm {
			position: absolute;
			top: 60px;
			right: 273px;
			padding: 20px;
			box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
			border: solid 1px #002053;
			border-radius: 6px;
			background-color: #fff;
			z-index: 2;
			display: flex;
			flex-direction: column;
			gap: 12px;

			h5 {
				font-size: 13px;
			}
			&::before {
				position: absolute;
				top: -6px;
				right: 40px;
				content: '';
				width: 10px;
				height: 10px;
				border-top: 1px solid #002053;
				border-left: 1px solid #002053;
				transform: rotate(45deg);
				background-color: #fff;
			}
			&.hide {
				display: none;
			}
			.user-alarm-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.user-alarm-title-item {
					display: flex;
					h2 {
						font-size: 16px;
						font-weight: bold;
						color: #111;
					}
					.total {
						color: #e1002b;
						font-weight: bold;
						&::before {
							content: '(';
							font-weight: bold;
							color: #111;
						}
						&::after {
							content: ')';
							font-weight: bold;
							color: #111;
						}
					}
				}

				.user-alarm-title-buttons {
					display: flex;
					gap: 20px;
					button {
						background-color: transparent;
						text-decoration-line: underline;
					}
				}
			}
			.user-alarm-card {
				display: flex;
				flex-direction: column;
				gap: 8px;
				.user-alarm-card-item {
					min-width: 288px;
					padding: 16px 12px;
					border-radius: 8px;
					background-color: #f6f6f6;
					.card-item-title {
						display: flex;
						align-items: center;
						justify-content: space-between;
						button {
							background-color: transparent;
							text-decoration-line: underline;
						}
					}
					pre {
						font-family: Pretendard;
						font-size: 13px;
						font-weight: normal;
						line-height: 1.54;
						color: #555;
						margin: 12px 0 16px 0;
					}
					.card-item-info {
						display: flex;
						justify-content: space-between;
						font-size: 12px;
						color: #999;
					}
					&.read {
						button {
							text-decoration-line: none;
							color: #aaaaaa;
						}
						h5,
						pre,
						.card-item-info {
							color: #aaa;
						}
					}
				}
			}
		}
		.user-pop-over {
			position: absolute;
			top: 60px;
			right: 10px;
			padding: 20px;
			box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
			border: solid 1px var(--user-pop-over-border-color);
			border-radius: 6px;
			background-color: var(--user-pop-over-bg-color);
			z-index: 2;
			display: flex;
			flex-direction: column;
			gap: 24px;
			.primary {
				height: 40px;
				font-size: 14px;
				font-weight: bold;
			}
			h5 {
				font-size: 13px;
			}
			&::before {
				position: absolute;
				top: -6px;
				right: 40px;
				content: '';
				width: 10px;
				height: 10px;
				border-top: 1px solid var(--user-pop-over-border-color);
				border-left: 1px solid var(--user-pop-over-border-color);
				transform: rotate(45deg);
				background-color: var(--user-pop-over-bg-color);
			}
			&.hide {
				display: none;
			}
			.user-corp {
				display: flex;
				flex-direction: column;
				gap: 8px;
			}
			.user-setting {
				display: flex;
				flex-direction: column;
				gap: 26px;
				> div {
					display: flex;
					justify-content: space-between;
					height: 15px;
				}
			}
			.user-lang,
			.user-mode {
				display: flex;
				align-items: center;
				gap: 64px;
			}
		}
	}
}
</style>
