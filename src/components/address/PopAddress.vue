<!--------------------------------------------------------------------
	파일   : PopAddress.vue
	작성   : CJ Developer
	설명	 : [공통] 행안부 주소API 팝업 컴포넌트
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
			<h2>주소검색</h2>
		</template>

		<template #body>
			<FGridRow is-grid-cols="1">
				<FGridCol>
					<FForm search form-only>
						<FFormRow is-grid-cols="1">
							<FFormCol>
								<FInput
									id="keyword"
									v-model="keyword"
									placeholder="도로명 주소 검색"
									@input="onKeywordChange"
									@keyup.enter="onSearchAddress"
								/>
							</FFormCol>
						</FFormRow>
						<FFormRow>
							<FlexBox class="gap-x-[6px] justify-end">
								<!-- <FButton icon="ico-16-reset">초기화</FButton> -->
								<FButton icon="ico-16-search" @click="onSearchAddress"
									>조회</FButton
								>
							</FlexBox>
						</FFormRow>
					</FForm>
					<AUIGrid
						ref="refAddressGrid"
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
import axios from 'axios';

import AUIGrid from '@/components/AUIGrid.vue';

import FInput from '@/components/FInput.vue';
import FButton from '@/components/FButton.vue';
import FLayerPopup from '@/components/FLayerPopup.vue';

import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';
import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';
import FlexBox from '@/components/FlexBox.vue';

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

const refPopup = ref(null);
const gridDataList = ref([]);
const selectedAddress = ref({});

const keyword = ref('');

let checkLabel = null;

const onKeywordChange = () => {
	// 키워드 입력 시 실행되는 로직 (옵셔널)
};

/**
 * Grid
 */
const refAddressGrid = ref(null); // 마스터 그리드 초기화

const columnLayout = [
	{
		dataField: 'roadAddr',
		headerText: '도로명주소',
		width: '60%',
	},
	{
		dataField: 'zipNo',
		headerText: '우편번호',
		width: '40%',
	},
];

columnLayout.some(function (v) {
	checkLabel = v.headerText == props.fixLabel ? v.dataField : false;
	if (checkLabel != false) return true;
	else return false;
});

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

/**
 *
 * @property {string} bdNm 건물명
 * @property {string} jibunAddr 지번주소
 * @property {string} roadAddr 도로명주소
 * @property {string} roadAddrPart1 도로명주소 - 건물번호까지
 * @property {string} roadAddrPart2 도로명주소 - 동
 * @property {string} sggNm 동
 * @property {string} siNm 시
 * @property {string} zipNo 우편번호
 * @property {string} endAddr 영문주소
 */
function onSelectGrid(selectedRows) {
	// 선택한 행 데이터 정보
	selectedAddress.value = selectedRows;
}

function emitAddress() {
	let data = refAddressGrid.value.getSelectedItems()[0].item;
	data.checkLabel = checkLabel;

	emit('receive', selectedAddress.value);
	refPopup.value.close();
}

function setEventBind() {
	refAddressGrid.value.bind('cellDoubleClick', event => {
		console.log('cellDoubleClick Event', event);
		emitAddress();
	});
}

async function onSearchAddress() {
	try {
		// 도로명주소 검색 API 호출
		const response = await axios
			.get('/apitest/addrlink/addrLinkApi.do', {
				baseURL: '',
				params: {
					confmKey: 'devU01TX0FVVEgyMDIzMDkyNjE3MjkxODExNDEzNDE=',
					currentPage: 1,
					countPerPage: '10',
					keyword: keyword.value,
					resultType: 'json',
				},
			})
			.then(res => {
				// 요청이 성공한 경우 : 응답 데이터를 처리
				const data = res.data.results.juso; // ex) [{…}, {…}]
				// 응답 데이터를 컬럼으로 세팅
				//const newCols = datas.map(el => ({
				//headerText: el.cdNm,
				//dataField: el.comCd,
				//width: 200,
				//}));

				gridDataList.value = data;
				setEventBind();
				//refAddressGrid.value.setGridData(popupList.value);
			})
			.catch(err => {
				// 요청이 실패한 경우 이 곳에서 오류를 처리
				console.error(err);
			});

		// API 응답 데이터 처리
		//const { data } = response;
		//if (data.results && data.results.juso) {
		//	addresses.value = data.results.juso;
		//}
	} catch (error) {
		console.error('API 호출 중 오류 발생:', error);
	}
}

async function onClickConfirm() {
	await emitAddress();
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
