<template>
	<div class="main-wrap">
		<div
			v-if="isMenu"
			class="aside-wrap"
			:class="useMenuStore().isFold ? 'off' : 'on'"
		>
			<aside>
				<a class="logo-icon" @click="onClickMoveHome">
					<span class="sr-only" />
				</a>
				<AsideMenu :fold="useMenuStore().isFold" />
			</aside>
		</div>
		<div class="content-wrap">
			<MainHeader />
			<MainTabs />
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import AsideMenu from '@/layout/LNB/AsideMenu.vue';
import MainTabs from '@/layout/LNB/MainTabs.vue';
import MainHeader from '@/layout/LNB/MainHeader.vue';

import useMenuStore from '@/stores/menuStore';
// import { MENU_INFO } from '@/utils/constCommon';

const props = defineProps({
	isMenu: {
		type: Boolean,
		// default: false,
		default: true,
	},
});

// const router = useRouter();

function onClickMoveHome() {
	// 로고 클릭으로 새로고침 : cachedTabs/openedTabs 초기화
	useMenuStore().openedTabs.splice(1);
	router.push({ path: MENU_INFO.HOME_PATH });
}
</script>

<style lang="scss" scoped>
.aside-wrap {
	flex: 0 0 180px;
	transition: all ease 0.3s;
	background-image: linear-gradient(
		to bottom,
		var(--aside-bg-gra-start),
		var(--aside-bg-gra-start) 71%,
		var(--aside-bg-gra-end)
	);
	overflow-x: hidden;
	overflow-y: auto;

	.logo-icon {
		margin: 0 20px;
		display: block;
		width: 137px;
		height: 32px;
		background-size: 137px 24px;
		background-position: center;
		background-repeat: no-repeat;
		background-image: url(/images/aside-fila-ci.svg);
	}
	&.on {
		flex: 0 0 180px;
		max-width: 180px;
	}
	&.off {
		flex: 0 0 64px;
		max-width: 64px;
		padding: 0;
		aside {
			max-width: 64px;
			.logo-icon {
				width: 64px;
				height: 32px;
				background-position: left center;
				background-size: 24px 24px;
				background-image: url(/images/aside-f-ci.svg);
			}
		}
		menu {
			ul {
				ul {
					display: none;
				}
				&.depth-1 {
					a {
						.menu-name,
						.ico-arrow {
							display: none;
						}
						color: transparent;
					}
				}
			}
		}
	}
	aside {
		flex: 0 0 180px;
		padding: 20px 0;
		color: #fff;
	}
}

.content-wrap {
	transition: all ease 0.3s;
	flex-grow: 1;
	min-width: calc(100% - 180px);
}

/* Scroll Custom */
::-webkit-scrollbar {
	width: 9px;
	height: 9px;
}
::-webkit-scrollbar-thumb {
	height: 30%;
	background: rgba(255, 255, 255, 0.3);
	border: none;
	background-clip: padding-box;
	border: 3px solid transparent;
	border-radius: 6px;
	&:hover {
		background: rgba(255, 255, 255, 0.5);
		background-clip: padding-box;
		border: 3px solid transparent;
	}
}
::-webkit-scrollbar-track {
	background: transparent;
}
::-webkit-scrollbar-corner {
	background: transparent;
}
::-webkit-scrollbar-button:vertical:start:decrement,
::-webkit-scrollbar-button:vertical:start:increment,
::-webkit-scrollbar-button:vertical:end:decrement,
::-webkit-scrollbar-button:vertical:end:increment {
	display: block;
	height: 3px;
	background: transparent;
}
::-webkit-scrollbar-button:horizontal:start:decrement,
::-webkit-scrollbar-button:horizontal:start:increment,
::-webkit-scrollbar-button:horizontal:end:decrement,
::-webkit-scrollbar-button:horizontal:end:increment {
	display: block;
	width: 3px;
	background: transparent;
}
:root:has(.darkMode) {
	::-webkit-scrollbar-thumb {
		height: 30%;
		background: rgba(255, 255, 255, 0.3);
		border: none;
		background-clip: padding-box;
		border: 3px solid transparent;
		border-radius: 6px;
		&:hover {
			background: rgba(255, 255, 255, 0.5);
			background-clip: padding-box;
			border: 3px solid transparent;
		}
	}
}
</style>
