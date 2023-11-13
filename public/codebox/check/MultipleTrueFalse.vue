<template>
	<div>
		<FCheckbox
			id="multipleValue"
			v-model="multipleValue"
			:options="options"
			label="라벨입니다"
			value-field="comCd"
			label-field="comNm"
		/>
		<p>Checkbox value is {{ multipleValue }}</p>
	</div>
</template>

<script setup>
import FCheckbox from '@/components/FCheckbox.vue';

const multipleValue = ref(['001', '004']);

const options = [
	{
		comNm: '바나나',
		comCd: '001',
	},
	{
		comNm: '사과',
		comCd: '002',
	},
	{
		comNm: '딸기',
		comCd: '003',
	},
	{
		comNm: '수박',
		comCd: '004',
	},
];
</script>
