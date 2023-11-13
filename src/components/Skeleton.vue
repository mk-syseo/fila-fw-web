<template>
	<div>
		<input v-model="value" />
		<span>Skeleton value {{ value }}</span>
		<p>??{{ sampleData }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	// Value Setting
	modelValue: {
		type: String,
	},
	sampleData: {
		type: String,
	},
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});
</script>

<style lang="scss" scoped></style>
