<!--------------------------------------------------------------------
	파일   : FTabs.vue
	작성   : CJ Developer
	설명	 : [공통] 탭 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="style-tab" :class="{ 'ver-third': inner }">
		<!-- Tab Header -->
		<ul class="style-tab-button">
			<li
				v-for="(tab, index) in tabs"
				:key="tab.props.title"
				:class="{ active: currentIndex === index }"
				@click="changeTab(index)"
			>
				{{ tab.props.title }}
			</li>
		</ul>

		<!-- Tab Content -->
		<KeepAlive class="tab-content">
			<component :is="currentTab" :key="currentTab.props.title" />
		</KeepAlive>
	</div>
</template>

<script setup>
const props = defineProps({
	inner: {
		type: Boolean,
		default: false,
	},
});

/**
 * Tab Value
 */
const slots = useSlots();
const tabs = slots.default();

/**
 * Current Tab Information
 */
const currentTab = shallowRef(tabs[0]);
const currentIndex = ref(0);

/**
 * Change Tab
 * @param {number} index
 */
function changeTab(index) {
	currentTab.value = tabs[index];
	currentIndex.value = index;
}
</script>

<style lang="scss" scoped>
.style-tab {
	height: 100%;
	.style-tab-button {
		width: 100%;
		display: flex;
		position: relative;
		li {
			cursor: pointer;
			position: relative;
			margin-bottom: 0;
			background-color: #f4f4f6;
			border: 2px solid #f4f4f6;
			box-sizing: border-box;
			padding: 0 12px;
			height: 38px;
			line-height: 38px;
			border-radius: 5px 5px 0 0;
			font-size: 14px;
			color: #555;
			font-weight: 400;
			z-index: 0;
			transition: all 0.3s;
			&.active {
				border: 2px solid var(--btn-text);
				border-bottom-color: #fff;
				background-color: #fff;
				color: var(--btn-text);
				z-index: 2;
				font-weight: bold;
				&:after {
					width: 100%;
					background-color: #fff;
					left: 0;
				}
			}
		}
		&:before {
			content: '';
			display: block;
			position: absolute;
			height: 2px;
			width: 100%;
			background: var(--btn-text);
			bottom: 0;
			left: 0;
			z-index: 1;
		}
	}
	.tab-content {
		display: block;
		height: calc(100% - 44px);
		/* padding: 16px 0; */
	}
	&.ver-third {
		.style-tab-button {
			background-color: var(--color-primary);
			border-radius: 4px;
			gap: 20px;
			padding: 0 16px;
			li {
				background-color: var(--color-primary);
				border: none;
				color: #99a5ba;
				height: 32px;
				line-height: 32px;
				font-size: 13px;
				padding: 0;
				&:before {
					content: '';
					display: block;
					position: absolute;
					width: 100%;
					height: 3px;
					bottom: 0;
					left: 0;
					background-color: var(--tab-third-active);
					transition: all 0.3s;
					opacity: 0;
				}
				&.active {
					color: #fff;
					font-weight: 600;
					&:before {
						opacity: 1;
					}
				}
			}
			&:before {
				display: none;
			}
		}
	}
}
</style>
