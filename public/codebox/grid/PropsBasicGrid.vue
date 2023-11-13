<template>
    <div>
        <AUIGrid
					ref="refMasterGrid"
					title="gridProps 설정 + 기본 그리드 예제"
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

/* 마스터 그리드 초기화(AUIGrid = ref 동일) */
const refMasterGrid = ref(null);

/* 샘플 gridDataList 리스트 정보 */
const gridDataList = ref([
	{
		id: 'kimJo',
		name: 'Jane Smith',
		age: 25,
		dept: '영업사원1팀',
		phone: '010-9001-1234',
		email: 'test12@example.com',
	},
	{
		id: 'suk',
		name: 'hello world',
		age: 10,
		dept: '영업사원2팀',
		phone: '010-1234-9876',
		email: 'suk123@example.com',
	},
]);

/* 샘플 columnLayout 정보 */
const columnLayout = [
	{
		dataField: 'id',
		headerText: 'ID',
		width: 200,
	},
	{
		dataField: 'name',
		headerText: '이름',
		width: 200,
	},
	{
		dataField: 'age',
		headerText: '나이',
		dataType: 'numeric',
		width: 100,
	},
	{
		dataField: 'dept',
		headerText: '부서',
		width: 300,
	},
	{
		dataField: 'phone',
		headerText: '전화번호',
		width: 300,
		filter: {
			showIcon: true, // 기본 필터 메뉴 아이콘 표시
			inline: false,  // 인라인 필터 input 표시 안함
		},
	},
	{
		dataField: 'email',
		headerText: '이메일',
	},
];

/* 샘플 gridProps 정보 */
const gridProps = {
    showRowNumColumn: true,
	softRemoveRowMode: true,
	// 선택모드 : singleRow, multipleCells
	selectionMode: 'singleRow',
	enableMovingColumn: true,
	// 인라인 필터 행을 표시할지 여부
	showInlineFilter: true,
	// 상태 칼럼 사용
	showStateColumn: true,
	enableRestore: true,
    headerHeight: 60,
	rowHeight: 50,
};

/* 선택한 행 데이터 정보 */
function onSelectGrid(selectedRows) {
	if (selectedRows) {
		console.log('PropsBasicGrid[selectedRows] : ', selectedRows);
	}
}

</script>
