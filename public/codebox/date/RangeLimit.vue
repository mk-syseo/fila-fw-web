<template>
	<div>
		<div>
			<FDateRange
				id="range"
				v-model="range"
				label="Array Range Limit(10 days)"
				max-range="10"
			/>
			<p>Range(w/ Array) date is {{ range }}</p>
		</div>

		<div>
			<FDateRange
				id="rangeObject"
				v-model="rangeObject"
				label="Object Range Limit(20 days)"
				max-range="20"
			/>
			<p>Range(w/ Object) date is {{ rangeObject }}</p>
		</div>
	</div>
</template>

<script setup>
import FDateRange from '@/components/date/FDateRange.vue';

const range = ref(['', '']);
const rangeObject = ref({ from: '', to: '' });
</script>
