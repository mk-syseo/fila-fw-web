<template>
	<div>
		<FDateCategory
			id="arrayRange"
			v-model="arrayRange"
			label="라디오와 결합"
			:options="options"
		/>
		<p>select value is {{ arrayRange }}</p>

		<FDateCategory
			id="objectRange"
			v-model="objectRange"
			label="셀렉트박스와 결합"
			type="select"
			category-field="selectValue"
			range-field="dateRange"
			:options="options"
		/>
		<p>select value is {{ objectRange }}</p>
	</div>
</template>

<script setup>
import FDateCategory from '@/components/date/FDateCategory.vue';

const options = ref([
	{
		value: 'first',
		label: '첫번째',
	},
	{
		value: 'second',
		label: '두번째',
	},
	{
		value: 'third',
		label: '세번째',
	},
]);

const arrayRange = ref({
	category: '',
	range: ['', ''],
});

const objectRange = ref({
	selectValue: '',
	dateRange: { from: '', to: '' },
});
</script>
