<template>
	<div>
		<AUIGrid
			ref="refGrid1"
			title="그리드(1)"
			:data="gridData1"
			:column-layout="gridColumns1"
			:grid-props="gridProps"
		/>
		<button @click="downBtnClick()">체크 행(들) 아래로 이동(▼)</button>
		<button @click="upBtnClick()">체크 행(들) 위로 이동(▲)</button>
		<AUIGrid
			ref="refGrid2"
			title="그리드(2)"
			:data="gridData2"
			:column-layout="gridColumns2"
			:grid-props="gridProps"
		/>
	</div>
</template>

<script setup>
import AUIGrid from '@/components/AUIGrid.vue';

/* 그리드1 + 그리드2 초기화 */
const refGrid1 = ref(null);
const refGrid2 = ref(null);

/* 그리드1 + 그리드2 데이터 */
const gridData1 = ref([
	{
		id: 'gwahn',
		name: 'John Doe',
		product: 'LG G3',
		price: 1000000,
		quantity: 10,
		date: '2023-01-20',
	},
	{
		id: 'limTa',
		name: 'Jane Smith',
		product: 'Galaxy Note3',
		price: 188800,
		quantity: 3,
		date: '2022-12-21',
	},
	{
		id: 'kimJo',
		name: 'Jane Smith',
		product: 'IPhone 5S',
		price: 379900,
		quantity: 5,
		date: '2022-09-03',
	},
	{
		id: 'suk',
		name: 'hello world',
		product: 'LG G3',
		price: 848000,
		quantity: 9,
		date: '2022-11-04',
	},
]);
const gridData2 = ref([]);

/* 그리드1 컬럼 */
const gridColumns1 = [
	{
		dataField: 'id',
		headerText: 'ID',
	},
	{
		dataField: 'name',
		headerText: 'Name',
	},
	{
		dataField: 'product',
		headerText: 'Product',
	},
	{
		dataField: 'price',
		headerText: 'Price',
		dataType: 'numeric',
	},
	{
		dataField: 'quantity',
		headerText: 'Quantity',
		dataType: 'numeric',
	},
	{
		dataField: 'date',
		headerText: 'Date',
	},
];

/* 그리드2 컬럼 */
const gridColumns2 = [
	{
		dataField: 'id',
		headerText: 'ID',
	},
	{
		dataField: 'name',
		headerText: 'Name',
	},
	{
		dataField: 'country',
		headerText: 'Country',
	},
	{
		dataField: 'product',
		headerText: 'Product',
	},
];

/* 그리드 Props 설정 */
const gridProps = ref({
	// 행 체크 칼럼(엑스트라 체크박스) 설정
	showRowCheckColumn: true,
	// 행 소프트 제거 모드 해제
	softRemoveRowMode: false,
	editable: false,
});

onMounted(() => {

	/** 
	 * cellClick 이벤트의 속성을 사용한 예제입니다.
	 * cellClick - 체크박스 선택/해제
	 */
	refGrid1.value.bind('cellClick', event => {
		if (refGrid1.value.isCheckedRowById(event.item._$uid)) {
			refGrid1.value.addUncheckedRowsByIds(event.item._$uid);
		} else {
			refGrid1.value.addCheckedRowsByIds(event.item._$uid);
		}
	});

	refGrid2.value.bind('cellClick', event => {
		if (refGrid2.value.isCheckedRowById(event.item._$uid)) {
			refGrid2.value.addUncheckedRowsByIds(event.item._$uid);
		} else {
			refGrid2.value.addCheckedRowsByIds(event.item._$uid);
		}
	});
});

/* 체크 행 아래로 이동 버튼 클릭 */
function downBtnClick() {
	let rows = refGrid1.value.getCheckedRowItemsAll();
	if (rows.length <= 0) {
		console.log('그리드(1)의 선택된 행이 없습니다.');
		return;
	}
	refGrid2.value.addRow(rows, 'last'); 	// 그리드2 추가
	refGrid1.value.removeCheckedRows(); 	// 그리드1 삭제
}


/* 체크 행 위로 이동 버튼 클릭 */
function upBtnClick() {
	let rows = refGrid2.value.getCheckedRowItemsAll();
	if (rows.length <= 0) {
		console.log('그리드(2)의 선택된 행이 없습니다.');
		return;
	}
	refGrid1.value.addRow(rows, 'last'); 	// 그리드1 추가
	refGrid2.value.removeCheckedRows(); 	// 그리드2 삭제
}

</script>

<style lang="scss" scoped>

</style>