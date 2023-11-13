<template>
	<div>
		<FMSelect
			id="multipleValue"
			v-model="multipleValue"
			:options="options"
			label="Multiple Select"
			placeholder="선택하세요"
		/>
		<span>Multiple value is {{ multipleValue }}</span>

		<FMSelect
			id="disabledValue"
			v-model="disabledValue"
			:options="options"
			label="Multiple Disabled"
			placeholder="선택하세요"
			disabled
		/>
		<span>Disable value is {{ disabledValue }}</span>
	</div>
</template>

<script setup>
import FMSelect from '@/components/FMSelect.vue';

const multipleValue = ref([]);
const disabledValue = ref(['first', 'third']);

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
