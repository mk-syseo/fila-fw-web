<!--------------------------------------------------------------------
	파일   : Icons.vue
	작성   : CJ Developer
	설명	 : [공통] 아이콘 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="icon/Basic">
			<template #description>
				<h1>기본</h1>
				아이콘 컴포넌트입니다.
			</template>

			<template #ƒemo>
				<Basic />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/icon/Basic.vue';

const properties = [
	{
		property: 'icon',
		desc: '나타낼 아이콘의 파일명을 입력합니다',
		type: 'String',
		default: '',
		required: '✓',
		option: '',
	},
	{
		property: 'ext',
		desc: '아이콘 파일명의 확장자를 입력합니다',
		type: 'String',
		default: "'svg'",
		required: '',
		option: '',
	},
];
</script>
