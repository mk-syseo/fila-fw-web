<template>
	<div>
		<FCheckbox
			id="multipleValue"
			v-model="multipleValue"
			:options="options"
			label="라벨입니다"
		/>
		<p>Checkbox value is {{ multipleValue }}</p>
	</div>
</template>

<script setup>
import FCheckbox from '@/components/FCheckbox.vue';

const multipleValue = ref([]);

const options = [
	{
		label: '바나나',
		value: '001',
	},
	{
		label: '사과',
		value: '002',
	},
	{
		label: '딸기',
		value: '003',
	},
	{
		label: '수박',
		value: '004',
	},
];
</script>
