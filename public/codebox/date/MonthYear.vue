<template>
	<div>
		<FDate id="year" v-model="year" label="Year Picker example" year />
		<p>year is {{ year }}</p>

		<FDate id="month" v-model="month" label="Month Picker example" month />
		<p>year-month is {{ month }}</p>
	</div>
</template>

<script setup>
import FDate from '@/components/date/FDate.vue';

const year = ref('');
const month = ref('');
</script>
