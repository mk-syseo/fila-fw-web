<template>
    <div>
        <AUIGrid
            ref="refMasterGrid"
            title="그리드(소계&합계)"
            :data="gridDataList"
            :column-layout="columnLayout"
            :footer-layout="footerLayout"
            :grid-props="gridProps"
            @select="onSelectGrid"
        />
    </div>
</template>

<script setup>
import AUIGrid from '@/components/AUIGrid.vue';

/* 마스터 그리드 초기화 */
const refMasterGrid = ref(null);

/* 샘플 gridDataList 리스트 정보 */
const gridDataList = ref([
	{
		orderId: '#0001',
		country: 'KOR',
		name: 'join',
		product: 'phone',
		price: 120000,
		email: 'join@naver.com',
		date: '2021-01-03',
	},
	{
		orderId: '#0002',
		country: 'USA',
		name: 'kim',
		product: 'mouse',
		price: 50000,
		email: 'kim01@gmail.com',
		date: '2021-01-03',
	},
	{
		orderId: '#0003',
		country: 'KOR',
		name: 'kim',
		product: 'phone',
		price: 128000,
		email: 'kim01@gmail.com',
		date: '2023-11-01',
	},
	{
		orderId: '#0004',
		country: 'KOR',
		name: 'join',
		product: 'TV',
		price: 500000,
		email: 'join@naver.com',
		date: '2022-11-23',
	},
	{
		orderId: '#0005',
		country: 'KOR',
		name: 'hello',
		product: 'mouse',
		price: 29800,
		email: 'hello2023@naver.com',
		date: '2022-09-27',
	},
	{
		orderId: '#0006',
		country: 'KOR',
		name: 'join',
		product: 'mouse',
		price: 9900,
		email: 'join@naver.com',
		date: '2023-10-05',
	},
]);

/* 샘플 columnLayout 정보 */
const columnLayout = [
	{
		dataField: 'orderId',
		headerText: 'Order ID',
	},
	{
		dataField: 'country',
		headerText: 'Country',
        cellMerge: true,            // Country 칼럼 셀 세로 병합 실행
		filter: { showIcon: true },
	},
	{
		dataField: 'name',
		headerText: 'Name',
		filter: { showIcon: true },
	},
	{
		dataField: 'product',
		headerText: 'Product',
		filter: { showIcon: true },
	},
	{
		dataField: 'price',
		headerText: 'Price',
		dataType: 'numeric',
		style: 'my-align-right',
	},
	{
		dataField: 'email',
		headerText: 'Email',
	},
	{
		dataField: 'date',
		headerText: 'Date',
	},
];

const footerLayout = ref([
	{
		labelText: '총 합계',
		positionField: 'name',
	},
	{
		dataField: 'price',
		positionField: 'price',
		operation: 'SUM',
		formatString: '#,##0',
	},
]);

/* 샘플 gridProps 정보 */
const gridProps = ref({
	editable: false,
	// 그룹핑 패널 사용
	useGroupingPanel: false,
	// 필터 사용
	enableFilter: false,
	// 사용자로 그룹핑
	groupingFields: ['name'],
    //summaryMergePolicy: 'all',
	// 합계(소계) 설정
	groupingSummary: {
		// 합계 필드는 price 1개에 대하여 실시 합니다.
		dataFields: ['price'],
		// 그룹핑 썸머리 행의 구체적 설정
		// 5개의 Object 에 각각, 합계, 평균, 최소값, 최대값, 개수를 표현(SUM만 적용)
		rows: [
			{
				operation: 'SUM',
				text: '소계', // $value
			},
		],
	},

	// 최초 보여질 때 모두 열린 상태로 출력 여부
	displayTreeOpen: true,
	// 그룹핑 후 셀 병합 실행
	enableCellMerge: true,
	// enableCellMerge 할 때 실제로 rowspan 적용 시킬지 여부
	// 만약 false 설정하면 실제 병합은 하지 않고(rowspan 적용 시키지 않고) 최상단에 값만 출력 시킵니다.
	cellMergeRowSpan: false,
    // 셀 병합 정책
	// "default"(기본값) : null 을 셀 병합에서 제외하여 병합을 실행하지 않습니다.
	// "withNull" : null 도 하나의 값으로 간주하여 다수의 null 을 병합된 하나의 공백으로 출력 시킵니다.
	// "valueWithNull" : null 이 상단의 값과 함께 병합되어 출력 시킵니다.
	cellMergePolicy: 'withNull',
	// 브랜치에 해당되는 행을 출력 여부
	showBranchOnGrouping: false,

	// 그리드 ROW 스타일 함수 정의
	rowStyleFunction: function (rowIndex, item) {
		if (item._$isGroupSumField) {
			// 그룹핑으로 만들어진 합계 필드인지 여부

			// 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
			// 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
			switch (
				item._$depth // 계층형의 depth 비교 연산
			) {
				case 2:
					return 'aui-grid-row-depth1-style';
				case 3:
					return 'aui-grid-row-depth2-style';
				case 4:
					return 'aui-grid-row-depth3-style';
				default:
					return 'aui-grid-row-depth-default-style';
			}
		}
		return null;
	}, // end of rowStyleFunction
    showFooter: true,
});

/* 선택한 행 데이터 정보 */
function onSelectGrid(selectedRows) {
	if (selectedRows) {
		console.log('SummaryGrid[selectedRows] : ', selectedRows);
	}
}

</script>

<style lang="scss" scoped>

</style>