<template>
	<div>
		<div>
			<FDateRangePicker
				id="range"
				v-model="range"
				label="Range Library(Array)"
			/>
			<p>Range(w/ Array) date is {{ range }}</p>
		</div>

		<div>
			<FDateRangePicker
				id="rangeObject"
				v-model="rangeObject"
				label="Range Library(Object)"
			/>
			<p>Range(w/ Object) date is {{ rangeObject }}</p>
		</div>

		<div>
			<FDateRangePicker
				id="objectLabel"
				v-model="objectLabel"
				label="Range Library(Object)"
				from="fromDt"
				to="toDt"
			/>
			<p>Range(w/ Object) label change is {{ objectLabel }}</p>
		</div>
	</div>
</template>

<script setup>
import FDateRangePicker from '@/components/date/FDateRangePicker.vue';

const range = ref(['', '']);
const rangeObject = ref({ from: '', to: '' });
const objectLabel = ref({ fromDt: '', toDt: '' });
</script>
