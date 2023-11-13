<template>
	<div>
		<FSelect
			id="emptyValue"
			v-model="emptyValue"
			label="기본 빈값"
			:options="options"
			empty
		/>
		<span>Empty value is {{ emptyValue }}</span>

		<FSelect
			id="emptyObjValue"
			v-model="emptyObjValue"
			label="커스텀 빈값"
			:options="options"
			:empty="{ label: '전체입니다', value: 'all' }"
		/>
		<span>Empty object value is {{ emptyObjValue }}</span>
	</div>
</template>

<script setup>
import FSelect from '@/components/FSelect.vue';

const emptyValue = ref('');
const emptyObjValue = ref('');

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
