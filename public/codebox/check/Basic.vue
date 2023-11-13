<template>
	<div>
		<FCheckbox id="checkboxValue" v-model="checkboxValue" label="라벨입니다" />
		<p>Checkbox value is {{ checkboxValue }}</p>

		<FCheckbox
			id="disabledValue"
			v-model="disabledValue"
			label="라벨입니다"
			disabled
		/>
		<p></p>

		<FCheckbox id="checkboxValue" v-model="checkboxValue" label="라벨입니다" required />
		<p>Checkbox value is {{ checkboxValue }}</p>

		<FCheckbox id="checkboxValue" v-model="checkboxValue" label="라벨입니다" sub-required />
		<p>Checkbox value is {{ checkboxValue }}</p>
	</div>
</template>

<script setup>
import FCheckbox from '@/components/FCheckbox.vue';

const checkboxValue = ref(false);
const disabledValue = ref(true);
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 25px;
}
</style>