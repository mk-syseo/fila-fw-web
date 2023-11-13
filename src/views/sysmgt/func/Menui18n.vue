<template>
	<FPageTitle @search="onClickSearch" @save="onClickSave" />

	<FForm search @submit="handleSearch">
		<FFormRow is-grid-cols="6">
			<FFormCol>
				<FInput
					id="menuId"
					v-model="searchForm.menuId"
					:label="t('sysmgt.menu.menuId')"
					:placeholder="
						t(
							'com.msg.placeholder2',
							[t('sysmgt.menu.menuId')],
							'메뉴ID를 입력해주세요.',
						)
					"
				/>
			</FFormCol>
			<FFormCol>
				<FInput
					id="menuNm"
					v-model="searchForm.menuNm"
					:label="t('sysmgt.menu.menuNm')"
					:placeholder="
						t(
							'com.msg.placeholder2',
							[t('sysmgt.menu.menuNm')],
							'메뉴명을 입력해주세요.',
						)
					"
				/>
			</FFormCol>
		</FFormRow>
	</FForm>

	<FGridRow is-grid-cols="1">
		<FGridCol>
			<AUIGrid
				ref="refGrid"
				:title="t('sysmgt.menu.title')"
				is-tree
				:grid-props="gridProps"
				:column-layout="codeDetailColumns()"
				:data="menuData"
			>
				<template #header></template>
			</AUIGrid>
		</FGridCol>
	</FGridRow>
</template>

<script setup>
import apiCall from '@/plugins/apiCall';
import commonUtils from '@/utils/commonUtils';
import { useMessage } from '@/plugins/message/message';

import AUIGrid from '@/components/AUIGrid.vue';
import FInput from '@/components/FInput.vue';
//import FSelect from '@/components/FSelect';
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';

import FPageTitle from '@/components/FPageTitle.vue';

import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';

const { t } = useI18n();
const message = useMessage();

/* 그리드 설정 */
const refGrid = ref(null);

/**
 * 그룹코드 - 다국어 정보
 */
let langCds;
let langCols = [];
function initDefaultSetting() {
	// 다국어 메시지 언어 정보
	for (const idx in langCds) {
		let comCd = langCds[idx].comCd;
		let cdNm = langCds[idx].cdNm;

		langCols.push({
			headerText: cdNm,
			dataField: comCd,
		});
	}
}

const gridProps = {
	displayTreeOpen: true,
	flat2tree: true,
	rowIdField: 'rowId',
	treeIdField: 'menuId',
	treeIdRefField: 'refUpperMenuId',
	// 상태 칼럼 사용
	showStateColumn: true,
	softRemoveRowMode: true,
};

function codeDetailColumns() {
	return [
		{
			headerText: t('sysmgt.menu.menuId'),
			dataField: 'menuId',
			width: '25%',
			editable: false,
		},
	]
		.concat(langCols)
		.concat([
			{
				headerText: t('sysmgt.menu.regId'),
				dataField: 'regId',
				editable: false,
				width: '15%',
			},
			{
				headerText: t('sysmgt.menu.regYmd'),
				dataField: 'regDt',
				editable: false,
				width: '15%',
			},
			{
				headerText: t('sysmgt.menu.upperMenuId'),
				dataField: 'refMenuId',
				visible: false,
			},
			{
				dataField: 'refUpperMenuId',
				visible: false,
			},
			{
				dataField: 'rowId',
				visible: false,
			},
		]);
}

const menuData = ref([]);

const searchForm = ref({ menuId: '', menuNm: '', menuYn: '' });

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

	apiCall.get('/sysmgt/func/menuI18N/list', params).then(res => {
		menuData.value = res.data.data;
	});
}

/**
 * 그리드 데이터 저장
 */
function onClickSave() {
	//변경사항 체크
	if (!refGrid.value.isModified()) {
		message.showAlert({
			message: '변경사항이 없습니다.',
		});
		return false;
	}
	console.log(refGrid.value.getChangedData());
	message.showConfirm({
		message: '저장하시겠습니까?',
		onConfirm: () => {
			let params = { menuI18Ns: refGrid.value.getChangedData() };
			console.log('getChangedData : ', params);

			apiCall.post('/sysmgt/func/menuI18N/save', params).then(() => {
				message.showAlert({
					message: '저장되었습니다.',
				});
				onClickSearch();
			});
			message.hide();
		},
	});
}

onMounted(async () => {
	onClickSearch();

	const params = { comGrpCd: 'LANG_CD' };

	await apiCall.get('/common/public/commonCdList', params).then(res => {
		langCds = res.data.data;
	});
	initDefaultSetting();
});
</script>

<style lang="scss" scoped></style>
