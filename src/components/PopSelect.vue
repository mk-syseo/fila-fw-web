<!--------------------------------------------------------------------
	파일   : PopSelect.vue
	작성   : CJ Developer
	설명	 : [공통] 팝업 그룹코드 조회 예시
---------------------------------------------------------------------->
<template>
	<FLayerPopup
		ref="refPopup"
		:width="popupWidth"
		:height="popupHeight"
		@confirm="onClickConfirm"
	>
		<FButton text icon="ico-16-black-search" class="size28" />

		<template #header>
			<h2>그룹코드 검색</h2>
		</template>

		<template #body>
			<FGridRow is-grid-cols="1">
				<FGridCol>
					<FForm search form-only>
						<FFormRow is-grid-cols="2">
							<FFormCol>
								<FInput
									id="comGrpCd"
									v-model="searchForm.comGrpCd"
									label="그룹코드"
									placeholder="그룹코드를 입력하세요"
									complete
								/>
							</FFormCol>
							<FFormCol>
								<FInput
									id="grpCdNm"
									v-model="searchForm.grpCdNm"
									label="그룹명"
									placeholder="그룹명을 입력하세요"
								/>
							</FFormCol>
						</FFormRow>
						<FFormRow>
							<FlexBox class="gap-x-[6px] justify-end">
								<!-- <FButton icon="ico-16-reset">초기화</FButton> -->
								<FButton icon="ico-16-search" @click="onSearchEmpList"
									>조회</FButton
								>
							</FlexBox>
						</FFormRow>
					</FForm>
					<AUIGrid
						ref="refMasterGrid"
						title="일반그리드(기본)"
						:data="gridDataList"
						:column-layout="columnLayout"
						:grid-props="gridProps"
						@select="onSelectGrid"
					/>
				</FGridCol>
			</FGridRow>
		</template>

		<template #footer></template>
	</FLayerPopup>
</template>

<script setup>
import FForm from '@/components/FForm.vue';
import AUIGrid from '@/components/AUIGrid.vue';
import apiCall from '@/plugins/apiCall';
import FInput from '@/components/FInput.vue';
import FButton from '@/components/FButton.vue';
import FLayerPopup from '@/components/FLayerPopup.vue';

import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';
import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';
import FlexBox from '@/components/FlexBox.vue';

const refPopup = ref(null);

const popupList = ref([]);

const props = defineProps({
	// Value Setting
	modelValue: {
		type: String,
	},
	popupWidth: {
		type: String,
	},
	popupHeight: {
		type: String,
	},
	fixLabel: {
		type: String,
	},
});

const emit = defineEmits(['update:modelValue', 'receive']);

const gridDataList = ref([]);
const selectedAddress = ref({});

// 그리드
const searchForm = ref({ comGrpCd: '', grpCdNm: '', useYn: '' });

/**
 * Grid
 */
const refMasterGrid = ref(null); // 마스터 그리드 초기화

const columnLayout = [
	{
		dataField: 'comGrpCd',
		headerText: '그룹코드',
		width: '50%',
	},
	{
		dataField: 'grpCdNm',
		headerText: '그룹명',
		width: '50%',
	},
];

const gridProps = ref({
	showRowNumColumn: true,
	softRemoveRowMode: true,
	// 선택모드 : singleRow, multipleCells
	selectionMode: 'singleRow',
	enableMovingColumn: false,
	// 인라인 필터 행을 표시할지 여부
	showInlineFilter: false,
	// 필터링 가능 여부
	enableFilter: true,
	// 상태 칼럼 사용
	showStateColumn: true,
	enableRestore: true,
	useContextMenu: true,
	autoGridHeight: false,
	editable: false,
});

function onSelectGrid(selectedRows) {
	// 선택한 행 데이터 정보
	selectedAddress.value = selectedRows;
}

function onSearchEmpList() {
	const params = { ...searchForm.value };

	apiCall
		.get('/sysmgt/func/commoncode/searchGroupCd', params)
		.then(res => {
			// 요청이 성공한 경우 : 응답 데이터를 처리
			const datas = res.data.data; // ex) [{…}, {…}]
			// 응답 데이터를 컬럼으로 세팅

			popupList.value = datas;
			refMasterGrid.value.setGridData(popupList.value);
			setEventBind();
		})
		.catch(err => {
			// 요청이 실패한 경우 이 곳에서 오류를 처리
			console.error(err);
		});
}

function setEventBind() {
	refMasterGrid.value.bind('cellDoubleClick', event => {
		console.log('cellDoubleClick Event');

		emitFunction();
	});
}

const onClickConfirm = () => {
	emitFunction();
};

function emitFunction() {
	let data = refMasterGrid.value.getSelectedItems()[0].item;

	emit('receive', data);
	refPopup.value.close();
}
</script>

<style lang="scss" scoped>
input {
	width: 100%;
	box-sizing: border-box;
	padding-left: 8px;
	font-size: 13px;
}
</style>
