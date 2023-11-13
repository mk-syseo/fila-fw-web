<template>
	<div>
		<FEmail id="email" v-model="email" />
		<p>이메일 주소는 {{ email }}</p>
	</div>
</template>

<script setup>
import FEmail from '@/components/FEmail.vue';

const email = ref('');
</script>
