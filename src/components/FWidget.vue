<!--------------------------------------------------------------------
	파일   : FWidget.vue
	작성   : CJ Developer
	설명	 : [공통] 홈화면 위젯 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="widget" :class="{ add: add }">
		<div v-if="!add" class="widget-title">
			<p>{{ name }}</p>
			<FIcon icon="ico-16-right-arrow" />
		</div>
		<div v-if="add" class="widget-title">
			<FIcon icon="ico-24-plus" />
			<p>위젯추가</p>
		</div>
		<div v-if="!add" class="widget-content">
			<slot />
		</div>
	</div>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';

const props = defineProps({
	name: {
		type: String,
	},
	add: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
.widget {
	padding: 32px;
	border-radius: 16px;
	-webkit-backdrop-filter: blur(30px);
	backdrop-filter: blur(30px);
	background-color: var(--widget-bg);
	height: 100%;
	max-height: 360px;
	min-height: 360px;

	&-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: bold;
		color: var(--heading-text);
		margin-bottom: 24px;
	}
	&-content {
		height: calc(100% - 54px);
	}

	&.add {
		background-color: var(--widget-bg-add);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.widget-title {
			flex-direction: column;
			justify-content: center;
			gap: 20px;
			font-size: 14px;
		}
	}
}
</style>
