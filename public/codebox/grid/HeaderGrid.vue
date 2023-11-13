<template>
    <div>
        <AUIGrid
            ref="refMasterGrid"
            title="그리드(헤더)"
            :data="gridDataList"
            :column-layout="columnLayout"
            :grid-props="gridProps"
            remove
            add
            @select="onSelectGrid"
        />
    </div>
</template>

<script setup>
import AUIGrid from '@/components/AUIGrid.vue';

/* 마스터 그리드 초기화 */
const refMasterGrid = ref(null);

/* gridDataList 리스트 정보(샘플) */
const gridDataList = ref([
	{
		id: '#Example01',
		name: '홍길동',
		country: 'korea',
		dept: '영업지원팀',
		tooltip: 'AAA',
		summer: 10000,
		winter: 9000,
		region: '서울',
		val0: '특이사항 없음',
        colSpan1: 'TEST01',
        colSpan2: 'TEST02',
	},
	{
		id: '#Example02',
		name: '강동원',
		country: 'korea',
		dept: '재무팀',
		tooltip: 'BBB',
		summer: 100000,
		winter: 200000,
		region: '경북',
		val0: '특이사항 및 전달사항 없음',
        colSpan1: 'WORLD01',
        colSpan2: 'WORLD02',
	},
	{
		id: '#Example03',
		name: '김혜수',
		country: 'korea',
		dept: '인사팀',
		tooltip: 'CCC',
		summer: 30000,
		winter: 40000,
		region: '강원',
		val0: '특이사항 없음',
        colSpan1: 'Hello01',
        colSpan2: 'Hello02',
	},
	{
		id: '#Example04',
		name: 'Los Gwahn',
		country: 'USA',
		dept: '사업지원팀',
		tooltip: 'DDD',
		summer: 20100,
		winter: 55000,
		region: '뉴욕',
		val0: '특이사항 없음',
        colSpan1: 'Java01',
        colSpan2: 'Java02',
	},
]); 

/* 컬럼 정보 */
const columnLayout = [
	{
		dataField: 'id',
		headerText: 'ID',
	},
	{
		headerText: '상세정보',
		children: [
			{
				dataField: 'name',
				headerText: '이름',
			},
			{
				dataField: 'country',
				headerText: '나라',
			},
			{
				dataField: 'dept',
				headerText: '소속',
			},
		],
	},
	{
		dataField: 'tooltip',
		headerText: '툴팁',
		editable: false,
		tooltip: "툴팁 내용을 기입하세요."	// 툴팁 내용 기입
	},
	{
		headerText: '2023',
		children: [
			{
				headerText: '상반기',
				children: [
					{
						dataField: 'summer',
						headerText: '여름',
						dataType: 'numeric',
					},
				],
			},
			{
				headerText: '하반기',
				children: [
					{
						dataField: 'winter',
						headerText: '겨울',
						dataType: 'numeric',
					},
				],
			},
		],
	},
	{
		dataField: 'region',
		headerText: '지역<br/>(Header Style)',
		headerStyle: 'aui-grid-user-custom-header',
	},
	{
		dataField: 'val0',
		headerText: '기타<br/>(Header Style & 왼쪽정렬)',
		headerStyle: 'aui-grid-user-custom-header',
		editRenderer: {
			type: 'InputEditRenderer',
			textAlign: 'left', // 인푸터의 텍스트 정렬
		},
		style: 'my-left-column',
	},
    {
		dataField: "colSpan1",
		headerText: "상세정보",
		colSpan: 2, // 자신을 포함하여 2개의 헤더를 가로 병합함.
	}, {
		dataField: "colSpan2",
	}
];

const gridProps = ref({
	showRowNumColumn: true,
	softRemoveRowMode: true,
	// 선택모드 : singleRow, multipleCells
	selectionMode: 'singleRow',
	showStateColumn: true,
	enableRestore: true,
	// 고정 칼럼 1개 적용
	fixedColumnCount: 1,
});

/* 선택한 행 데이터 정보 */
function onSelectGrid(selectedRows) {
	if (selectedRows) {
		console.log('HeaderGrid[selectedRows] : ', selectedRows);
	}
}

</script>

<style lang="scss" scoped>

</style>