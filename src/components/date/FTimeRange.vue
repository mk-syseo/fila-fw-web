<!--------------------------------------------------------------------
	파일   : FTimeRange.vue
	작성   : CJ Developer
	설명	 : [공통] 시간 범위 컴포넌트
---------------------------------------------------------------------->
<template>
	<div>
		<label v-if="label" :for="id">{{ label }}</label>
		<Datepicker
			v-model="date"
			time-picker
			auto-apply
			keep-action-row
			:close-on-auto-apply="false"
			:enable-seconds="format.includes('s')"
			mode-height="100"
			:action-row="{
				showSelect: false,
				showCancel: false,
				showNow: false,
				showPreview: true,
			}"
		>
			<!-- @update:model-value="validateTimeRange" -->
			<!-- Input -->
			<template #input-icon>
				<FIcon
					icon="calendar"
					class="dp__icon dp__input_icon dp__input_icons"
				/>
			</template>
			<template #dp-input="{ value }">
				<input
					type="text"
					readonly
					class="dp__pointer dp__input dp__input_icon_pad"
					:value="value"
				/>
			</template>

			<!-- Timepicker : Select -->
			<template #time-picker-overlay="{ setHours, setMinutes, setSeconds }">
				<div class="dp__overlay_row dp__flex_row">
					<div class="dp__time_input">
						<!-- hour -->
						<select
							class="select-input"
							:value="date[0].hours"
							@change="event => setHours([+event.target.value, date[1].hours])"
						>
							<option v-for="h in hoursList" :key="h.value" :value="h.value">
								{{ h.label }}
							</option>
						</select>

						<!-- minute -->
						<select
							v-if="format.includes('m')"
							class="select-input"
							:value="date[0].minutes"
							@change="
								event => setMinutes([+event.target.value, date[1].minutes])
							"
						>
							<option
								v-for="m in minuteSeconds"
								:key="m.value"
								:value="m.value"
							>
								{{ m.label }}
							</option>
						</select>

						<!-- second -->
						<select
							v-if="format.includes('s')"
							class="select-input"
							:value="date[0].seconds"
							@change="
								event => setSeconds([+event.target.value, date[1].seconds])
							"
						>
							<option
								v-for="s in minuteSeconds"
								:key="s.value"
								:value="s.value"
							>
								{{ s.label }}
							</option>
						</select>
					</div>
				</div>

				<div class="dp__overlay_row dp__flex_row">
					<div class="dp__time_input">
						<!-- hour -->
						<select
							class="select-input"
							:value="date[1].hours"
							@change="event => setHours([date[0].hours, +event.target.value])"
						>
							<option v-for="h in hoursList" :key="h.value" :value="h.value">
								{{ h.label }}
							</option>
						</select>

						<!-- minute -->
						<select
							v-if="format.includes('m')"
							class="select-input"
							:value="date[1].minutes"
							@change="
								event => setMinutes([date[0].minutes, +event.target.value])
							"
						>
							<option
								v-for="m in minuteSeconds"
								:key="m.value"
								:value="m.value"
							>
								{{ m.label }}
							</option>
						</select>

						<!-- second -->
						<select
							v-if="format.includes('s')"
							class="select-input"
							:value="date[1].seconds"
							@change="
								event => setSeconds([date[0].seconds, +event.target.value])
							"
						>
							<option
								v-for="s in minuteSeconds"
								:key="s.value"
								:value="s.value"
							>
								{{ s.label }}
							</option>
						</select>
					</div>
				</div>
			</template>
		</Datepicker>
	</div>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import dayjs from 'dayjs';
import dateUtils from '@/utils/dateUtils';
import commonUtils from '@/utils/commonUtils';

const props = defineProps({
	// Value Setting
	modelValue: {
		type: [Array, Object],
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
	// Property Setting
	label: {
		type: String,
	},
	format: {
		type: String,
		default: 'HH:mm',
	},
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
	get() {
		dateUtils.setDate(props.modelValue[props.from], props.format);
		dateUtils.setDate(props.modelValue[props.to], props.format);

		return [
			makeFormat(props.modelValue[props.from], 'dayjs'),
			makeFormat(props.modelValue[props.to], 'dayjs'),
		];
	},
	set(value) {
		const emitValue = {
			...props.modelValue,
			[props.from]: makeFormat(value[0], 'string'),
			[props.to]: makeFormat(value[1], 'string'),
		};
		emit('update:modelValue', emitValue);
	},
});

/**
 * Hours and Minutes
 */
const MAX_HOUR = 24;
const hoursList = [...Array(MAX_HOUR)].map((_, index) => {
	return {
		label: index < 10 ? `0${index}` : `${index}`,
		value: index,
	};
});

const MAX_MINSEC = 60;
const minuteSeconds = [...Array(MAX_MINSEC)].map((_, index) => {
	return {
		label: index < 10 ? `0${index}` : `${index}`,
		value: index,
	};
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
</style>
