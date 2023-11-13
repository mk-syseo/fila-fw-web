<template>
	<ThemeProvider :theme="{ primary: 'palevioletred' }">
		<Layout v-if="route.meta.layout" />
		<RouterView v-else />
	</ThemeProvider>
</template>

<script setup>
// import { RouterView, useRoute } from 'vue-router';
import { ThemeProvider } from 'vue3-styled-components';

import Layout from '@/views/Layout.vue';

const route = useRoute();
</script>

<style src="./assets/scss/layout.scss"></style>
<style src="./assets/scss/common.scss"></style>
<style src="./assets/font/pretendard/pretendard.css"></style>
