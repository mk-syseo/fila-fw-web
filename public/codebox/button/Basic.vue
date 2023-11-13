<template>
	<div>
		<FButton>기본 버튼</FButton>
		<FButton primary>Primary 버튼</FButton>
		<FButton disabled>Primary 버튼</FButton>
		<FButton text>보더없는 버튼</FButton>

		<FButton size="large">라지 버튼</FButton>
		<FButton primary size="large">Primary 라지 버튼</FButton>
	</div>
</template>

<script setup>
import FButton from '@/components/FButton.vue';
</script>
