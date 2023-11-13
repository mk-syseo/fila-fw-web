<template>
	<div>
		<FMSelect
			id="selectedValue"
			v-model="selectedValue"
			:options="options"
			label="라벨명/필드명 변경"
			label-field="comNm"
			value-field="comCd"
			placeholder="선택하세요"
		/>
		<span>Selected value is {{ selectedValue }}</span>
	</div>
</template>

<script setup>
import FMSelect from '@/components/FMSelect.vue';

const selectedValue = ref(['first', 'second']);

const options = [
	{
		comNm: '첫번째',
		comCd: 'first',
	},
	{
		comNm: '두번째',
		comCd: 'second',
	},
	{
		comNm: '세번째',
		comCd: 'third',
	},
];
</script>
