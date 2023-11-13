<!--------------------------------------------------------------------
	파일   : FTime.vue
	작성   : CJ Developer
	설명	 : [공통] 시간 선택 컴포넌트
---------------------------------------------------------------------->
<template>
	<div>
		<label v-if="label" :for="id">{{ label }}</label>
		<Datepicker
			:id="id"
			v-model="date"
			:name="name"
			time-picker
			keep-action-row
			:disabled="disabled"
			:readonly="readOnly"
			:close-on-auto-apply="false"
			:range="range"
			:enable-seconds="format.includes('s')"
			:action-row="{
				showSelect: false,
				showCancel: false,
				showNow: false,
				showPreview: true,
			}"
		/>
	</div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import dayjs from 'dayjs';
import dateUtils from '@/utils/dateUtils';
import commonUtils from '@/utils/commonUtils';

const props = defineProps({
	// Basic Setting
	modelValue: {
		type: [String, Array, Object],
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
	range: {
		type: Boolean,
		default: false,
	},
	from: {
		type: [Number, String],
		default(rawProps) {
			if (commonUtils.isEmpty(rawProps.modelValue[0])) {
				return 'from';
			} else {
				return 0;
			}
		},
	},
	to: {
		type: [Number, String],
		default(rawProps) {
			if (commonUtils.isEmpty(rawProps.modelValue[1])) {
				return 'to';
			} else {
				return 1;
			}
		},
	},
	format: {
		type: String,
		default: 'HH:mm',
	},
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
	get() {
		switch (typeof props.modelValue) {
			case 'string':
				dateUtils.setDate(props.modelValue, props.format);

				return makeFormat(props.modelValue, 'dayjs');
			default:
				dateUtils.setDate(props.modelValue[props.from], props.format);
				dateUtils.setDate(props.modelValue[props.to], props.format);

				return [
					makeFormat(props.modelValue[props.from], 'dayjs'),
					makeFormat(props.modelValue[props.to], 'dayjs'),
				];
		}
	},
	set(value) {
		switch (typeof props.modelValue) {
			case 'string':
				return emit('update:modelValue', makeFormat(value, 'string'));
			default:
				switch (typeof props.from) {
					case 'number':
						emit('update:modelValue', [
							makeFormat(value[0], 'string'),
							makeFormat(value[1], 'string'),
						]);
						break;
					default:
						const emitValue = {
							...props.modelValue,
							[props.from]: makeFormat(value[0], 'string'),
							[props.to]: makeFormat(value[1], 'string'),
						};
						emit('update:modelValue', emitValue);
						break;
				}
				return;
		}
	},
});

function makeFormat(value, target) {
	switch (target) {
		case 'dayjs':
			return {
				hours: dayjs(value, props.format).hour(),
				minutes: dayjs(value, props.format).minute(),
				seconds: dayjs(value, props.format).second(),
			};
		case 'string':
			let hours = value.hours < 10 ? `0${value.hours}` : `${value.hours}`;
			let minutes =
				value.minutes < 10 ? `0${value.minutes}` : `${value.minutes}`;
			let seconds =
				value.seconds < 10 ? `0${value.seconds}` : `${value.seconds}`;

			return props.format.includes('s')
				? `${hours}:${minutes}:${seconds}`
				: `${hours}:${minutes}`;
	}
}
</script>

<style lang="scss">
select {
	border: none;
	width: 100px;
}
.dp__main {
	.dp__input_wrap {
		input {
			padding: 0 5px;
		}
	}
	.dp__input_icon {
		display: none;
	}
}
</style>
