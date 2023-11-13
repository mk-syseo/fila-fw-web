<template>
	<div>
		<FRadio
			id="selectRadio"
			v-model="selectRadio"
			:options="options"
			label-field="comNm"
			value-field="comCd"
			label="라벨명/필드명 변경 예제"
		/>
		<p>Selected Option is {{ selectRadio }}</p>
	</div>
</template>

<script setup>
import FRadio from '@/components/FRadio.vue';

const selectRadio = ref('3');
const options = [
	{
		comNm: '첫번째',
		comCd: '1',
	},
	{
		comNm: '두번째',
		comCd: '2',
	},
	{
		comNm: '세번째',
		comCd: '3',
	},
];
</script>
