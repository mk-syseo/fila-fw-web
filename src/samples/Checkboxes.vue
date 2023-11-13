<!--------------------------------------------------------------------
	파일   : Checkboxes.vue
	작성   : CJ Developer
	설명	 : [공통] 체크박스 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="check/Basic">
			<template #description>
				<h1>기본</h1>
				체크박스 컴포넌트입니다.
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 참/거짓값 변경 -->
		<FCodeBox example="check/TrueFalse">
			<template #description>
				<h1>참/거짓값 변경</h1>
				체크박스 컴포넌트의 참/거짓값을 변경합니다
			</template>

			<template #demo>
				<TrueFalse />
			</template>
		</FCodeBox>

		<!-- 다건 선택 -->
		<FCodeBox example="check/TrueFalse">
			<template #description>
				<h1>다건 선택</h1>
				여러 개의 체크박스를 선택합니다
			</template>

			<template #demo>
				<Multiple />
			</template>
		</FCodeBox>

		<!-- 다건 선택 + 라벨명/필드명 변경 -->
		<FCodeBox example="check/TrueFalse">
			<template #description>
				<h1>라벨명/필드명 변경</h1>
				여러 개의 체크박스를 선택할 때, 옵션의 라벨명과 필드명을 수정합니다
			</template>

			<template #demo>
				<MultipleTrueFalse />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />

		<!-- 로그인메인 체크박스 : 임시 -->
		<div style="padding: 10px">
			<FCheckbox
				id="multipleValue"
				v-model="multipleValue"
				:options="options"
				class="login-main"
			/>
		</div>
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import FCheckbox from '@/components/FCheckbox.vue';

import Basic from '~/codebox/check/Basic.vue';
import TrueFalse from '~/codebox/check/TrueFalse.vue';

import Multiple from '~/codebox/check/Multiple.vue';
import MultipleTrueFalse from '~/codebox/check/MultipleTrueFalse.vue';

const multipleValue = ref([]);
const options = [
	{
		label: '아이디 저장',
		value: '001',
	},
];
// 로그인메인 체크박스 END

const properties = [
	{
		property: 'v-model',
		desc: '체크박스의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String | Boolean | Number | Array',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'options',
		desc: '선택 가능한 옵션을 지정합니다',
		type: 'Array',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'id',
		desc: '체크박스의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '체크박스의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '체크박스의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '체크박스의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	// {
	// 	property: 'read-only',
	// 	desc: '체크박스의 상태를 읽기전용으로 변경합니다',
	// 	type: 'Boolean',
	// 	default: 'false',
	// 	required: '',
	// 	option: '',
	// },
	{
		property: 'required',
		desc: '필수 입력여부를 나타냅니다',
		type: 'Boolean',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'sub-required',
		desc: '조건에 따른 필수 입력여부를 나타냅니다',
		type: 'Boolean',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label-field',
		desc: '체크박스의 옵션 중 라벨로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'label'",
		required: '',
		option: '',
	},
	{
		property: 'value-field',
		desc: '체크박스의 옵션 중 값으로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'value'",
		required: '',
		option: '',
	},
	{
		property: 'true-value',
		desc: '체크박스 선택 시의 값을 지정합니다',
		type: 'Boolean, String',
		default: 'true',
		required: '',
		option: '',
	},
	{
		property: 'false-value',
		desc: '체크박스 미선택 시의 값을 지정합니다',
		type: 'Boolean, String',
		default: 'false',
		required: '',
		option: '',
	},
];
</script>
