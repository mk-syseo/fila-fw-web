<!--------------------------------------------------------------------
	파일   : Emails.vue
	작성   : CJ Developer
	설명	 : [공통] 이메일 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="etc/Emails">
			<template #description>
				<h1>이메일</h1>
				이메일 컴포넌트입니다.
			</template>

			<template #demo>
				<Emails />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Emails from '~/codebox/etc/Emails.vue';

const properties = [
	{
		property: 'v-model',
		desc: '이메일을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '이메일의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '이메일의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'label',
		desc: '이메일의 라벨을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '이메일의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'read-only',
		desc: '이메일의 상태를 읽기전용으로 변경합니다',
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
];
</script>
