<!--------------------------------------------------------------------
	파일   : Inputs.vue
	작성   : CJ Developer
	설명	 : [공통] 입력 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="input/Basic">
			<template #description>
				<h1>기본 입력</h1>
				입력 컴포넌트 예제입니다. 컴포넌트 사용 시 연결하는 변수명과 id, name을
				모두 일치시켜주세요.
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 마스킹 -->
		<FCodeBox example="input/Masking">
			<template #description>
				<h1>입력 마스킹</h1>
				입력 컴포넌트의 마스킹 예제입니다. 컴포넌트 사용 시 연결하는 변수명과
				id, name을 모두 일치시켜주세요.
			</template>

			<template #demo>
				<Masking />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/input/Basic.vue';
import Masking from '~/codebox/input/Masking.vue';

const properties = [
	{
		property: 'v-model',
		desc: '입력값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '입력의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '입력의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '입력의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '입력의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '입력의 상태를 읽기전용으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
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
		property: 'placeholder',
		desc: '입력값이 없을 시 나타낼 문장을 입력합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'type',
		desc: '입력값의 타입을 지정합니다',
		type: 'String',
		default: 'text',
		required: '',
		option: "'text' | 'number(예정)' | 'password'",
	},
	{
		property: 'prefix',
		desc: '입력값의 앞에 텍스트를 고정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'postfix',
		desc: '입력값의 뒤에 텍스트를 고정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'masking',
		desc: '입력값에 마스킹을 적용합니다. maska 라이브러리를 사용합니다(https://github.com/beholdr/maska)',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'inputWidth',
		desc: '입력 요소의 크기를 명시적으로 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
];
</script>
