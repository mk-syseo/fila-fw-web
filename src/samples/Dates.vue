<!--------------------------------------------------------------------
	파일   : Dates.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="date/Basic">
			<template #description>
				<h1>기본</h1>
			</template>

			<template #demo>
				<BasicDate style="display: flex; justify-content: space-around" />
			</template>
		</FCodeBox>

		<!-- Month/Year -->
		<FCodeBox example="date/MonthYear">
			<template #description>
				<h1>연월 선택</h1>
			</template>

			<template #demo>
				<MonthYear style="display: flex; justify-content: space-evenly" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import BasicDate from '~/codebox/date/Basic.vue';
import MonthYear from '~/codebox/date/MonthYear.vue';

const properties = [
	{
		property: 'v-model',
		desc: '선택한 날짜의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String | Number',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '날짜선택의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '날짜선택의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '날짜선택의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '날짜선택의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '날짜선택의 상태를 읽기전용으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'format',
		desc: '선택한 날짜의 포맷을 지정합니다. 연도는 YYYY, 월은 MM, 일은 DD이며 dayjs의 형식에 맞게 지정해야합니다',
		type: 'String',
		default: "'YYYY-MM-DD'",
		required: '',
		option: '',
	},
	{
		property: 'year',
		desc: '연도 선택 시 사용합니다. 별도의 포맷지정없이 이 옵션만 사용합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'month',
		desc: '연월 선택 시 사용합니다. 별도의 포맷지정없이 이 옵션만 사용합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'week',
		desc: '오픈 예정',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'weekStart',
		desc: '캘린더의 주 시작일을 지정합니다. 일요일(0) ~ 토요일(6)의 값으로 지정합니다',
		type: 'Number | String',
		default: '0',
		required: '',
		option: '',
	},
	{
		property: 'timepicker',
		desc: '오픈 예정 - 날짜선택 시 시간 선택여부를 지정합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'inlineTime',
		desc: '오픈 예정 - 날짜선택 시 시간 선택을 인라인으로 표시합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
];
</script>
