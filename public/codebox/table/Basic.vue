<template>
	<div>
		<FTable :header="headers" :data="rows"/>
	</div>
</template>

<script setup>
import FTable from '@/components/FTable.vue';

const headers = [
	{ label: '번호', field: 'no' },
	{ label: '주문번호', field: 'orderNo' },
	{ label: '상품명', field: 'prdNm' },
];

const rows = [
  {
    no: '1',
    orderNo: '주문번호001',
    prdNm: '상품명1'
  },
  {
    no: '2',
    prdNm: '상품명1',
    orderNo: '주문번호002',
  },
]
</script>
