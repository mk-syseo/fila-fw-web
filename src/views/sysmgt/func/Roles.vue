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
		</FFormRow>
	</FForm>

	<FGridRow is-grid-cols="1">
		<FGridCol>
			<AUIGrid
				ref="refGrid"
				:title="t('sysmgt.roles.title')"
				add
				remove
				:grid-props="gridProps"
				:column-layout="gridColumns"
				:data="gridData"
			/>
		</FGridCol>
	</FGridRow>
</template>

<script setup>
import apiCall from '@/plugins/apiCall';
import commonUtils from '@/utils/commonUtils';
import { useMessage } from '@/plugins/message/message';

import AUIGrid from '@/components/AUIGrid.vue';
import FInput from '@/components/FInput.vue';
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

const gridProps = {
	// 상태 칼럼 사용
	showStateColumn: true,
	softRemoveRowMode: true,
	height: 640,
};

const gridColumns = [
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

// 그리드 데이터 조회
const gridData = ref([]);
const searchForm = ref({ authority: '', roleNm: '' });

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
		gridData.value = res.data.data;
	});
}

// 그리드 데이터 저장
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
			let params = { roles: refGrid.value.getChangedData() };
			console.log('roles getChangedData : ', params);
			apiCall.post('/sysmgt/func/roles/save', params).then(() => {
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
