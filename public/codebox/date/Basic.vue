<template>
	<div>
		<FDate id="date" v-model="date" label="Basic example" />
		<p>select date is {{ date }}</p>

		<FDate
			id="format"
			v-model="format"
			format="YYYY/MM/DD"
			label="Format example"
		/>
		<p>format date is {{ format }}</p>
	</div>
</template>

<script setup>
import FDate from '@/components/date/FDate.vue';

const date = ref('');
const format = ref('');
</script>
