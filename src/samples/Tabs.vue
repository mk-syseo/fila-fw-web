<!--------------------------------------------------------------------
	파일   : Tabs.vue
	작성   : CJ Developer
	설명	 : [공통] 탭 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="tab/Basic">
			<template #description>
				<h1>기본</h1>
				탭 컴포넌트입니다. 탭 내용은 Tab 안에 기술하며 내용이 길어질 시 별도
				컴포넌트로 분리하여 포함해주세요.
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 기본 -->
		<FCodeBox example="tab/Basic">
			<template #description>
				<h1>내부 탭</h1>
				3Depth에 사용하는 탭 컴포넌트입니다.
			</template>

			<template #demo>
				<Depth />
			</template>
		</FCodeBox>

		<FProperty :data="tabsProperties" category="(FTabs)" />
		<FProperty :data="tabProperties" category="(FTab)" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/tab/Basic.vue';
import Depth from '~/codebox/tab/Depth.vue';

const tabsProperties = [
	{
		property: 'inner',
		desc: '전체 탭의 스타일을 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
];

const tabProperties = [
	{
		property: 'title',
		desc: '탭의 이름을 지정합니다',
		type: 'String',
		default: 'false',
		required: '✓',
		option: '',
	},
];
</script>
