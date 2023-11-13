<!--------------------------------------------------------------------
	파일   : FFlag.vue
	작성   : CJ Developer
	설명	 : [공통] 플래그 컴포넌트
---------------------------------------------------------------------->
<template>
	<span class="flag">
		<slot />
	</span>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

/* Flag */
.flag {
	color: $red-1;
	border: 1px solid $red-1;
	height: 16px;
	line-height: 16px;
	width: 39px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	border-radius: 2px;
	font-weight: 500;
}
</style>
