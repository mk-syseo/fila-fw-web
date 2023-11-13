<!--------------------------------------------------------------------
	파일   : Times.vue
	작성   : CJ Developer
	설명	 : [공통] 시간 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="time/Basic">
			<template #description>
				<h1>기본</h1>
			</template>

			<template #demo>
				<BasicTime style="display: flex; justify-content: space-around" />
			</template>
		</FCodeBox>

		<!-- Range -->
		<FCodeBox example="time/Range">
			<template #description>
				<h1>시간 범위 선택</h1>
				범위를 가지는 시간을 선택합니다. 종료일자가 시작일자보다 빠르면 경고창이
				발생합니다. 변수는 배열/객체 형식을 지원합니다.
			</template>

			<template #demo>
				<Range style="display: flex; justify-content: space-evenly" />
			</template>
		</FCodeBox>

		<!-- Range Library -->
		<FCodeBox example="time/RangeLibrary">
			<template #description>
				<h1>시간 범위 선택 - 최대범위 지정</h1>
				라이브러리에서 지원하는 Range를 사용하여 범위를 가지는 시간를
				선택합니다. 변수는 배열/객체 형식을 지원합니다.
			</template>

			<template #demo>
				<RangeLibrary style="display: flex; justify-content: space-evenly" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import BasicTime from '~/codebox/time/Basic.vue';
import Range from '~/codebox/time/Range.vue';
import RangeLibrary from '~/codebox/time/RangeLibrary.vue';

const properties = [
	{
		property: 'v-model',
		desc: '선택한 시간의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String | Array | Object',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '시간선택의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '시간선택의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '시간선택의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '시간선택의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '시간선택의 상태를 읽기전용으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'range',
		desc: '단일 시간이 아닌 범위로 선택 시 사용합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'from',
		desc: '시간 범위 사용 시 시작시간으로 지정할 변수명을 입력합니다',
		type: 'Number | String',
		default: "0 | 'from'",
		required: '',
		option: '',
	},
	{
		property: 'to',
		desc: '시간 범위 사용 시 종료시간으로 지정할 변수명을 입력합니다',
		type: 'Number | String',
		default: "1 | 'to'",
		required: '',
		option: '',
	},
	{
		property: 'format',
		desc: '선택한 날짜의 포맷을 지정합니다. 시간은 HH, 분은 mm, 초는 ss이며 dayjs의 형식에 맞게 지정해야합니다',
		type: 'String',
		default: "'HH:mm'",
		required: '',
		option: '',
	},
];
</script>
