<template>
	<div>
		<FSelect
			id="selectValue"
			v-model="selectValue"
			:options="options"
			label="Basic"
			placeholder="선택하세요"
		/>
		<p>Select value is {{ selectValue }}</p>

		<FSelect
			id="disabledValue"
			v-model="disabledValue"
			:options="options"
			label="Disabled"
			placeholder="선택하세요"
			disabled
		/>
		<p>Select value is {{ disabledValue }}</p>

		<FSelect
			id="requiredValue"
			v-model="requiredValue"
			label="Required"
			placeholder="선택하세요"
			:options="options"
			required
		/>
		<p>Select value is {{ requiredValue }}</p>

		<FSelect
			id="optionValue"
			v-model="optionValue"
			label="Sub-Required"
			placeholder="선택하세요"
			:options="options"
			sub-required
		/>
		<p>Select value is {{ optionValue }}</p>
	</div>
</template>

<script setup>
import FSelect from '@/components/FSelect.vue';

const selectValue = ref('');
const disabledValue = ref('second');
const requiredValue = ref('');
const optionValue = ref('');

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
