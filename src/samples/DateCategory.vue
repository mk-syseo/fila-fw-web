<!--------------------------------------------------------------------
	파일   : DateCategory.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜범위구분 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- Range Category -->
		<FCodeBox example="date/RangeCategory">
			<template #description>
				<h1>날짜범위 구분</h1>
				라이브러리에서 지원하는 Range를 사용하여 범위를 가지는 날짜를
				선택합니다. 종료일자가 시작일자보다 빠르면 시작일자와 종료일자가
				바뀝니다. 변수는 배열/객체 형식을 지원합니다. 제시된 요소 외에
				FDateRange에서 사용하는 모든 요소를 사용할 수 있습니다.
			</template>

			<template #demo>
				<RangeCategory />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import RangeCategory from '~/codebox/date/RangeCategory.vue';

const properties = [
	{
		property: 'v-model',
		desc: '선택한 날짜와 구분값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'Object',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '날짜범위 구분의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '날짜범위구분의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '날짜범위구분의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '날짜범위구분의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '날짜범위구분의 상태를 읽기전용으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'type',
		desc: '구분의 컴포넌트 타입을 선택합니다',
		type: 'String',
		default: "'radio'",
		required: '',
		option: "'radio' | 'select'",
	},
	{
		property: 'options',
		desc: '구분에서 선택 가능한 옵션을 지정합니다',
		type: 'Array',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'category-field',
		desc: '날짜범위의 값 중 시작날짜로 지정할 변수명을 입력합니다',
		type: 'Number | String',
		default: "1 | 'to'",
		required: '',
		option: '',
	},
	{
		property: 'range-field',
		desc: '선택한 날짜의 포맷을 지정합니다. 연도는 YYYY, 월은 MM, 일은 DD이며 dayjs의 형식에 맞게 지정해야합니다',
		type: 'String',
		default: "'YYYY-MM-DD'",
		required: '',
		option: '',
	},
];
</script>
