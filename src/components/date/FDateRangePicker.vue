<!--------------------------------------------------------------------
	파일   : FDateRangePicker.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜범위 선택 컴포넌트 (라이브러리 range)
---------------------------------------------------------------------->
<template>
	<div class="fila-date">
		<label v-if="label" :for="id">{{ label }}</label>
		<div class="fila-date-range">
			<!-- First field -->
			<Datepicker
				v-model="date"
				:format="formatting"
				:enable-time-picker="timepicker"
				range
				:max-range="maxRange"
				position="center"
				:teleport="true"
				:multi-calendars="{ solo: true }"
				:auto-apply="keep"
				:keep-action-row="keep"
				:close-on-auto-apply="!keep"
				:action-row="{
					showSelect: false,
					showCancel: false,
					showNow: false,
					showPreview: true,
				}"
			>
				<template #dp-input="{ value }">
					<input
						class="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
						type="text"
						:value="value.split(' ')[0]"
					/>
				</template>
			</Datepicker>

			~

			<!-- Second field -->
			<Datepicker
				v-model="date"
				:format="formatting"
				:enable-time-picker="timepicker"
				range
				:max-range="maxRange"
				position="center"
				:teleport="true"
				:multi-calendars="{ solo: true }"
				:auto-apply="keep"
				:keep-action-row="keep"
				:close-on-auto-apply="!keep"
				:action-row="{
					showSelect: false,
					showCancel: false,
					showNow: false,
					showPreview: true,
				}"
			>
				<template #dp-input="{ value }">
					<input
						class="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
						type="text"
						:value="value.split(' ')[2]"
					/>
				</template>
			</Datepicker>
		</div>
	</div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import dateUtils from '@/utils/dateUtils';
import commonUtils from '@/utils/commonUtils';

const props = defineProps({
	// Value Setting
	modelValue: {
		type: [Object, Array],
	},
	from: {
		type: [Number, String],
		default(rawProps) {
			if (
				rawProps.modelValue[0] !== '' &&
				commonUtils.isEmpty(rawProps.modelValue[0])
			) {
				return 'from';
			} else {
				return 0;
			}
		},
	},
	to: {
		type: [Number, String],
		default(rawProps) {
			if (
				rawProps.modelValue[1] !== '' &&
				commonUtils.isEmpty(rawProps.modelValue[1])
			) {
				return 'to';
			} else {
				return 1;
			}
		},
	},
	// Property Setting
	id: {
		type: String,
		default: 'input',
	},
	label: {
		type: String,
	},
	locale: {
		type: String,
		default: 'ko',
	},
	// DatePicker Setting
	format: {
		type: String,
		default: 'YYYY-MM-DD',
	},
	weekStart: {
		type: String,
		default: '0', // 월요일
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
	maxRange: {
		type: Number,
		default: 180,
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
	// Other Setting
	disabled: {
		type: Boolean,
		default: false,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	keep: {
		// 날짜 선택 시 해당 값 반영
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
		// if (props.year) {
		// 	return props.format === 'YYYY-MM-DD'
		// 		? 'yyyy'
		// 		: props.format.replace('YYYY', 'yyyy').replace('DD', 'dd');
		// }
		return props.format.replace('YYYY', 'yyyy').replace('DD', 'dd');
	},
});

/**
 * Value change
 */
const date = computed({
	get() {
		return [props.modelValue[props.from], props.modelValue[props.to]];
	},
	set(value) {
		switch (typeof props.from) {
			case 'number':
				emit('update:modelValue', [
					dateUtils.setDate(value[0], props.format),
					dateUtils.setDate(value[1], props.format),
				]);
				break;
			default:
				const emitValue = {
					...props.modelValue,
					[props.from]: dateUtils.setDate(value[0], props.format),
					[props.to]: dateUtils.setDate(value[1], props.format),
				};
				emit('update:modelValue', emitValue);
				break;
		}
	},
});
</script>

<style lang="scss" scoped>
.fila-date {
	align-items: center;
	width: fit-content;

	&-range {
		display: flex;
		align-items: center;
	}

	input {
		font-size: 13px;
		padding: 0 20px 0 30px !important;
		background: url(/images/ico_16_calendar.svg) no-repeat center left 8px;
		&:focus {
			border: 2px solid blue;
		}
	}
}
.fila-date-range {
	display: flex;
	gap: 4px;
}
</style>
