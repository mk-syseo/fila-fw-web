<!--------------------------------------------------------------------
	파일   : DateRanges.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜범위 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- Range -->
		<FCodeBox example="date/Range">
			<template #description>
				<h1>날짜 범위 선택</h1>
				범위를 가지는 날짜를 선택합니다. 종료일자가 시작일자보다 빠르면 경고창이
				발생합니다. 변수는 배열/객체 형식을 지원합니다.
			</template>

			<template #demo>
				<Range style="display: flex; justify-content: space-evenly" />
			</template>
		</FCodeBox>

		<!-- Range Limit -->
		<FCodeBox example="date/RangeLimit">
			<template #description>
				<h1>날짜 범위 선택 - 최대범위 지정</h1>
				라이브러리에서 지원하는 Range를 사용하여 범위를 가지는 날짜를
				선택합니다. 종료일자가 시작일자보다 빠르면 시작일자와 종료일자가
				바뀝니다. 변수는 배열/객체 형식을 지원합니다.
			</template>

			<template #demo>
				<RangeLimit style="display: flex; justify-content: space-evenly" />
			</template>
		</FCodeBox>

		<!-- Range Library -->
		<FCodeBox example="date/RangeLibrary">
			<template #description>
				<h1>날짜 범위 선택(라이브러리)</h1>
				라이브러리에서 지원하는 Range를 사용하여 범위를 가지는 날짜를
				선택합니다. 종료일자가 시작일자보다 빠르면 시작일자와 종료일자가
				바뀝니다. 변수는 배열/객체 형식을 지원합니다.
			</template>

			<template #demo>
				<RangeLibrary style="display: flex; justify-content: space-evenly" />
			</template>
		</FCodeBox>

		<!-- Range Category -->
		<FCodeBox example="date/RangeCategory">
			<template #description>
				<h1>타 컴포넌트와 결합</h1>
				라이브러리에서 지원하는 Range를 사용하여 범위를 가지는 날짜를
				선택합니다. 종료일자가 시작일자보다 빠르면 시작일자와 종료일자가
				바뀝니다. 변수는 배열/객체 형식을 지원합니다.
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

import Range from '~/codebox/date/Range.vue';
import RangeLimit from '~/codebox/date/RangeLimit.vue';
import RangeLibrary from '~/codebox/date/RangeLibrary.vue';

import RangeCategory from '~/codebox/date/RangeCategory.vue';

const properties = [
	{
		property: 'v-model',
		desc: '날짜범위의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'Array | Object',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '날짜범위의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '날짜범위의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '날짜범위의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '날짜범위의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '날짜범위의 상태를 읽기전용으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'from',
		desc: '날짜범위의 값 중 시작날짜로 지정할 변수명을 입력합니다',
		type: 'Number | String',
		default: "0 | 'from'",
		required: '',
		option: '',
	},
	{
		property: 'to',
		desc: '날짜범위의 값 중 종료날짜 지정할 변수명을 입력합니다',
		type: 'Number | String',
		default: "1 | 'to'",
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
		desc: '오픈 예정 - 날짜범위 시 시간 선택여부를 지정합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'inlineTime',
		desc: '오픈 예정 - 날짜범위 시 시간 선택을 인라인으로 표시합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'maxRange',
		desc: '선택 가능한 최대 기간을 지정합니다',
		type: 'Number | String',
		default: '100',
		required: '',
		option: '',
	},
];
</script>
