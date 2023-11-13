<!--------------------------------------------------------------------
	파일   : FRangeButton.vue
	작성   : CJ Developer
	설명	 : [공통] 날짜 선택 시..
---------------------------------------------------------------------->
<template>
	<div class="button-range">
		<button v-for="r in ranges" :key="r.duration" @click="calculateDate(r)">
			{{ getRangeString(r) }}
		</button>
	</div>
</template>

<script setup>
import dateUtils from '@/utils/dateUtils';

const props = defineProps({
	// Value Setting
	modelValue: {
		type: [Array, Object],
	},
	// Other Setting
	range: {
		type: Array,
		default: new Array([]),
	},
	format: {
		type: String,
		default: 'YYYY-MM-DD',
	},
});

const emit = defineEmits(['update:modelValue']);

const dates = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

const today = dateUtils.setDate(dateUtils.getToday(), props.format);
const keys = Object.keys(dates.value);

const ranges = computed(() => {
	return props.range.map(r => {
		return {
			duration: Number(r.slice(0, -1)),
			unit: r.slice(-1),
		};
	});
});

function getRangeString(value) {
	if (value.duration) {
		switch (value.unit) {
			case 'd':
			case 'D':
				if (value.duration === -1) {
					return '어제';
				}
				return `${value.duration < 0 ? value.duration * -1 : value.duration}일`;
			case 'm':
			case 'M':
				return `${value.duration < 0 ? value.duration * -1 : value.duration}달`;
		}
	} else {
		return '오늘';
	}
}

function calculateDate(value) {
	dates.value[keys[1]] = today;
	switch (value.unit) {
		case 'd':
		case 'D':
			if (value.duration) {
				dates.value[keys[0]] = dateUtils.setDate(
					dateUtils.addDays(today, value.duration),
					props.format,
				);
			} else {
				dates.value[keys[0]] = today;
			}
			break;
		case 'm':
		case 'M':
			dates.value[keys[0]] = dateUtils.setDate(
				dateUtils.addMonths(today, value.duration),
				props.format,
			);
			break;
		default:
			break;
	}
}
</script>

<style lang="scss" scoped>
.button-range {
	display: flex;
	gap: 5px;
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 28px;
		font-size: 13px;
		padding: 0 8px;
		color: var(--btn-text);
		border: solid 1px var(--btn-text);
		border-radius: 4px;
	}
}
</style>
