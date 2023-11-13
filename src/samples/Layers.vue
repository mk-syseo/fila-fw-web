<!--------------------------------------------------------------------
	파일   : Layers.vue
	작성   : CJ Developer
	설명	 : [공통] 레이어팝업 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="layer/Basic">
			<template #description>
				<h1>기본</h1>
				레이어팝업 컴포넌트입니다
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 기본 + 취소 버튼 -->
		<FCodeBox example="layer/BasicWithCancel">
			<template #description>
				<h1>취소 버튼</h1>
				취소 버튼이 있는 레이어팝업 컴포넌트입니다
			</template>

			<template #demo>
				<BasicWithCancel />
			</template>
		</FCodeBox>

		<!-- 사이즈 변경 -->
		<FCodeBox example="layer/Size">
			<template #description>
				<h1>크기 변경</h1>
				레이어팝업 크기 변경 예제입니다. size 옵션은 small과 large가 있으며,
				임의의 크기를 지정할 수도 있습니다.
			</template>

			<template #demo>
				<Size style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<!-- 텍스트 변경 -->
		<FCodeBox example="layer/ButtonText">
			<template #description>
				<h1>버튼 텍스트 변경</h1>
				버튼 텍스트 변경 예제입니다
			</template>

			<template #demo>
				<ButtonText style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import Basic from '~/codebox/layer/Basic.vue';
import BasicWithCancel from '~/codebox/layer/BasicWithCancel.vue';

import Size from '~/codebox/layer/Size.vue';
import ButtonText from '~/codebox/layer/ButtonText.vue';

const properties = [
	{
		property: 'width',
		desc: '레이어팝업의 가로 크기를 지정합니다',
		type: 'String',
		default: "'480'",
		required: '',
		option: '',
	},
	{
		property: 'height',
		desc: '레이어팝업의 세로 크기를 지정합니다',
		type: 'String',
		default: "'320'",
		required: '',
		option: '',
	},
	{
		property: 'size',
		desc: '레이어팝업의 지정된 크기를 사용합니다. 스몰사이즈의 크기는 480 * 480, 라지사이즈의 크기는 1024 * 1024입니다',
		type: 'String',
		default: "'small'",
		required: '',
		option: "'small' | 'large'",
	},
	{
		property: 'cancel',
		desc: '레이어팝업 내 취소버튼 사용여부를 지정합니다. 문자열 입력 시 취소버튼의 텍스트가 변경됩니다',
		type: 'Boolean | String',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'confirm',
		desc: '레이어팝업 내 확인버튼 사용여부를 지정합니다. 문자열 입력 시 확인버튼의 텍스트가 변경됩니다',
		type: 'Boolean | String',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'onCancel',
		desc: '레이어팝업 내 취소버튼 클릭 시 발생할 이벤트 함수를 지정합니다',
		type: 'Function',
		default: '() => {}',
		required: '',
		option: '',
	},
	{
		property: 'onConfirm',
		desc: '레이어팝업 내 확인버튼 클릭 시 발생할 이벤트 함수를 지정합니다',
		type: 'Function',
		default: '() => {}',
		required: '',
		option: '',
	},
];
</script>
