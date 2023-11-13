<template>
	<div>
		<FInput
			id="phoneNumber"
			v-model="phoneNumber"
			label="핸드폰 번호"
			name="phoneNumber"
			placeholder="핸드폰 번호를 입력하세요"
			masking="(###) ####-####"
		/>
		<p>input value is {{ phoneNumber }}</p>
	</div>
</template>

<script setup>
import FInput from '@/components/FInput.vue';

const phoneNumber = ref('');
</script>
