<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="etc/Address">
			<template #description>
				<h1>주소</h1>
				주소 컴포넌트입니다.
			</template>

			<template #demo>
				<Address />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Address from '~/codebox/etc/Address.vue';

const properties = [
	{
		property: 'v-model',
		desc: '주소를 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '주소의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '주소의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '주소의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '주소의 상태를 읽기전용으로 변경합니다',
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
		property: 'postcode',
		desc: '주소 정보 중 우편번호로 지정할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'address',
		desc: '주소 정보 중 도로명주소로 지정할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'detail',
		desc: '주소 정보 중 상세주소로 지정할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
];
</script>
