<!--------------------------------------------------------------------
	파일   : FTab.vue
	작성   : CJ Developer
	설명	 : [공통] 탭 내부 컴포넌트
---------------------------------------------------------------------->
<template>
	<div>
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>
