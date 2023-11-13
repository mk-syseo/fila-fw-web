<!--------------------------------------------------------------------
	파일   : FDateRange.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜범위 선택 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="fila-date">
		<label v-if="label" :for="id">{{ label }}</label>
		<div class="dateRange-area">
			<FDate
				ref="refFrom"
				v-model="from"
				:name="name"
				:disabled="disabled"
				:readonly="readOnly"
				:format="format"
				:year="year"
				:month="month"
				:week-start="weekStart"
				:timepicker="timepicker"
				:inline-time="inlineTime"
				:keep="keep"
			/>
			~
			<FDate
				ref="refTo"
				v-model="to"
				:name="name"
				:disabled="disabled"
				:readonly="readOnly"
				:format="format"
				:year="year"
				:month="month"
				:week-start="weekStart"
				:timepicker="timepicker"
				:inline-time="inlineTime"
				:keep="keep"
			/>
		</div>
	</div>
</template>

<script setup>
import FDate from '@/components/date/FDate.vue';

import dateUtils from '@/utils/dateUtils';
import commonUtils from '@/utils/commonUtils';

import { useMessage } from '@/plugins/message/message';

const props = defineProps({
	// Basic Setting
	modelValue: {
		type: [Object, Array],
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

const message = useMessage();

const date = computed({
	get() {
		return props.modelValue;
	},
	set(newValue) {
		emit('update:modelValue', newValue);
	},
});

/**
 * Start date
 */
const refFrom = ref(null);
const from = computed({
	get() {
		return props.modelValue[props.from];
	},
	set(newValue) {
		if (refFrom.value) {
			refFrom.value.closeMenu();
		}

		// 1. 기존값이 비어있는 경우 날짜 세팅. 오늘 기준으로 -maxRange일
		if (commonUtils.isEmpty(newValue) || commonUtils.isEmpty(to.value)) {
			date.value[props.from] = dateUtils.addDays(
				newValue,
				-props.maxRange,
				props.format,
			);
			return;
		}

		// 2. 조회가능한 기간을 넘은 경우
		if (
			dateUtils.getDuration({
				from: newValue,
				to: date.value[props.to],
			}) > props.maxRange
		) {
			message.showAlert({
				message: `조회 가능한 기간은 최대 ${props.maxRange}일 입니다`,
				onConfirm: () => {
					refFrom.value.focus();
					message.hide();
				},
			});
			return;
		}

		// 3. 시작일자가 종료일자보다 이전 날짜인지 판단
		if (dateUtils.isSameOrBefore(newValue, to.value)) {
			date.value[props.from] = newValue;
		} else {
			if (commonUtils.isEmpty(props.modelValue[props.from])) {
				refFrom.value.clear();
			} else {
				refFrom.value.selectDate(props.modelValue[props.from]);
			}

			message.showAlert({
				message: '종료일자보다 시작일자가 빠릅니다',
				onConfirm: () => {
					refFrom.value.focus();
					message.hide();
				},
			});
		}
	},
});

/**
 * End date
 */
const refTo = ref(null);
const to = computed({
	get() {
		return props.modelValue[props.to];
	},
	async set(newValue) {
		if (refTo.value) {
			refTo.value.closeMenu();
		}

		// 1. 기존값이 비어있는 경우 날짜 세팅
		if (commonUtils.isEmpty(newValue) || commonUtils.isEmpty(from.value)) {
			date.value[props.to] = newValue;
			return;
		}

		// 2. 조회가능한 기간을 넘은 경우
		if (
			dateUtils.getDuration({
				from: date.value[props.from],
				to: newValue,
			}) > props.maxRange
		) {
			message.showAlert({
				message: `조회 가능한 기간은 최대 ${props.maxRange}일 입니다`,
				onConfirm: () => {
					refTo.value.focus();
					message.hide();
				},
			});
			return;
		}

		// 3. 종료일자가 시작일자보다 이후 날짜인지 판단
		if (dateUtils.isSameOrAfter(newValue, from.value)) {
			date.value[props.to] = newValue;
		} else {
			refTo.value.closeMenu();

			if (commonUtils.isEmpty(props.modelValue[props.to])) {
				refTo.value.clear();
			} else {
				refTo.value.selectDate(props.modelValue[props.to]);
			}

			message.showAlert({
				message: '종료일자보다 시작일자가 빠릅니다',
				onConfirm: () => {
					refTo.value.focus();
					message.hide();
				},
			});
		}
	},
});
</script>

<style lang="scss" scoped>
.dateRange-area {
	display: flex;
	gap: 4px;
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
