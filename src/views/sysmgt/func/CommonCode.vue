<template>
	<FPageTitle @search="onClickSearch" @save="onClickSave" />

	<FForm search @submit="handleSearch">
		<FFormRow is-grid-cols="6">
			<FFormCol>
				<FInput
					id="comGrpCd"
					v-model="searchForm.comGrpCd"
					:label="t('sysmgt.commoncode.group.comGrpCd')"
					:placeholder="
						t(
							'com.msg.placeholder2',
							[t('sysmgt.commoncode.group.comGrpCd')],
							'그룹코드를 입력해주세요.',
						)
					"
				/>
			</FFormCol>
			<FFormCol>
				<FInput
					id="grpCdNm"
					v-model="searchForm.grpCdNm"
					:label="t('sysmgt.commoncode.group.grpCdNm')"
					:placeholder="
						t(
							'com.msg.placeholder1',
							[t('sysmgt.commoncode.group.grpCdNm')],
							'그룹명을 입력해주세요.',
						)
					"
				/>
			</FFormCol>
			<!-- <FFormCol>
				<FCheckbox
					id="useYn"
					v-model="searchForm.useYn"
					:label="t('sysmgt.commoncode.group.useYn')"
					true-value="1"
					false-value=""
				/>
			</FFormCol> -->
		</FFormRow>
	</FForm>
	<FGridRow is-grid-cols="1" class="grid-rows-[repeat(1, minmax(0, 1fr))]">
		<FGridCol>
			<AUIGrid
				ref="refgroupCodeGrid"
				:title="t('sysmgt.commoncode.group.title')"
				:grid-props="groupCodeGridProps"
				:column-layout="groupCodeColumns"
				:data="groupCodeData"
				add
				remove
				@select="getSearchCommonCdList($event)"
			>
			</AUIGrid>
		</FGridCol>
		<FGridCol>
			<AUIGrid
				ref="refCommonCodeGrid"
				:title="t('sysmgt.commoncode.code.title')"
				:column-layout="menuColumns"
				:data="filterData"
				:add="[
					{
						useYn: '1',
						comGrpCd: selectRow.comGrpCd,
						comCdOrig: selectRow.comCdOrig,
						rowStatus: 'I',
					},
				]"
				remove
			/>
		</FGridCol>
	</FGridRow>
</template>

<script setup>
import apiCall from '@/plugins/apiCall';
import AUIGrid from '@/components/AUIGrid.vue';

import FInput from '@/components/FInput.vue';

import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';
import FPageTitle from '@/components/FPageTitle.vue';

import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';

import commonUtils from '@/utils/commonUtils';
import { useMessage } from '@/plugins/message/message';

const { t } = useI18n();
const message = useMessage();

const selectRow = ref({}); // 전체 페이징 갯수

// 그리드
const searchForm = ref({ comGrpCd: '', grpCdNm: '', useYn: '' });

/**
 * 그리드 데이터 조회
 */
function onClickSearch() {
	const params = { ...searchForm.value };

	// GET Method 요청 시 param에 '[', ']' 포함되어 있으면 요청을 중단함.
	if (!commonUtils.checkGetReqParam(params)) {
		message.showAlert({
			message: '사용불가 문자가 있습니다.',
		});
		return;
	}

	apiCall.get('/sysmgt/func/commoncode/searchGroupCd', params).then(res => {
		groupCodeData.value = res.data.data;
		getSearchCommonCdList(groupCodeData.value[0]);
	});
}

function getSearchCommonCdList(gCode) {
	if (commonUtils.isEmpty(gCode)) {
		filterData.value = [];
		return;
	}

	const params = { comGrpCd: gCode.comGrpCd };

	apiCall.get('/sysmgt/func/commoncode/searchCommonCd', params).then(res => {
		codeList.value = res.data.data;
		if (searchForm.value.useYn === '1') {
			filterData.value = codeList.value.filter(menu => menu.useYn === '1');
		} else {
			filterData.value = codeList.value;
		}
	});
	selectRow.value = event;
}

/**
 * 그리드 데이터 저장
 */
function onClickSave() {
	//변경사항 체크
	if (
		!refCommonCodeGrid.value.isModified() &&
		!refgroupCodeGrid.value.isModified()
	) {
		message.showAlert({
			message: '변경사항이 없습니다.',
		});
		return false;
	}

	message.showConfirm({
		message: '저장하시겠습니까?',
		onConfirm: () => {
			let params = {
				codeGrps: refgroupCodeGrid.value.getChangedData(),
				codeDtls: refCommonCodeGrid.value.getChangedData(),
			};

			console.log('getChangedData : ', params);
			apiCall.post('/sysmgt/func/commoncode/save', params).then(() => {
				message.showAlert({
					message: '저장되었습니다.',
				});
				onClickSearch();
			});
			message.hide();
		},
	});
}

/**
 * 상단 그리드(그룹코드)
 */
const refgroupCodeGrid = ref(null);

const groupCodeData = ref([]);
const groupCodeGridProps = {
	//editable: false,
};
const groupCodeColumns = [
	{
		headerText: t('sysmgt.commoncode.group.comGrpCd'),
		dataField: 'comGrpCd',
		headerStyle: 'aui-require', // 필수입력 헤더 스타일
		style: 'aui-require', // 필수입력 컬럼 스타일
	},
	{
		headerText: t('sysmgt.commoncode.group.grpCdNm'),
		dataField: 'grpCdNm',
		style: 'aui-edit-false', // readonly 컬럼 스타일
		editable: false,
	},
	{
		headerText: t('sysmgt.commoncode.group.grpCdDesc'),
		dataField: 'grpCdDesc',
	},
	{
		headerText: t('sysmgt.commoncode.group.useYn'),
		dataField: 'useYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.commoncode.group.modId'),
		dataField: 'modId',
		editable: false,
	},
	{
		headerText: t('sysmgt.commoncode.group.modDt'),
		dataField: 'modDt',
		editable: false,
	},
	{
		headerText: t('sysmgt.commoncode.group.comGrpCd'),
		dataField: 'comGrpCdOrig',
		visible: false,
	},
];

/**
 * 하단 그리드(코드)
 */
const refCommonCodeGrid = ref(null);

const codeList = ref([]);
const filterData = ref([]);
const menuColumns = [
	{
		headerText: t('sysmgt.commoncode.code.comCd'),
		dataField: 'comCd',
		width: 200,
	},
	{
		headerText: t('sysmgt.commoncode.code.cdNm'),
		dataField: 'cdNm',
		width: 200,
	},
	{
		headerText: t('sysmgt.commoncode.code.sortNo'),
		dataField: 'sortNo',
	},
	{
		headerText: t('sysmgt.commoncode.code.cdDesc'),
		dataField: 'cdDesc',
	},
	{
		headerText: t('sysmgt.commoncode.code.useYn'),
		dataField: 'useYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '1',
		dataField: 'rsvStr1Val',
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '2',
		dataField: 'rsvStr2Val',
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '3',
		dataField: 'rsvStr3Val',
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '4',
		dataField: 'rsvStr4Val',
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '5',
		dataField: 'rsvStr5Val',
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '6',
		dataField: 'rsvStr6Val',
	},
	{
		headerText: t('sysmgt.commoncode.code.rsvStrVal') + '7',
		dataField: 'rsvStr7Val',
	},
	{
		headerText: t('sysmgt.commoncode.group.comGrpCd') + '8',
		dataField: 'rsvStr8Val',
	},
	{
		headerText: t('sysmgt.commoncode.group.comGrpCd'),
		dataField: 'comGrpCd',
		editable: false,
	},
	{
		headerText: t('sysmgt.commoncode.group.grpCdNm'),
		dataField: 'comCdOrig',
		visible: false,
	},
];

onMounted(() => {
	onClickSearch();
});

// 메뉴여부 선택 시 조회한 데이터 중 menuYn이 1인 데이터만 필터링하여 노출
// watch(
// 	searchForm,
// 	value => {
// 		if (value.menuYn === '1') {
// 			filterData.value = codeList.value.filter(menu => menu.menuYn === '1');
// 		} else {
// 			filterData.value = codeList.value;
// 		}
// 	},
// 	{ deep: true },
// );
</script>

<style lang="scss" scoped></style>
