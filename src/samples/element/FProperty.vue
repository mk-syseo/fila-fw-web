<template>
	<div class="component-property">
		<h1>요소 설명 {{ category }}</h1>
		<FTable :header="headers" :data="data" />
	</div>
</template>

<script setup>
import FTable from '@/components/FTable.vue';

const props = defineProps({
	data: {
		type: Array,
	},
	category: {
		type: String,
	},
});

const headers = [
	{
		label: '요소',
		value: 'property',
		width: 100,
	},
	{
		label: '설명',
		value: 'desc',
	},
	{
		label: '타입',
		value: 'type',
		align: 'center',
		width: 120,
	},
	{
		label: '기본값',
		value: 'default',
		align: 'center',
		width: 120,
	},
	{
		label: '필수',
		value: 'required',
		align: 'center',
		width: 50,
	},
	{
		label: '옵션값',
		value: 'option',
		align: 'center',
		width: 200,
	},
];
</script>

<style lang="scss" scoped>
.component-property {
	margin-bottom: 30px;
}
</style>
