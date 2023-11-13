<template>
	<div>
		<FCheckbox
			id="checkboxValue"
			v-model="checkboxValue"
			label="라벨입니다"
			true-value="Y"
			false-value="N"
		/>
		<p>Checkbox value is {{ checkboxValue }}</p>
	</div>
</template>

<script setup>
import FCheckbox from '@/components/FCheckbox.vue';

const checkboxValue = ref('N');
</script>
