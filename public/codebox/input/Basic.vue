<template>
	<div>
		<FInput
			id="inputValue"
			v-model="inputValue"
			label="Input Label"
			name="inputValue"
			placeholder="placeholder 입니다"
		/>
		<p>input value is {{ inputValue }}</p>

		<FInput
			id="disableValue"
			v-model="disableValue"
			label="Disabled Label"
			name="disableValue"
			disabled
		/>
		<p>disable value is {{ disableValue }}</p>

		<FInput
			id="inputValue"
			v-model="inputValue"
			label="라벨입니다"
			name="Required Label"
			placeholder="placeholder 입니다"
			required
		/>
		<p>input value is {{ inputValue }}</p>

		<FInput
			id="inputValue"
			v-model="inputValue"
			label="Sub-Required Label"
			name="inputValue"
			placeholder="placeholder 입니다"
			sub-required
		/>
		<p>input value is {{ inputValue }}</p>
	</div>
</template>

<script setup>
import FInput from '@/components/FInput.vue';

const inputValue = ref('');
const disableValue = ref('disabled value');
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 25px;
}
</style>