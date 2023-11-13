<template>
	<div class="page-title">
		<label :class="{ 'btn-fav': true, on: currentRoute.isFavorite }">
			<input type="checkbox" @click.prevent="onClickFavorite" />
		</label>
		<div class="h1">{{ currentRoute.menuNm }}</div>

		<FBreadCrumb :levels="levels" />

		<FlexBox class="gap-x-[5px]">
			<!-- <FButton
				text
				icon="ico-20-pin"
				:class="{ size28: true, on: currentRoute.isPin }"
				@click="onClickPin"
			/> -->
			<FPin :on="currentRoute.isPin" @click.prevent="onClickPin" />
			<FButton
				text
				icon="ico-20-newWin"
				class="size28"
				@click="onClickNewWindow"
			/>
			<FButton text icon="ico-20-help" class="size28" />
		</FlexBox>

		<FlexBox class="gap-x-[20px] ml-auto">
			<slot />
			<FButton text icon="ico-16-black-search" @click="emit('search')">
				조회
			</FButton>
			<FButton text icon="ico-16-black-save" @click="emit('save')">
				저장
			</FButton>
		</FlexBox>
	</div>
</template>

<script setup>
import router from '@/routes';

import FPin from '@/components/FPin.vue';
import FlexBox from '@/components/FlexBox.vue';
import FButton from '@/components/FButton.vue';
import FBreadCrumb from '@/components/FBreadCrumb.vue';

const props = defineProps({
	menuNm: {
		type: String,
	},
	levels: {
		type: Array, // samples/layout 용. 추후 제거 필요
	},
});

const emit = defineEmits(['search', 'save']);

const currentRoute = ref({
	...router.currentRoute.value.meta,
	isPin: false,
	isFavorite: false,
});

function onClickFavorite() {
	// TO-DO API 연계 필요
	console.log(currentRoute.value.menuId, 'favorite');
	currentRoute.value.isFavorite = !currentRoute.value.isFavorite;
}

function onClickPin() {
	// TO-DO API 연계 필요
	console.log(currentRoute.value.menuId, 'pin');
	currentRoute.value.isPin = !currentRoute.value.isPin ?? true;
}

function onClickNewWindow() {
	console.log('window popup...');
}
</script>

<style lang="scss" scoped>
.page-title {
	display: flex;
	flex: 1;
	align-items: center;
	height: 21px;
	gap: 10px;

	.h1 {
		font-size: 18px;
		font-weight: bold;
		color: var(--heading-text);
	}
	.h4 {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 8px;
		height: 28px;
		color: var(--heading-text);
	}
}
</style>
