<!--------------------------------------------------------------------
	파일   : Forms.vue
	작성   : CJ Developer
	설명	 : [공통] 폼 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="form/Basic">
			<template #description>
				<h1>기본 폼</h1>
				폼 컴포넌트입니다. FFormRow의 is-grid-cols을 통해 한 행에 나타낼 요소의
				개수를 지정할 수 있으며, 최대 가능한 개수는 12개입니다.
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 검색 조건 폼 -->
		<FCodeBox example="form/Search">
			<template #description>
				<h1>검색 조건 폼</h1>
			</template>

			<template #demo>
				<Search />
			</template>
		</FCodeBox>

		<!-- 탭 내부 폼 -->
		<FCodeBox example="form/InTab">
			<template #description>
				<h1>탭 내부 폼</h1>
			</template>

			<template #demo>
				<InTab />
			</template>
		</FCodeBox>

		<!-- 세로형 제외 -->
		<FCodeBox example="form/Vertical">
			<template #description>
				<h1>폼 세로형</h1>
			</template>

			<template #demo>
				<Vertical />
			</template>
		</FCodeBox>

		<!-- 토글 제외 -->
		<FCodeBox example="form/FormOnly">
			<template #description>
				<h1>폼 토글 제외</h1>
			</template>

			<template #demo>
				<FormOnly />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/form/Basic.vue';
import Search from '~/codebox/form/Search.vue';
import InTab from '~/codebox/form/InTab.vue';
import Vertical from '~/codebox/form/Vertical.vue';
import FormOnly from '~/codebox/form/FormOnly.vue';

const properties = [
	{
		property: 'v-model',
		desc: '폼의 값을 가져오기 위해 연결할 변수명을 입력합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'id',
		desc: '폼의 id 속성을 지정합니다. v-model에 입력하는 변수명과 동일하게 작성합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'name',
		desc: '폼의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'search',
		desc: "폼의 스타일을 변경합니다. search만 추가하거나 search='type명'을 통해 지정할 수도 있습니다",
		type: 'Boolean | String',
		default: 'false',
		required: '',
		option: "'in-tab'",
	},
	{
		property: 'vertical',
		desc: '폼의 스타일을 변경합니다. 가로가 아닌 세로로 요소를 나열합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'form-only',
		desc: '폼의 하단 토글을 제거합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'submit',
		desc: '폼에서 submit 발생 시 실행할 이벤트 함수를 지정합니다',
		type: 'Function',
		default: '',
		required: '',
		option: '',
	},
];
</script>
