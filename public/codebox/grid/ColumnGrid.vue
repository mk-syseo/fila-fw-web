<template>
    <div>
        <AUIGrid
            ref="refMasterGrid"
            title="컬럼 그리드"
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

/* 부서리스트 정보(샘플) - Key-Value */
const deptList = [
	{ code: '001', value: 'SW개발팀' },
	{ code: '002', value: '아키텍처팀' },
	{ code: '003', value: '영업사원1팀' },
	{ code: '004', value: '영업사원2팀' },
]; 

/* Parent-Children 셀렉트박스의 샘플 리스트 정보 */
const groupParentList = [
	{
		code: 'A그룹',
		value: 'A그룹',
		children: [
			{ code: 'A-1', value: 'A-1' },
			{ code: 'A-2', value: 'A-2' },
			{ code: 'A-3', value: 'A-2' },
			{ code: 'A-4', value: 'A-4' },
		],
	},
	{
		code: 'B그룹',
		value: 'B그룹',
		children: [
			{ code: 'B-1', value: 'B-1' },
			{ code: 'B-2', value: 'B-2' },
			{ code: 'B-3', value: 'B-2' },
		],
	},
	{
		code: 'C그룹',
		value: 'C그룹',
		children: [
			{ code: 'C-1', value: 'C-1' },
			{ code: 'C-2', value: 'C-2' },
			{ code: 'C-3', value: 'C-2' },
			{ code: 'C-4', value: 'C-4' },
			{ code: 'C-5', value: 'C-5' },
		],
	},
];

/* 마스터 그리드 초기화 */
const refMasterGrid = ref(null);

/* gridDataList 리스트 정보(샘플) */
const gridDataList = ref([
	{
		isChecked: false,
		id: 'gwahn',
		name: 'John Doe',
		age: 30,
        regDt: '2023-09-18',
		regDt1: '2023/08/23',
		year: '2022',
		month: '2023-08',
		dept: '001',
		phone: '010-4444-1122',
		email: 'jgwas@example.com',
		chk: 'N',
	},
	{
		isChecked: false,
		id: 'limTa',
		name: 'Jane Smith',
		age: 25,
        regDt: '2023-12-20',
		regDt1: '2023/08/31',
		year: '2023',
		month: '2023-08',
		dept: '002',
		phone: '010-2112-3344',
		email: 'jan1234th@example.com',
		chk: 'N',
	},
	{
		isChecked: false,
		id: 'kimJo',
		name: 'Jane Smith',
		age: 25,
        regDt: '2022-10-11',
		regDt1: '2023/09/23',
		year: '2021',
		month: '2022-01',
		dept: '003',
		phone: '010-9001-1234',
		email: 'test12@example.com',
		chk: 'Y',
	},
	{
		isChecked: false,
		id: 'suk',
		name: 'hello world',
		age: 10,
        regDt: '2021-01-01',
		regDt1: '2022/01/10',
		year: '2015',
		month: '2023-03',
		dept: '004',
		phone: '010-1234-9876',
		email: 'suk123@example.com',
		chk: 'N',
	},
]);

const columnLayout = [
	{
		dataField: 'id',
		headerText: 'ID',
	},
	{
		dataField: 'name',
		headerText: '이름',
	},
	{
		dataField: 'age',
		headerText: '나이',
		dataType: 'numeric',
	},
    {
		dataField: 'regDt',
		headerText: 'YYYY-MM-DD',
		width: 120,
		formatString: 'yyyy-mm-dd',
		dataType: 'date',
		renderer: {
			type: 'Datepicker',
			props: {
				format: 'YYYY-MM-DD',
				readonly: true,
			},
		},
	},
    {
		dataField: 'regDt1',
		headerText: 'YYYY/MM/DD',
		editable: false,
		width: 120,
		renderer: {
			type: 'Datepicker',
			props: {
				format: 'YYYY/MM/DD',
			},
		},
	},
    {
		dataField: 'year',
		headerText: 'YYYY',
		width: 120,
		renderer: {
			type: 'Datepicker',
			props: {
				format: 'YYYY',
				year: true,
			},
		},
	},
    {
		dataField: 'month',
		headerText: 'YYYY-MM',
		width: 120,
		renderer: {
			type: 'Datepicker',
			props: {
				format: 'YYYY-MM',
				month: true,
			},
		},
	},
	{
		dataField: 'dept',
		headerText: '부서',
		renderer: {
			type: 'Dropdown',
			list: deptList, //key-value Object 로 구성된 리스트
			keyField: 'code', // key 에 해당되는 필드명
			valueField: 'value', // value 에 해당되는 필드명
			showEditorBtn: false,
			//multipleMode: true, // 다중 선택 모드(기본값 : false)
			//showCheckAll: true, // 다중 선택 모드에서 전체 체크 선택/해제 표시(기본값:false);
		},
		labelFunction: function (rowIndex, columnIndex, value, headerText, item) {
			// key-value 에서 엑셀 내보내기 할 때 value 로 내보내기 위한 정의
			let retStr = ''; // key 값에 맞는 value 를 찾아 반환함.
			for (let i = 0, len = deptList.length; i < len; i++) {
				if (deptList[i]['code'] == value) {
					retStr = deptList[i]['value'];
					break;
				}
			}
			return retStr == '' ? value : retStr;
		},
	},
	{
		dataField: 'phone',
		headerText: '전화번호',
		filter: {
			showIcon: true, // 기본 필터 메뉴 아이콘 표시
			inline: false, // 인라인 필터 input 표시 안함
		},
	},
	{
		dataField: 'email',
		headerText: '이메일',
	},
	{
		dataField: 'chk',
		headerText: 'checked(1)',
		width: 80,
		renderer: {
			type: 'Checkbox',
			showLabel: false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			// true, false 인 경우가 기본(true, false가 아닌 다른 값으로 변경 가능)
			checkValue: 'Y',
			unCheckValue: 'N',
		},
	},
	{
		dataField: 'isChecked',
		headerText: 'checked(2)',
		width: 80,
		headerRenderer: {
			position: 'bottom', // 기본값 "bottom",
		},
		renderer: {
			type: 'Checkbox-Header',
			showLabel: false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			checkValue: true, // true, false 인 경우가 기본
			unCheckValue: false,
		},
	},
    {
		dataField: 'group1',
		headerText: '그룹(상위)',
		width: 120,
		renderer: {
			type: 'Dropdown',
			descendants: ['group2'], // 자손 필드들
			descendantDefaultValues: ['-'], // 변경 시 자손들에게 기본값 지정
			list: groupParentList,
			keyField: 'code', // key 에 해당되는 필드명
			valueField: 'value', // value 에 해당되는 필드명
		},
	},
	{
		dataField: 'group2',
		headerText: '그룹(하위)',
		width: 120,
		renderer: {
			type: 'Dropdown',
			keyField: 'code', // key 에 해당되는 필드명
			valueField: 'value', // value 에 해당되는 필드명
			listFunction: function (rowIndex, columnIndex, item, dataField) {
				if (item.group1 == 'A그룹') {
					// 그룹 필드에서 선택된 값 비교
					return groupParentList[0].children;
				} else if (item.group1 == 'B그룹') {
					return groupParentList[1].children;
				} else if (item.group1 == 'C그룹') {
					return groupParentList[2].children;
				}
			},
		},
    },
];

const gridProps = ref({
	showRowNumColumn: true,
	softRemoveRowMode: true,
	headerHeight: 60,
	selectionMode: 'singleRow', // 선택모드 : singleRow, multipleCells
	showStateColumn: true,      // 상태 칼럼 사용
	enableRestore: true,
	showRowAllCheckBox: true,   // 엑스트라 행 체크 박스 설정
	showRowCheckColumn: true,   // (showRowCheckColumn=true) 시 헤더에 전체 선택 체크박스 표시
});

/* 선택한 행 데이터 정보 */
function onSelectGrid(selectedRows) {
	if (selectedRows) {
		console.log('ColumnGrid[selectedRows] : ', selectedRows);
	}
}

</script>

<style lang="scss" scoped>

</style>