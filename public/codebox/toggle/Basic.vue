<template>
	<div>
		<FToggle id="toggleValue" v-model="toggleValue" label="Toggle Example" />
		<p>Toggle Value is {{ toggleValue }}</p>

		<FToggle id="disabledValue" v-model="disabledValue" disabled label="Toggle Example" />
		<p>Disabled Value is {{ disabledValue }}</p>
	</div>
</template>

<script setup>
import FToggle from '@/components/FToggle.vue';

const toggleValue = ref(false);
const disabledValue = ref(true);
</script>
