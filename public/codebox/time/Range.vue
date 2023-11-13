<template>
	<div>
		<div>
			<FTime
				id="timeRange"
				v-model="timeRange"
				label="Time Range(Array)"
				range
			/>
			<p>time value is {{ timeRange }}</p>
		</div>

		<div>
			<FTime
				id="timeRangeObject"
				v-model="timeRangeObject"
				label="Time Range(Object)"
				range
			/>
			<p>time value is {{ timeRangeObject }}</p>
		</div>

		<div>
			<FTime
				id="timeRangeObjectLabel"
				v-model="timeRangeObjectLabel"
				range
				label="Time Range(Label)"
				from="fromTime"
				to="toTime"
			/>
			<p>time value is {{ timeRangeObjectLabel }}</p>
		</div>
	</div>
</template>

<script setup>
import FTime from '@/components/date/FTime.vue';

const timeRange = ref(['16:00', '16:30']);
const timeRangeObject = ref({
	from: '16:00',
	to: '17:00',
});
const timeRangeObjectLabel = ref({
	fromTime: '18:00',
	toTime: '19:00',
});
</script>
