<!--------------------------------------------------------------------
	파일   : FDateCategory.vue
	작성   : CJ Developer
	설명	 : [공통] 카테고리와 날짜 선택 컴포넌트
---------------------------------------------------------------------->
<template>
	<div>
		<label v-if="label" :for="id">{{ label }}</label>
		<div class="category">
			<FSelect
				v-if="type === 'select'"
				:id="categoryField"
				v-model="value[categoryField]"
				:name="name"
				:disabled="disabled"
				:options="options"
			/>
			<FRadio
				v-else
				:id="categoryField"
				v-model="value[categoryField]"
				:name="name"
				:disabled="disabled"
				:options="options"
			/>
			<FDateRange
				:id="rangeField"
				v-model="value[rangeField]"
				:disabled="disabled"
				:read-only="readOnly"
				:from="from"
				:to="to"
				:format="format"
				:year="year"
				:month="mnth"
			/>
		</div>
	</div>
</template>

<script setup>
import FSelect from '@/components/FSelect.vue';
import FRadio from '@/components/FRadio.vue';
import FDateRange from '@/components/date/FDateRange.vue';

const props = defineProps({
	// Basic Setting
	modelValue: {
		type: Object,
		required: true,
	},
	id: {
		type: String,
		default: 'fdate-category',
		requierd: true,
	},
	name: {
		type: String,
	},
	label: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
	// Option Setting
	type: {
		type: String,
		validator: value => {
			return ['radio', 'select'].includes(value);
		},
	},
	options: {
		type: Array,
		default: new Array([]),
	},
	categoryField: {
		type: String,
		default: 'category',
	},
	rangeField: {
		type: String,
		default: 'range',
	},
	from: {
		type: [Number, String],
	},
	to: {
		type: [Number, String],
	},
	format: {
		type: String,
		default: 'YYYY-MM-DD',
	},
	year: {
		type: Boolean,
		default: false,
	},
	month: {
		type: Boolean,
		default: false,
	},
	weekStart: {
		type: [Number, String],
		default: 0,
	},
	// TimePicker Setting
	timepicker: {
		type: Boolean,
		default: false,
	},
	inlineTime: {
		type: Boolean,
		default: false,
	},
	maxRange: {
		type: [Number, String],
		default: 180,
	},
	keep: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(selectedItem) {
		emit('update:modelValue', selectedItem);
	},
});
</script>

<style lang="scss" scoped>
.category {
	display: flex;
	gap: 10px;
}
</style>
