<template>
	<div>
		<FAutoComplete
			id="userInput"
			v-model="userInput"
			:suggestions="suggestions"
			label="AutoComplete"
			label-field="comNm"
			value-field="comCd"
			is-hidden
		/>
		<p>선택된 데이터는 {{ userInput }}</p>

		<FAutoComplete
			id="userInput"
			v-model="userInput"
			:suggestions="suggestions"
			label="AutoComplete"
			label-field="comNm"
			value-field="comCd"
			is-hidden
			required
		/>
		<p>선택된 데이터는 {{ userInput }}</p>

		<FAutoComplete
			id="userInput"
			v-model="userInput"
			:suggestions="suggestions"
			label="AutoComplete 오른쪽"
			label-field="comNm"
			value-field="comCd"
			is-hidden
			sub-required
			right-layer
		/>
		<p>선택된 데이터는 {{ userInput }}</p>
	</div>
</template>

<script setup>
import FAutoComplete from '@/components/FAutoComplete.vue';

const userInput = ref({
	comCd: '',
	comNm: '',
});

const suggestions = ref([
	{ comCd: 1, comNm: 'Apple' },
	{ comCd: 2, comNm: 'Banana'},
	{ comCd: 3, comNm: 'Cherry'},
	{ comCd: 4, comNm: 'Date'},
	{ comCd: 5, comNm: 'Elderberry'},
]);
</script>

<style lang="scss" scoped>
p {
	margin-bottom: 20px;
}
</style>
