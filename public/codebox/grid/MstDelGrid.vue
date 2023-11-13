<template>
    <div>
        <AUIGrid
            ref="refMasterGrid"
            title="마스터 그리드"
            :data="masterData"
            :column-layout="masterColumns"
            :grid-props="gridProps"
            add
            remove
            @select="onSelectMasterData"
        />
        <AUIGrid
            ref="refDetailGrid"
            title="상세 그리드"
            :data="detailData"
            :column-layout="detailColumns"
            :grid-props="gridProps"
            :add="{
                useYn: 0,
                rsvStr2Val: 'N',
                comGrpCd: selectRow.comGrpCd,
            }"
            :btnDisabled="btnDisabled"
            remove
            copy
        />
    </div>
</template>

<script setup>
import axios from 'axios';
import AUIGrid from '@/components/AUIGrid.vue';

/* 마스터 + 상세 그리드 초기화 */
const refMasterGrid = ref(null);
const refDetailGrid = ref(null);

/* 마스터 + 상세 그리드 데이터 */
const masterData = ref([]);
const detailData = ref([]);

/* 변수모음 */
const selectRow = ref({});      // 선택한 ROW 정보
const btnDisabled = ref(false); // 버튼 활성화&비활성화

/* 마스터 그리드 컬럼 데이터 */
const masterColumns = [
	{
		headerText: '그룹코드',
		dataField: 'comGrpCd',
	},
	{
		headerText: '그룹명',
		dataField: 'grpCdNm',
	},
	{
		headerText: '그룹설명',
		dataField: 'grpCdDesc',
	},
	{
		headerText: '사용여부',
		dataField: 'useYn',
		renderer: {
			type: 'Checkbox',
			showLabel: false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			// true, false 인 경우가 기본(true, false가 아닌 다른 값으로 변경 가능)
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: '수정자',
		dataField: 'modId',
        editable: false,
	},
	{
		headerText: '수정일자',
		dataField: 'modDt',
		editable: false,
	},
	{
		dataField: 'comGrpCdOrig',
		visible: false,
	},
];

/* 상세 그리드 컬럼 데이터 */
const detailColumns = [
	{
		headerText: '코드',
		dataField: 'comCd',
	},
	{
		headerText: '코드명',
		dataField: 'cdNm',
	},
	{
		headerText: '정렬순서',
		dataField: 'sortNo',
	},
	{
		headerText: '코드설명',
		dataField: 'cdDesc',
	},
	{
		headerText: '사용여부',
		dataField: 'useYn',
		renderer: {
			type: 'Checkbox',
			showLabel: false, // 참, 거짓 텍스트 출력여부( 기본값 false )
			editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
			// true, false 인 경우가 기본(true, false가 아닌 다른 값으로 변경 가능)
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: '참조1',
		dataField: 'rsvStr1Val',
	},
	{
		headerText: '참조2',
		dataField: 'rsvStr2Val',
	},
	{
		headerText: '참조3',
		dataField: 'rsvStr3Val',
	},
	{
		headerText: '참조4',
		dataField: 'rsvStr4Val',
	},
	{
		headerText: '참조5',
		dataField: 'rsvStr5Val',
	},
	{
		headerText: '참조6',
		dataField: 'rsvStr6Val',
	},
	{
		headerText: '참조7',
		dataField: 'rsvStr7Val',
	},
	{
		headerText: '참조8',
		dataField: 'rsvStr8Val',
	},
	{
		headerText: '그룹코드',
		dataField: 'comGrpCd',
	},
	{
		dataField: 'comCdOrig',
		visible: false,
	},
];

/* 그리드 속성 설정(기본 설정 제외한 추가설정 정보) */
const gridProps = ref({
	showRowNumColumn: true,
	softRemoveRowMode: true,
	selectionMode: 'singleRow', // 선택모드 : singleRow, multipleCells
	showStateColumn: true,      // 상태 칼럼 사용
	enableRestore: true,
});

onMounted(() => {
	apiGetMasterGridData();
});

/* 마스터그리드 데이터 조회 */
const apiGetMasterGridData = params => {
	// let params = { ...searchForm.value }; -> params : 검색값 전달할 경우
	return axios
		.get('http://api.canalframe.cj.net/sysmgt/func/commoncode/searchGroupCd', {
			params,
		})
		.then(res => {
			masterData.value = res.data.data;
			apiGetDetailGridData(masterData.value[0]?.comGrpCd);
		});
};

/* 상세그리드 데이터 조회 */
const apiGetDetailGridData = comGrpCd => {
	let params = { comGrpCd: comGrpCd };
	return axios
		.get('http://api.canalframe.cj.net/sysmgt/func/commoncode/searchCommonCd', {
			params,
		})
		.then(res => {
			detailData.value = res.data.data;
		});
};

/* 마스터 그리드 선택 -> 상세 그리드 조회 */
function onSelectMasterData(selectedRows) {
    console.log('MstDelGrid[selectedRows] : ', selectedRows);

    if (selectedRows.rowStatus == 'I') {
		btnDisabled.value = true;
	} else {
		btnDisabled.value = false;
	}

	if (selectedRows.comGrpCd) {
		apiGetDetailGridData(selectedRows.comGrpCd);
		selectRow.value = selectedRows;
	} else {
		refDetailGrid.value.clearGridData();
	}
}

</script>

<style lang="scss" scoped>

</style>