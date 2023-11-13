<template>
	<div>
		<FSelect
			id="emptyObjValue"
			v-model="emptyObjValue"
			:options="options"
			label="라벨명/필드명 변경"
			label-field="comNm"
			value-field="comCd"
			:empty="{ comNm: '전체입니다', comCd: 'all' }"
		/>
		<span>Empty object value is {{ emptyObjValue }}</span>
	</div>
</template>

<script setup>
import FSelect from '@/components/FSelect.vue';

const emptyObjValue = ref('');

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
