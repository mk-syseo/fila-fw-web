<template>
	<menu class="menu-section">
		<ul v-for="menu in menus" :key="menu.menuId" class="depth-1">
			<li
				:class="{
					open: openMenus.includes(menu.menuId),
					close: !openMenus.includes(menu.menuId),
				}"
				@click="onClickOpenMenu(menu.menuId)"
			>
				<a>
					<FIcon :icon="menu.menuIcon" />
					<!-- <span :class="menu.menuIcon"></span> -->
					<span class="menu-name">{{ menu.menuNm }}</span>
					<span class="ico-arrow"></span>
				</a>
			</li>

			<ul v-show="openMenus.includes(menu.menuId)" class="depth-2">
				<li
					v-for="middle in menu.children"
					:key="middle.menuId"
					:class="{
						open: openMenus.includes(middle.menuId),
						close: !openMenus.includes(middle.menuId),
					}"
					@click.stop="onClickOpenMenu(middle.menuId)"
				>
					<a
						><span class="menu-name">{{ middle.menuNm }}</span>
						<span class="ico-plus"></span>
					</a>

					<ul v-show="openMenus.includes(middle.menuId)" class="depth-3">
						<li
							v-for="sub in middle.children"
							:key="sub.menuId"
							@click.stop="
								sub.children.length
									? onClickOpenMenu(sub.menuId)
									: onClickMoveMenu(sub)
							"
						>
							<a
								><span class="menu-name">{{ sub.menuNm }}</span>
								<span v-if="sub.children.length" class="ico-box-plus"></span>
							</a>

							<ul
								v-show="openMenus.includes(sub.menuId)"
								v-if="sub.children.length"
								class="depth-4"
							>
								<li
									v-for="detail in sub.children"
									:key="detail.menuId"
									@click="onClickMoveMenu(detail)"
								>
									<a
										><span class="menu-name">{{ detail.menuNm }}</span></a
									>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</ul>
	</menu>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';

import tabUtils from '@/utils/tabUtils';
import useMenuStore from '@/stores/menuStore';

const props = defineProps({
	fold: {
		type: Boolean,
	},
});

const openMenus = ref([]);
const menus = ref(useMenuStore().menuTree.children);

watch(
	() => props.fold,
	async newStatus => {
		if (newStatus) {
			openMenus.value = openMenus.value.filter(
				open => !menus.value.map(menu => menu.menuId).includes(open),
			);
		}
	},
);

/**
 * 메뉴 오픈
 */
function onClickOpenMenu(menuId) {
	let index = openMenus.value.indexOf(menuId);
	index >= 0 ? openMenus.value.splice(index, 1) : openMenus.value.push(menuId);
}

/**
 * 메뉴 이동
 * @param {object} menu
 */
function onClickMoveMenu(menu) {
	tabUtils.moveMenu(menu);
}
</script>

<style lang="scss" scoped>
.menu-section {
	&.off {
		ul {
			color: #fff;
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
	.depth-1 {
		&:first-child {
			margin-top: 20px;
		}
		> li {
			font-size: 14px;
			font-weight: bold;
			padding: 17px 0;
			a {
				> img {
					width: 24px;
					height: 24px;
					margin-right: 20px;
				}
			}
		}
	}
	ul {
		li {
			a {
				padding: 0 20px;
				display: flex;
				align-items: center;
				width: 100%;
				.menu-name {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					min-height: 21px;
					max-height: 21px;
					&.depth-1 {
						max-width: 80px;
					}
				}
				.ico-arrow {
					margin-left: auto;
					display: block;
					width: 12px;
					height: 12px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					background-position: center;
					background-image: url(/images/aside-ico-arrow-down.svg);
				}
			}
			&.close,
			&.open {
				.ico-arrow {
					transform: rotate(180deg);
					transition: all ease 0.3s;
				}
			}
			&.close {
				.ico-arrow {
					transform: rotate(360deg);
				}
			}
		}
		.depth-2,
		.depth-3,
		.depth-4 {
			background-color: var(--aside-menu-depth-bg);
			li {
				font-size: 13px;
				font-weight: 400;
				.menu-name {
					min-height: 36px;
					max-height: 36px;
					line-height: 36px;
				}
			}
		}
		.depth-2 {
			padding: 14px 0;
			border-top: 1px solid var(--aside-menu-depth-border);
			border-bottom: 1px solid var(--aside-menu-depth-border);
			.ico-plus {
				margin-left: auto;
				display: block;
				width: 12px;
				height: 12px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
				background-position: center;
				background-image: url(/images/aside-ico-minus.svg);
			}
			.close {
				.ico-plus {
					background-image: url(/images/aside-ico-plus.svg);
				}
			}
		}
		.depth-3 {
			a {
				position: relative;
				padding-left: 31px;
				&::before {
					content: '';
					width: 3px;
					height: 3px;
					border-radius: 50%;
					background-color: #fff;
					position: absolute;
					left: 20px;
					top: 50%;
					transform: translate(0, -50%);
				}
			}
			.depth-4 {
				a {
					padding-left: 41px;
					&::before {
						content: '';
						width: 4px;
						height: 1px;
						border-radius: 0;
						left: 30px;
						top: 50%;
						transform: translate(0, -50%);
					}
				}
			}
			.ico-box-plus {
				margin-left: auto;
				display: block;
				width: 12px;
				height: 12px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
				background-position: center;
				background-image: url(/images/aside-ico-box-plus.svg);
			}
		}
	}
}
</style>
