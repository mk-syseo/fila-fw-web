<!--############################################################################
# Filename    : PopEmpList.vue
# Description : [공통] 팝업 기초 화면
# TO-DO 기본 업무 문의 필요(조회조건 관련)
################################################################################-->
<template>
	<!-- 팝업 Start -->

	<FLayerPopup ref="refPopup" width="480" height="412">
		열기
		<template #header>
			<h2>사원정보</h2>
		</template>

		<template #body>
			<FForm
				v-model="formValue"
				:submit="onSubmit"
				:reset="reset"
				search
				class="mb-[20px]"
			>
				<FFormRow class="grid-cols-1">
					<FFormCol>
						<FInput
							id="inputOption"
							v-model="inputOption"
							:name="inputName"
							class="pr-30-search"
						/>
						<FButton text icon="ico-16-search" @click="getEmpList" />
					</FFormCol>
				</FFormRow>
			</FForm>
			<FGridRow is-grid-cols="1">
				<FGridCol>
					<AUIGrid
						ref="refMasterGrid"
						title="상세정보"
						direction="vertical"
						:data="gridDataList"
						:column-layout="columnLayout"
						:grid-props="gridProps"
						@select="onSelectGrid"
					/>
				</FGridCol>
			</FGridRow>
		</template>
		<!-- 
		<template #footer></template>
		-->
	</FLayerPopup>
</template>
<script setup>
import apiCall from '@/plugins/apiCall';

import AUIGrid from '@/components/AUIGrid.vue';
import FLayerPopup from '@/components/FLayerPopup.vue'; // 자식 컴포넌트 경로에 따라 수정
import FInput from '@/components/FInput.vue';
import FButton from '@/components/FButton.vue';
import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';

const refPopup = ref(null);

const popupList = ref([]);
let checkLabel = null;

const props = defineProps({
	// Value Setting
	modelValue: {
		type: String,
	},
	popupTitle: {
		type: String,
	},
	popupWidth: {
		type: String,
	},
	popupHeight: {
		type: String,
	},
	inputLabel: {
		type: String,
	},
	inputName: {
		type: String,
	},
	fixLabel: {
		type: String,
	},
});

const popupWidth = ref(props.popupWidth);
const popupHeight = ref(props.popupHeight);
const inputLabel = ref(props.inputLabel);
const inputName = ref(props.inputName);
/**
 * Grid
 */
const refMasterGrid = ref(null); // 마스터 그리드 초기화

const columnLayout = [
	{
		dataField: 'userId',
		headerText: 'ID',
		width: 100,
	},
	{
		dataField: 'userNm',
		headerText: '이름',
		width: 100,
	},
	{
		dataField: 'userEnable',
		headerText: 'userEnable',
		width: 158,
	},
];

columnLayout.some(function (v) {
	checkLabel = v.headerText == props.fixLabel ? v.dataField : false;
	if (checkLabel != false) return true;
	else return false;
});

const gridProps = ref({
	showRowNumColumn: true,
	editable: true,
	softRemoveRowMode: true,
	// 선택모드 : singleRow, multipleCells
	selectionMode: 'singleRow',
	enableMovingColumn: true,
	// 인라인 필터 행을 표시할지 여부
	showInlineFilter: true,
	// 필터링 가능 여부
	enableFilter: true,
	// 상태 칼럼 사용
	showStateColumn: true,
	enableRestore: true,
	useContextMenu: true,
	autoGridHeight: false,
});

const getEmpList = async () => {
	await apiCall
		.get('http://api.canalframe.cj.net/sysmgt/func/users/list')
		.then(res => {
			// 요청이 성공한 경우 : 응답 데이터를 처리
			const datas = res.data.data; // ex) [{…}, {…}]
			// 응답 데이터를 컬럼으로 세팅
			const newCols = datas.map(el => ({
				headerText: el.cdNm,
				dataField: el.comCd,
				width: 200,
			}));

			popupList.value = datas;
			refMasterGrid.value.setGridData(popupList.value);
			setEventBind();
		})
		.catch(err => {
			// 요청이 실패한 경우 이 곳에서 오류를 처리
			console.error(err);
		});
};

function onSelectGrid(selectedRows) {
	// 선택한 행 데이터 정보
	if (selectedRows) {
		console.log('selected Data: ', selectedRows);
	}
}

function setEventBind() {
	refMasterGrid.value.bind('cellDoubleClick', event => {
		console.log('cellDoubleClick Event');

		emitFunction();
	});
}

/**
 * Emit Value
 */
const emit = defineEmits(['update:modelValue', 'receiveData']);

const confirm = () => {
	emitFunction();
};

const inputOption = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		// emit 'update:modelValue' 이벤트로 변경된 값을 부모 컴포넌트로 전달합니다.
		emit('update:modelValue', value);
	},
});

/**
 * Expose Function
 */
const openPopup = () => {
	refPopup.value.openPopup();
	getEmpList();
};

const closePopup = () => {
	refPopup.value.closePopup();
};

function emitFunction() {
	let data = refMasterGrid.value.getSelectedItems()[0];
	data.checkLabel = checkLabel;

	//emit('receiveData', refMasterGrid.value.getSelectedItems());
	emit('receiveData', data);
	refPopup.value.closePopup();
}

defineExpose({ openPopup });
</script>

<style lang="scss" scoped>
/* 모달 스타일 설정 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5); /* 반투명 레이어 */
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background-color: #fff;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.input-box {
	width: 100%;
	.input-item {
		input {
			padding-right: 30px;
		}
	}
}
button {
	position: absolute;
	right: 10px;
	background-color: transparent;
}
</style>
