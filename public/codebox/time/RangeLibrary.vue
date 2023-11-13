<template>
	<div>
		<div>
			<FTimeRange
				id="rangeComponent"
				v-model="rangeComponent"
				label="Range Library(Array)"
			/>
			<p>Time value is {{ timeRangeObjectLabel }}</p>
		</div>

		<div>
			<FTimeRange
				id="rangeComponentObject"
				v-model="rangeComponentObject"
				label="Range Library(Object)"
			/>
			<p>Time value is {{ rangeComponentObject }}</p>
		</div>

		<div>
			<FTimeRange
				id="rangeComponentObjectLabel"
				v-model="rangeComponentObjectLabel"
				label="Range Library(Label)"
				from="fromTime"
				to="toTime"
			/>
			<p>Time value is {{ rangeComponentObject }}</p>
		</div>
	</div>
</template>

<script setup>
import FTimeRange from '@/components/date/FTimeRange.vue';

const rangeComponent = ref(['16:00', '16:30']);
const rangeComponentObject = ref({
	from: '16:00',
	to: '17:00',
});
const rangeComponentObjectLabel = ref({
	fromTime: '18:00',
	toTime: '19:00',
});
</script>
