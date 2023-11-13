<template>
	<div>
		<FMSelect
			id="basicEmptyValue"
			v-model="basicEmptyValue"
			:options="options"
			label="Basic Empty"
			placeholder="선택하세요"
		/>
		<span>Basic Empty value is {{ basicEmptyValue }}</span>

		<FMSelect
			id="emptyOptionValue"
			v-model="emptyOptionValue"
			:options="options"
			label="Empty Option"
			placeholder="선택하세요"
			:empty="{ label: '전체입니다', value: 'all' }"
		/>
		<span>Empty Option value is {{ emptyOptionValue }}</span>
	</div>
</template>

<script setup>
import FMSelect from '@/components/FMSelect.vue';

const basicEmptyValue = ref([]);
const emptyOptionValue = ref([]);

const options = [
	{
		label: '첫번째',
		value: 'first',
	},
	{
		label: '두번째',
		value: 'second',
	},
	{
		label: '세번째',
		value: 'third',
	},
];
</script>
