<template>
	<div>
		<FSelect
			id="selectValue"
			v-model="selectValue"
			:options="options"
			label="Click Only"
			placeholder="선택하세요"
			click-only
		/>
		<span>Select value is {{ selectValue }}</span>
	</div>
</template>

<script setup>
import FSelect from '@/components/FSelect.vue';

const selectValue = ref('');

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
