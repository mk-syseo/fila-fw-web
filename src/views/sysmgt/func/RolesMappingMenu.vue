<template>
	<FPageTitle @search="onClickSearch" @save="onClickSave" />

	<FForm search @submit="handleSearch">
		<FFormRow is-grid-cols="6">
			<FFormCol>
				<FInput
					id="authority"
					v-model="searchForm.authority"
					:label="t('sysmgt.roles.group.authority')"
					:placeholder="
						t(
							'com.msg.placeholder1',
							[t('sysmgt.roles.group.authority')],
							'권한 코드를 입력해주세요.',
						)
					"
				/>
			</FFormCol>
			<FFormCol>
				<FInput
					id="roleNm"
					v-model="searchForm.roleNm"
					:label="t('sysmgt.roles.group.roleNm')"
					:placeholder="
						t(
							'com.msg.placeholder1',
							[t('sysmgt.roles.group.roleNm')],
							'권한명을 입력해주세요.',
						)
					"
				/>
			</FFormCol>
			<FFormCol>
				<FCheckbox
					id="menuYn"
					v-model="searchForm.menuYn"
					:label="t('sysmgt.roles.group.menuYn')"
					true-value="1"
					false-value=""
				/>
			</FFormCol>
		</FFormRow>
	</FForm>
	<FGridRow is-grid-cols="1" class="grid-rows-[repeat(1, minmax(0, 1fr))]">
		<FGridCol>
			<AUIGrid
				ref="refRoleGrid"
				:title="t('sysmgt.roles.group.authority')"
				:grid-props="roleGridProps"
				:column-layout="roleColumns"
				:data="roleData"
				@select="getRolesMenu($event.authority)"
			/>
		</FGridCol>
		<FGridCol>
			<AUIGrid
				ref="refMenuGrid"
				:title="t('sysmgt.menu.title')"
				:column-layout="menuColumns"
				:data="filterData"
			/>
		</FGridCol>
	</FGridRow>
</template>

<script setup>
import apiCall from '@/plugins/apiCall';

import AUIGrid from '@/components/AUIGrid.vue';
import FInput from '@/components/FInput.vue';
import FCheckbox from '@/components/FCheckbox.vue';
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

// 그리드
const searchForm = ref({ authority: '', roleNm: '', menuYn: '' });

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

	apiCall.get('/sysmgt/func/roles/list', params).then(res => {
		roleData.value = res.data.data;
	});
}

function getRolesMenu(authority) {
	const params = { authority: authority };
	apiCall.get('/sysmgt/func/rolesmappingmenu/list', params).then(res => {
		menuData.value = res.data.data;
		if (searchForm.value.menuYn === '1') {
			filterData.value = menuData.value.filter(menu => menu.menuYn === '1');
		} else {
			filterData.value = menuData.value;
		}
	});
}

/**
 * 그리드 데이터 저장
 */
function onClickSave() {
	//변경사항 체크
	if (!refMenuGrid.value.isModified()) {
		message.showAlert({
			message: '변경사항이 없습니다.',
		});
		return false;
	}

	message.showConfirm({
		message: '저장하시겠습니까?',
		onConfirm: () => {
			let params = { roleMenus: refMenuGrid.value.getChangedData() };
			console.log('getChangedData : ', params);
			apiCall.post('/sysmgt/func/rolesmappingmenu/save', params).then(() => {
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
 * 좌측 그리드(권한)
 */
const refRoleGrid = ref(null);

const roleData = ref([]);
const roleGridProps = {
	editable: false,
};
const roleColumns = [
	{
		headerText: t('sysmgt.roles.group.authority'),
		dataField: 'authority',
	},
	{
		headerText: t('sysmgt.roles.group.roleNm'),
		dataField: 'roleNm',
	},
	{
		headerText: t('sysmgt.roles.group.description'),
		dataField: 'description',
	},
	{
		headerText: t('sysmgt.roles.group.regId'),
		dataField: 'regId',
		editable: false,
	},
	{
		headerText: t('sysmgt.roles.group.regDt'),
		dataField: 'regDt',
		editable: false,
	},
];

/**
 * 우측 그리드(권한별 메뉴)
 */
const refMenuGrid = ref(null);

const menuData = ref([]);
const filterData = ref([]);
const menuColumns = [
	{
		headerText: t('sysmgt.menu.menuId'),
		dataField: 'menuId',
		width: 200,
	},
	{
		headerText: t('sysmgt.menu.menuNm'),
		dataField: 'menuNm',
		width: 200,
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
	},
	{
		headerText: t('sysmgt.roles.menu.useYn'),
		dataField: 'useYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.searchYn'),
		dataField: 'searchYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.newYn'),
		dataField: 'newYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.deleteYn'),
		dataField: 'deleteYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.saveYn'),
		dataField: 'saveYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.printYn'),
		dataField: 'printYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.excelYn'),
		dataField: 'excelYn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn1Yn'),
		dataField: 'btn1Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn2Yn'),
		dataField: 'btn2Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn3Yn'),
		dataField: 'btn3Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn4Yn'),
		dataField: 'btn4Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn5Yn'),
		dataField: 'btn5Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn6Yn'),
		dataField: 'btn6Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn7Yn'),
		dataField: 'btn7Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn8Yn'),
		dataField: 'btn8Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn9Yn'),
		dataField: 'btn9Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
	{
		headerText: t('sysmgt.roles.menu.btn10Yn'),
		dataField: 'btn10Yn',
		renderer: {
			type: 'Checkbox',
			editable: true,
			checkValue: '1',
			unCheckValue: '0',
		},
	},
];

onMounted(() => {
	onClickSearch();
});

// 메뉴여부 선택 시 조회한 데이터 중 menuYn이 1인 데이터만 필터링하여 노출
watch(
	searchForm,
	value => {
		if (value.menuYn === '1') {
			filterData.value = menuData.value.filter(menu => menu.menuYn === '1');
		} else {
			filterData.value = menuData.value;
		}
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
