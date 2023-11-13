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
			<FFormCol>
				<FSelect
					v-model="searchForm.menuYn"
					:label="t('sysmgt.menu.menuYn')"
					:required="true"
					:options="searchType"
					empty
					click-only
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
				:add="[
					{
						isPopup: '0',
						menuYn: '0',
						useYn: '1',
					},
					'upperMenuId',
					'selectionDown',
				]"
				remove
				:grid-props="gridProps"
				:column-layout="menuColumns"
				:data="menuData"
			>
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
import FSelect from '@/components/FSelect.vue';
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';

import FPageTitle from '@/components/FPageTitle.vue';

import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';

const { t } = useI18n();
const message = useMessage();

const searchType = ref([
	{ label: '메뉴', value: '1' },
	{ label: 'API', value: '0' },
]);

/* 그리드 설정 */
const refGrid = ref(null);

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

const menuColumns = [
	{
		headerText: t('sysmgt.menu.menuId'),
		dataField: 'menuId',
		width: '20%',
	},
	{
		headerText: t('sysmgt.menu.menuNm'),
		dataField: 'menuNm',
		width: '15%',
	},
	{
		headerText: t('sysmgt.menu.menuYn'),
		dataField: 'menuYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
		sortable: false,
		width: '5%',
	},
	{
		headerText: t('sysmgt.menu.useYn'),
		dataField: 'useYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
		sortable: false,
		width: '5%',
	},
	{
		headerText: t('sysmgt.menu.isPopup'),
		dataField: 'isPopup',
		renderer: { type: 'Checkox' },
		visible: false,
	},
	{
		headerText: t('sysmgt.menu.menuUrl'),
		dataField: 'menuUrl',
		width: '20%',
	},
	{
		headerText: t('sysmgt.menu.description'),
		dataField: 'description',
		visible: false,
	},
	{
		headerText: t('sysmgt.menu.sortOrder'),
		dataField: 'sortOrder',
		width: '5%',
	},
	{
		headerText: t('sysmgt.menu.upperMenuId'),
		dataField: 'upperMenuId',
		width: '10%',
	},
	{
		headerText: t('sysmgt.menu.regId'),
		dataField: 'regId',
		editable: false,
		width: '10%',
	},
	{
		headerText: t('sysmgt.menu.regYmd'),
		dataField: 'regDt',
		editable: false,
		width: '10%',
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
];

const menuData = ref([]);

const searchForm = ref({ menuId: '', menuNm: '', menuYn: '' });

/**
 * 그리드 데이터 조회
 */
function onClickSearch() {
	const params = { ...searchForm.value };
	console.log('params : ', params);

	// GET Method 요청 시 param에 '[', ']' 포함되어 있으면 요청을 중단함.
	if (!commonUtils.checkGetReqParam(params)) {
		message.showAlert({
			message: '사용불가 문자가 있습니다.',
		});
		return;
	}

	apiCall.get('/sysmgt/func/menu/list', params).then(res => {
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

	message.showConfirm({
		message: '저장하시겠습니까?',
		onConfirm: () => {
			let params = { menus: refGrid.value.getChangedData() };
			console.log('menu getChangedData : ', params);
			apiCall.post('/sysmgt/func/menu/save', params).then(() => {
				message.showAlert({
					message: '저장되었습니다.',
				});
				onClickSearch();
			});
			message.hide();
		},
	});
}

onMounted(() => {
	onClickSearch();
});
</script>

<style lang="scss" scoped></style>
