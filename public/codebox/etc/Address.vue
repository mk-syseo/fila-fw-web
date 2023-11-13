<template>
	<div>
		<FAddress id="address" v-model="address" />
		<p>주소는 {{ address }}</p>

		<FAddress id="address" v-model="address" required />
		<p>주소는 {{ address }}</p>

		<FAddress id="address" v-model="address" sub-required />
		<p>주소는 {{ address }}</p>
	</div>
</template>

<script setup>
import FAddress from '@/components/address/FAddress.vue';

const address = ref({
	postcode: '',
	address: '',
	detail: '',
});
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 25px;
}
</style>
