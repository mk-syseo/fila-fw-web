<!--------------------------------------------------------------------
	파일   : FDate.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜 선택 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="fila-date">
		<label v-if="label">{{ label }}</label>
		<Datepicker
			ref="refDatepicker"
			v-model="date"
			:uid="id"
			:disabled="disabled"
			:readonly="readOnly"
			:locale="useLocalStorage('user', 'locale')"
			:format="formatting"
			:year-picker="year"
			:month-picker="month"
			:week-picker="week"
			:week-start="weekStart"
			:enable-time-picker="timepicker"
			:time-picker-inline="inlineTime"
			:auto-apply="keep"
			:action-row="{
				showSelect: false,
				showCancel: false,
				showNow: false,
				showPreview: true,
			}"
			:keep-action-row="keep"
			:close-on-auto-apply="true"
			:teleport="true"
			:text-input="{
				openMenu: openStatus,
				format: formatting,
				enterSubmit: true,
				tabSubmit: true,
			}"
			@update:model-value="updateModelValue"
		>
			<!-- highlight-week-days는 주말 표시에 사용 -->
			<!-- :highlight-week-days="[0, 6]" -->
			<template #dp-input="{ value, onInput, onEnter, isMenuOpen }">
				<input
					:id="id"
					v-maska
					:name="name"
					type="text"
					class="dp__pointer dp__input dp__input_icon_pad"
					:value="value"
					:readonly="week || readOnly"
					:data-maska="
						props.week ? null : formatting.replace(/[a-zA-Z]/gi, '#')
					"
					@input="onInput"
					@keydown.enter="onEnter"
					@click="onClickInput(isMenuOpen)"
				/>
			</template>
		</Datepicker>
	</div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import dayjs from 'dayjs';
import { vMaska } from 'maska';

import dateUtils from '@/utils/dateUtils.js';
import { useLocalStorage } from '@/utils/useLocalStorage';

const props = defineProps({
	// Basic Setting
	modelValue: {
		type: [String, Number],
		required: true,
	},
	id: {
		type: String,
		required: true,
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
	week: {
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
	keep: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(['update:modelValue']);

/**
 * Format change
 */
const formatting = computed({
	get() {
		if (props.month) {
			return props.format === 'YYYY-MM-DD'
				? 'yyyy-MM'
				: props.format.replace('YYYY', 'yyyy');
		}
		if (props.year) {
			return props.format === 'YYYY-MM-DD'
				? 'yyyy'
				: props.format.replace('YYYY', 'yyyy').replace('DD', 'dd');
		}
		return props.format.replace('YYYY', 'yyyy').replace('DD', 'dd');
	},
});

/**
 * DatePicker Value
 */
const date = computed({
	get() {
		if (props.month) {
			return {
				month: dayjs(props.modelValue, props.format).month() ?? null,
				year: dayjs(props.modelValue, props.format).year() ?? null,
			};
		} else {
			return props.modelValue;
		}
	},
	set(value) {
		return value;
	},
});

/**
 * Open Calendar
 * @param {boolean} isOpen
 */
const openStatus = ref(false);
function onClickInput(isOpen) {
	openStatus.value = !isOpen;
}

// 초기값
if (!props.modelValue) {
	if (props.month) {
		updateModelValue({
			year: dayjs().year(),
			month: dayjs().month(),
		});
	} else if (props.year) {
		updateModelValue(dayjs().year());
	} else {
		date.value = dateUtils.setDate(dayjs(), props.format);
		updateModelValue(dayjs());
	}
}

function updateModelValue(value) {
	openStatus.value = false;

	if (props.month) {
		return emit(
			'update:modelValue',
			dateUtils.setDate(`${value.year}-${value.month + 1}`, props.format),
		);
	}
	if (props.year) {
		return emit('update:modelValue', value);
	}
	if (props.week) {
		return emit('update:modelValue', [
			dateUtils.setDate(value[0], props.format),
			dateUtils.setDate(value[1], props.format),
		]);
	}

	return emit(
		'update:modelValue',
		value ? dateUtils.setDate(value, props.format) : null,
	);
}

/**
 * Expose Function
 */
const refDatepicker = ref(null);
function closeMenu() {
	refDatepicker.value.closeMenu();
}

function selectDate() {
	refDatepicker.value.selectDate();
}

function clear() {
	refDatepicker.value.clearValue();
}

function focus() {
	const element = document.getElementById(props.id);
	element.focus();
}

defineExpose({ closeMenu, selectDate, clear, focus });
</script>

<style lang="scss" scoped>
input {
	font-size: 13px;
	background: #fff url(/images/ico_16_calendar.svg) no-repeat center left 8px;
	&:focus {
		border: 2px solid blue;
	}
}

.dp__calendar_header {
	.dp__calendar_header_item {
		&:first-child {
			color: red;
		}

		&:last-child {
			color: blue;
		}
	}
}

.dp__main {
	.dp__input_wrap {
		input {
			padding: 0 20px 0 30px;
		}
	}
}

// 주말 표시
// .dp__calendar_row {
// 	.dp__calendar_item {
// 		// .dp__cell_offset이 있는 경우에는 대상 제외 (지난달, 다음달 날짜 표시)
// 		// .dp__range_start, .dp__range_end 가 붙는 경우 아래 스타일은 무시되어야함
// 		&:first-child > .dp__cell_highlight {
// 			color: red;
// 			background-color: transparent;
// 		}

// 		&:last-child > .dp__cell_highlight {
// 			color: blue;
// 			background-color: transparent;
// 		}
// 	}
// }
</style>
