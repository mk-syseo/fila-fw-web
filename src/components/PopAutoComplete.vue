<!--------------------------------------------------------------------
	파일   : PopAutoComplete.vue
	작성   : CJ Developer
	설명	 : [공통] PopAutoComplete 컴포넌트 예제
---------------------------------------------------------------------->
<template>
	<FLayerPopup
		ref="refPopup"
		width="700"
		height="500"
		@confirm="onClickConfirm"
	>
		<FButton text icon="ico-16-black-search" class="size28" />

		<template #header>
			<h2>Pop Select 예시</h2>
		</template>

		<template #body>
			<FInput
				v-model="keyword"
				placeholder=""
				@input="onKeywordChange"
				@keyup.enter="onSearchAddress"
			>
				<FButton
					text
					icon="ico-16-black-search"
					class="size28"
					@click="onSearchAddress"
				/>
			</FInput>
			<AUIGrid
				ref="refAddressGrid"
				title="일반그리드(기본)"
				:data="gridExData"
				:column-layout="columnLayout"
				:grid-props="gridProps"
				@select="onSelectGrid"
			/>
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

const onKeywordChange = () => {
	// 키워드 입력 시 실행되는 로직 (옵셔널)
};

/**
 * Grid
 */
const refAddressGrid = ref(null); // 마스터 그리드 초기화

const columnLayout = [
	{
		dataField: 'comCd',
		headerText: '코드',
		width: 250,
	},
	{
		dataField: 'comNm',
		headerText: '이름',
		width: 80,
	},
	// {
	// 	dataField: 'test1',
	// 	headerText: '테스트1',
	// 	width: 80,
	// },
	// {
	// 	dataField: 'test2',
	// 	headerText: '테스트2',
	// 	width: 80,
	// },
];

// 예시 데이터
const gridExData = ref([
	{ comCd: 1, comNm: 'Apple' },
	{ comCd: 2, comNm: 'Banana' },
	{ comCd: 3, comNm: 'Cherry' },
	{ comCd: 4, comNm: 'Date' },
	{ comCd: 5, comNm: 'Elderberry' },
]);

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

function setEventBind() {
	refAddressGrid.value.bind('cellDoubleClick', event => {
		debugger;
		console.log('cellDoubleClick Event', event);
		emitAddress();
	});
}

function onSelectGrid(selectedRows) {
	// 선택한 행 데이터 정보
	selectedAddress.value = selectedRows;
	console.log(selectedRows);
}

function emitAddress() {
	emit('receive', selectedAddress.value);
	refPopup.value.close();
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

				gridDataList.value = data;
				//refAddressGrid.value.setGridData(popupList.value);
			})
			.catch(err => {
				// 요청이 실패한 경우 이 곳에서 오류를 처리
				console.error(err);
			});
		setEventBind();
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
