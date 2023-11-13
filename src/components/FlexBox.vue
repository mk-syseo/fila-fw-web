<template>
	<div class="flex-box">
		<slot></slot>
	</div>
</template>
<script setup>
const props = defineProps({});
</script>
<style lang="scss" scoped>
.flex-box {
	display: flex;
	flex-wrap: nowrap;
}
</style>
