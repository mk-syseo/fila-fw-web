<!--------------------------------------------------------------------
	파일   : FCodeBox.vue
	작성   : CJ Developer
	설명	 : [공통] 컴포넌트 예제를 작성하기 위한 코드박스 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="fcodebox">
		<div class="fcodebox-description">
			<slot name="description" />
		</div>

		<div class="fcodebox-demo">
			<slot name="demo" />
		</div>

		<!-- 예제 코드 -->
		<FButton text icon="ico-24-filter" @click="showCode = !showCode">
			코드 보기
		</FButton>

		<div v-if="showCode" class="fcodebox-source-code">
			<CodeEditor
				v-model="code"
				theme="base16-solar-flare-light"
				width="100%"
				font-size="12px"
				:tab-spaces="1"
				:read-only="true"
				:languages="[['vbscript-html', 'HTML']]"
			/>
		</div>
	</div>
</template>

<script setup>
import CodeEditor from 'simple-code-editor';

import FButton from '@/components/FButton.vue';

const props = defineProps({
	example: {
		type: String,
		required: true,
	},
});

const showCode = ref(false);
const code = ref('');

// 예제와 개발 시의 컴포넌트 import 경로가 다르므로 변경
onMounted(async () => {
	await fetch(`/codebox/${props.example}.vue?raw`)
		.then(response => response.text())
		.then(text => {
			code.value = text;
		});
});
</script>

<style lang="scss" scoped>
.fcodebox {
	border: 1px solid var(--bread-crumb-color);
	border-radius: 10px;

	padding: 20px;
	margin-bottom: 20px;

	&-description {
		font-size: 13px;
		color: var(--basic-text);
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(100, 100, 100, 0.4);
	}

	&-demo {
		padding: 10px;
		margin-bottom: 10px;
		min-height: 50px;

		border-radius: 0 0 5px 5px;
		background-color: var(--fcodebox);
	}
}
</style>
