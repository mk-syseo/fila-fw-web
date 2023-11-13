<template>
	<div class="layout-grid-col">
		<slot></slot>
	</div>
</template>
<script setup>
const props = defineProps({});
</script>
<style lang="scss" scoped>
.layout-grid-col {
	&.grid-col-span2 {
		grid-column: auto / span 2;
	}
	&.grid-col-span3 {
		grid-column: auto / span 3;
	}
	display: flex;
	flex-direction: column;
}
.layout-grid-col:has(> .grid-wrapper) {
	flex-grow: 1;
}
</style>
