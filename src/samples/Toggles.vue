<template>
	<div>
		<!-- 토글 -->
		<FCodeBox example="toggle/Basic">
			<template #description>
				<h1>기본 토글</h1>
			</template>

			<template #demo>
				<BasicToggle style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import BasicToggle from '~/codebox/toggle/Basic.vue';

const properties = [
	{
		property: 'v-model',
		desc: '토글의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'Boolean, String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '토글의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '토글의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '토글의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '토글의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	// {
	// 	property: 'read-only',
	// 	desc: '토글의 상태를 읽기전용으로 변경합니다',
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
		property: 'true-value',
		desc: '토글 선택 시의 값을 지정합니다',
		type: 'Boolean, String',
		default: 'true',
		required: '',
		option: '',
	},
	{
		property: 'false-value',
		desc: '토글 미선택 시의 값을 지정합니다',
		type: 'Boolean, String',
		default: 'false',
		required: '',
		option: '',
	},
];
</script>
