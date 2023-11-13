<template>
    <div>
        <AUIGrid
					ref="refMasterGrid"
					title="기본 그리드 예제"
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
		id: 'gwahn',
		name: 'John Doe',
		age: 30,
		dept: 'SW개발팀',
		phone: '010-4444-1122',
		email: 'jgwas@example.com',
	},
	{
		id: 'limTa',
		name: 'Jane Smith',
		age: 25,
		dept: '아키텍처팀',
		phone: '010-2112-3344',
		email: 'jan1234th@example.com',
	},
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
		},
	},
	{
		dataField: 'email',
		headerText: '이메일',
	},
];

/* 샘플 gridProps 정보 */
const gridProps = {};

/* 선택한 행 데이터 정보 */
function onSelectGrid(selectedRows) {
	if (selectedRows) {
		console.log('BasicGrid[selectedRows] : ', selectedRows);
	}
}

</script>
