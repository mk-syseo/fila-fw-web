<!--------------------------------------------------------------------
	파일   : MultiSelects.vue
	작성   : CJ Developer
	설명	 : [공통] 다건 셀렉트 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 다중 선택 -->
		<FCodeBox example="select/Multiple">
			<template #description>
				<h1>다중 선택</h1>
				셀렉트 컴포넌트에서 여러 개의 옵션을 선택하는 경우의 예제입니다
			</template>

			<template #demo>
				<Multiple />
			</template>
		</FCodeBox>

		<!-- 다중 선택 -->
		<FCodeBox example="select/MultipleEmpty">
			<template #description>
				<h1>다중 선택 시 빈값 적용</h1>
				셀렉트 컴포넌트에서 여러 개의 옵션을 선택할 시, 전체 값을 변경하는
				예제입니다.
			</template>

			<template #demo>
				<MultipleEmpty />
			</template>
		</FCodeBox>

		<!-- 다중 선택 시 라벨명/필드명 변경 -->
		<FCodeBox example="select/MultipleLabelField">
			<template #description>
				<h1>다중 선택 시 라벨명/필드명 변경</h1>
				셀렉트 컴포넌트에서 여러 개의 옵션을 선택할 시, 라벨명/필드명 변경
				예제입니다.
			</template>

			<template #demo>
				<MultipleLabelField />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Multiple from '~/codebox/select/Multiple.vue';
import MultipleEmpty from '~/codebox/select/MultipleEmpty.vue';
import MultipleLabelField from '~/codebox/select/MultipleLabelField.vue';

const properties = [
	{
		property: 'v-model',
		desc: '멀티셀렉트의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String | Object',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'options',
		desc: '선택 가능한 옵션을 지정합니다',
		type: 'Array',
		default: '[]',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '멀티셀렉트의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '멀티셀렉트의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '멀티셀렉트의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '멀티셀렉트의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '멀티셀렉트의 상태를 읽기전용으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'required',
		desc: '필수 입력여부를 나타냅니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'sub-required',
		desc: '조건에 따른 필수 입력여부를 나타냅니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'empty',
		desc: '선택 가능한 빈값을 옵션으로 추가합니다. label-별도의 라벨과 값을 지정할 수 있습니다',
		type: 'Object',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'label-field',
		desc: '멀티셀렉트의 옵션 중 라벨로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'label'",
		required: '',
		option: '',
	},
	{
		property: 'value-field',
		desc: '멀티셀렉트의 옵션 중 값으로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'value'",
		required: '',
		option: '',
	},
	{
		property: 'placeholder',
		desc: '선택값이 없을 시 나타낼 문장을 입력합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
];
</script>
