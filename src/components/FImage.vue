<!--------------------------------------------------------------------
	파일   : FImage.vue
	작성   : CJ Developer
	설명	 : [공통] 이미지 컴포넌트
---------------------------------------------------------------------->
<template>
	<img :src="url" />
</template>

<script setup>
const props = defineProps({
	url: {
		type: String,
		required: true,
	},
});
</script>

<style lang="scss" scoped></style>
