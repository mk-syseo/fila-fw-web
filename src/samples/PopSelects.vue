<!--------------------------------------------------------------------
	파일   : PopSelects.vue
	작성   : CJ Developer
	설명	 : [공통] 팝업 조회 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<p>selectValue {{ JSON.stringify(selectValue) }}</p>
		<!-- <FPopSelect
			v-model="selectValue"
			label="레이블입력"
			label-field="id"
			value-field="name"
			@confirm="onConfirm"
		>
			<template #popup-body>
				<AUIGrid
					ref="refMasterGrid"
					title="일반그리드(기본)"
					:data="gridDataList"
					:column-layout="columnLayout"
					@select="onSelectGrid"
				/>
			</template>
		</FPopSelect> -->
	</div>
</template>

<script setup>
// import FPopSelect from '@/components/FPopSelect.vue';
// import AUIGrid from '@/components/AUIGrid.vue';

const selectValue = ref({
	name: '라벨벨',
	id: 'value',
});

// const gridDataList = [
// 	{
// 		id: 'gwahn',
// 		name: 'John Doe',
// 		age: 30,
// 		dept: 'SW개발팀',
// 		phone: '010-4444-1122',
// 		email: 'jgwas@example.com',
// 	},
// 	{
// 		id: 'limTa',
// 		name: 'Jane Smith',
// 		age: 25,
// 		dept: '아키텍처팀',
// 		phone: '010-2112-3344',
// 		email: 'jan1234th@example.com',
// 	},
// 	{
// 		id: 'kimJo',
// 		name: 'Jane Smith',
// 		age: 25,
// 		dept: '영업사원1팀',
// 		phone: '010-9001-1234',
// 		email: 'test12@example.com',
// 	},
// 	{
// 		id: 'suk',
// 		name: 'hello world',
// 		age: 10,
// 		dept: '영업사원2팀',
// 		phone: '010-1234-9876',
// 		email: 'suk123@example.com',
// 	},
// ]; // gridDataList 리스트 정보

// const columnLayout = [
// 	{
// 		dataField: 'id',
// 		headerText: 'ID',
// 		width: 100,
// 	},
// 	{
// 		dataField: 'name',
// 		headerText: '이름',
// 		width: 200,
// 	},
// 	{
// 		dataField: 'age',
// 		headerText: '나이',
// 		dataType: 'numeric',
// 		width: 100,
// 	},
// 	{
// 		dataField: 'dept',
// 		headerText: '부서',
// 		width: 200,
// 	},
// 	{
// 		dataField: 'phone',
// 		headerText: '전화번호',
// 		width: 200,
// 		filter: {
// 			showIcon: true, // 기본 필터 메뉴 아이콘 표시
// 			inline: false, // 인라인 필터 input 표시 안함
// 		},
// 	},
// 	{
// 		dataField: 'email',
// 		headerText: '이메일',
// 		width: '300',
// 	},
// ];

// function onSelectGrid(selectedRows) {
// 	// 선택한 행 데이터 정보
// 	if (selectedRows) {
// 		console.log('selected Data: ', selectedRows);

// 		selectValue.value = selectedRows;
// 	}
// }

// function onConfirm() {
// 	console.log('onConfirm !');
// }
</script>

<style lang="scss" scoped></style>
