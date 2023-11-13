<!--------------------------------------------------------------------
	파일   : Selects.vue
	작성   : CJ Developer
	설명	 : [공통] 셀렉트 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="select/Basic">
			<template #description>
				<h1>기본</h1>
				셀렉트 컴포넌트입니다. 텍스트를 입력하여 검색할 수 있으며, 검색은 라벨명
				내에서만 가능합니다.
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 빈값 적용 -->
		<FCodeBox example="select/Empty">
			<template #description>
				<h1>빈값</h1>
				셀렉트 컴포넌트에 빈값(empty value) 적용 시 예제입니다.
			</template>

			<template #demo>
				<Empty />
			</template>
		</FCodeBox>

		<!-- 라벨명/필드명 변경 -->
		<FCodeBox example="select/LabelField">
			<template #description>
				<h1>라벨명/필드명</h1>
				셀렉트 컴포넌트에 전달하는 옵션의 라벨명/필드명을 변경할 수 있습니다.
			</template>

			<template #demo>
				<LabelField />
			</template>
		</FCodeBox>

		<!-- 선택 -->
		<FCodeBox example="select/ClickOnly">
			<template #description>
				<h1>선택</h1>
				텍스트 입력 없이 선택으로만 셀렉트 컴포넌트를 사용하는 경우의
				예제입니다.
			</template>

			<template #demo>
				<ClickOnly />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/select/Basic.vue';
import Empty from '~/codebox/select/Empty.vue';
import LabelField from '~/codebox/select/LabelField.vue';
import ClickOnly from '~/codebox/select/ClickOnly.vue';

const properties = [
	{
		property: 'v-model',
		desc: '셀렉트의 값을 가져오기 위해 연결할 변수명을 입력합니다',
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
		desc: '셀렉트의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '셀렉트의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '셀렉트의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '셀렉트의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '셀렉트의 상태를 읽기전용으로 변경합니다',
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
		desc: '선택 가능한 빈값을 옵션으로 추가합니다. 객체를 연결하여 별도의 라벨과 값을 지정할 수 있습니다',
		type: 'Boolean | Object',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'label-field',
		desc: '셀렉트의 옵션 중 라벨로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'label'",
		required: '',
		option: '',
	},
	{
		property: 'value-field',
		desc: '셀렉트의 옵션 중 값으로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'value'",
		required: '',
		option: '',
	},
	{
		property: 'click-only',
		desc: '셀렉트의 검색 기능을 제외하고 클릭으로만 동작합니다',
		type: 'Boolean',
		default: 'false',
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
	{
		property: 'masking',
		desc: '입력값에 마스킹을 적용합니다. maska 라이브러리를 사용합니다(https://github.com/beholdr/maska)',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
];
</script>
