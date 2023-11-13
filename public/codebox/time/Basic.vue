<template>
	<div>
		<div>
			<FTime id="basicHM" v-model="basicHM" label="Time" />
			<p>time value is {{ basicHM }}</p>
		</div>

		<div>
			<FTime id="basicHMS" v-model="basicHMS" format="HH:mm:ss" label="Time" />
			<p>time value is {{ basicHMS }}</p>
		</div>
	</div>
</template>

<script setup>
import FTime from '@/components/date/FTime.vue';

const basicHM = ref('16:00');
const basicHMS = ref('17:18:19');
</script>
