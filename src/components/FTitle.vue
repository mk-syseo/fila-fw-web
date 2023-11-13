<template>
	<div :class="'h' + level">{{ name }}</div>
</template>

<script setup>
const props = defineProps({
	name: {
		type: String,
		default: null,
	},
	level: {
		type: Number,
		default: null,
	},
});
</script>

<style lang="scss" scoped>
.h1 {
	font-size: 18px;
	font-weight: bold;
	color: var(--heading-text);
}
.h4 {
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 8px;
	height: 28px;
	color: var(--heading-text);
}
</style>
