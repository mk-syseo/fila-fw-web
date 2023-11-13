<template>
	<div>
		<FRadio
			id="selectRadio"
			v-model="selectRadio"
			:options="options"
			label="라벨입니다"
		/>
		<p>Selected Option is {{ selectRadio }}</p>

		<FRadio
			id="disabeldRadio"
			v-model="disabeldRadio"
			:options="options"
			label="라벨입니다"
			disabled
		/>
		<p>Selected Option is {{ disabeldRadio }}</p>

		<FRadio
			id="selectRadio"
			v-model="selectRadio"
			:options="options"
			label="필수요소"
			required
		/>
		<p>Selected Option is {{ selectRadio }}</p>

		<FRadio
			id="selectRadio"
			v-model="selectRadio"
			:options="options"
			label="서브필수요소"
			sub-required
		/>
		<p>Selected Option is {{ selectRadio }}</p>
	</div>
</template>

<script setup>
import FRadio from '@/components/FRadio.vue';

const selectRadio = ref('');
const disabeldRadio = ref('1');

const options = [
	{
		label: '첫번째',
		value: '1',
	},
	{
		label: '두번째',
		value: '2',
	},
	{
		label: '세번째',
		value: '3',
	},
];
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 25px;
}
</style>
