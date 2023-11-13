<template>
	<div>
		<div>
			<FDateRange id="range" v-model="range" label="Two Date-picker(Array)" />
			<p>Range(w/ Array) date is {{ range }}</p>
		</div>

		<div>
			<FDateRange
				id="rangeObject"
				v-model="rangeObject"
				label="Two Date-picker(Object)"
			/>
			<p>Range(w/ Object) date is {{ rangeObject }}</p>
		</div>

		<div>
			<FDateRange
				id="objectLabel"
				v-model="objectLabel"
				label="Two Date-picker(Object)"
				from="fromDt"
				to="toDt"
			/>
			<p>Range(w/ Object) label change is {{ objectLabel }}</p>
		</div>
	</div>
</template>

<script setup>
import FDateRange from '@/components/date/FDateRange.vue';

const range = ref(['', '']);
const rangeObject = ref({ from: '', to: '' });
const objectLabel = ref({ fromDt: '', toDt: '' });
</script>
