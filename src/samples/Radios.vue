<!--------------------------------------------------------------------
	파일   : Radios.vue
	작성   : CJ Developer
	설명	 : [공통] 라디오 버튼 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="radio/Basic">
			<template #description>
				<h1>기본</h1>
				라디오 버튼 컴포넌트입니다.
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 라벨명/필드명 변경 -->
		<FCodeBox example="radio/LabelField">
			<template #description>
				<h1>라벨명/필드명 변경 예제</h1>
				라벨명과 필드명 변경 예제입니다.
			</template>

			<template #demo>
				<LabelField />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/radio/Basic.vue';
import LabelField from '~/codebox/radio/LabelField.vue';

const properties = [
	{
		property: 'v-model',
		desc: '라디오의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String',
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
		desc: '라디오의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '라디오의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '라디오의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '라디오의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	// {
	// 	property: 'read-only',
	// 	desc: '라디오의 상태를 읽기전용으로 변경합니다',
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
		property: 'empty',
		desc: '선택 가능한 빈값을 옵션으로 추가합니다. 객체를 연결하여 별도의 라벨과 값을 지정할 수 있습니다',
		type: 'Boolean | Object',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'label-field',
		desc: '라디오의 옵션 중 라벨로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'label'",
		required: '',
		option: '',
	},
	{
		property: 'value-field',
		desc: '라디오의 옵션 중 값으로 지정할 변수명을 입력합니다',
		type: 'String',
		default: "'value'",
		required: '',
		option: '',
	},
];
</script>
