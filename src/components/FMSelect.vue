<!--------------------------------------------------------------------
	파일   : FMSelect.vue
	작성   : CJ Developer
	설명	 : [공통] 다건 셀렉트 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="multiple">
		<!-- Header -->
		<label
			v-if="label"
			:for="id"
			:class="{ required: required, 'sub-required': subRequired }"
			>{{ label }}</label
		>
		<div class="multiple-select" @click="onShowDropdown">
			<select :id="id" :value="value" :disabled="disabled" :readonly="readOnly">
				<option v-if="value == null">
					{{ placeholder }}
				</option>
			</select>
			<div :id="id" class="multiple-selected">
				<span
					v-if="selectList.length == options.length || selectList.length == 1"
				>
					{{ computeList[labelField] }}
				</span>
				<span v-else-if="selectList.length">
					{{ computeList[labelField] }} 외 {{ selectList.length - 1 }}건
				</span>
			</div>
		</div>

		<!-- Dropdown -->
		<div id="checkboxes" class="multiple-dropdown" :class="{ open: expanded }">
			<label
				v-for="option in options"
				:key="option[valueField]"
				:for="option[labelField]"
				@click="() => onSelectValue(option)"
			>
				<input
					type="checkbox"
					:name="option[labelField]"
					:checked="selectList.indexOf(option) !== -1"
				/>
				{{ option[labelField] }}
			</label>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	// Basic Setting
	modelValue: {
		type: [String, Object],
		required: true,
	},
	options: {
		type: Array,
		default: new Array([]),
		required: true,
	},
	id: {
		type: String,
		default: 'checkbox',
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
	required: {
		type: Boolean,
		default: false,
	},
	subRequired: {
		type: Boolean,
		default: false,
	},
	// Options Setting
	empty: {
		type: Object,
		default: null,
	},
	labelField: {
		type: String,
		default: 'label',
	},
	valueField: {
		type: String,
		default: 'value',
	},
	placeholder: {
		type: String,
	},
});

const emit = defineEmits(['update:modelValue']);

const options = ref([
	{
		[props.labelField]: props.empty ? props.empty[props.labelField] : '전체',
		[props.valueField]: props.empty ? props.empty[props.valueField] : '',
	},
	...props.options,
]);

// Dropdown Settings
const expanded = ref(false);
function onShowDropdown() {
	if (props.disabled || props.readOnly) {
		return;
	} else {
		expanded.value = !expanded.value;
	}
}

// Value Settings
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		if (value === null) {
			emit('update:modelValue', value);
			return;
		}

		const emitValue =
			typeof value == 'string'
				? value
				: props.options
						.filter(option => selectList.value.includes(option))
						.map(option => {
							return option[props.valueField];
						});
		emit('update:modelValue', emitValue);
	},
});

const selectList = ref([]);
const computeList = computed(() =>
	typeof props.modelValue != 'string' && props.modelValue?.length
		? options.value.find(
				option => option[props.valueField] == props.modelValue[0],
		  )
		: options.value[0],
);

// Empty Value settings
if (props.modelValue?.length) {
	// Exist props.modelValue
	selectList.value = [
		...options.value.filter(option =>
			props.modelValue.includes(option[props.valueField]),
		),
	];
} else {
	// Not exist props.modelValue
	selectAll();
}

function onSelectValue(selectOption) {
	const index = selectList.value.indexOf(selectOption);

	if (index != -1) {
		// deselect all
		if (selectOption[props.valueField] == options.value[0][props.valueField]) {
			selectList.value = [];
			value.value = null;
		} else {
			// already exist in selectList
			selectList.value.splice(index, 1);
			if (selectList.value.length == props.options.length) {
				selectList.value.splice(0, 1);
			}
			value.value = selectList.value;
		}
		return;
	}

	// not exist in selectList
	if (index == -1) {
		if (
			selectOption[props.valueField] == options.value[0][props.valueField] ||
			selectList.value.length == props.options.length - 1
		) {
			selectAll();
		} else {
			selectList.value.push(selectOption);
			value.value = selectList.value;
		}
	}
}

function selectAll() {
	selectList.value = [...options.value];
	value.value = options.value[0][props.valueField];
}
</script>

<style lang="scss" scoped>
.multiple {
	position: relative;
	&-select {
		position: relative;
		select {
			width: 100%;
			height: 28px;
			font-size: 13px;
			color: #111111;
			border: 1px solid #dddddd;
			border-radius: 4px;
			padding: 0 8px 0 5px;
			transition: all 0.3s;
			color: #777;
			&:hover {
				border-color: #002053;
			}
			&::placeholder {
				color: #777;
			}
		}
	}
	&-selected {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		span {
			font-size: 13px;
			padding-left: 8px;
		}
	}

	&-dropdown {
		position: absolute;
		display: none;
		border: 1px solid black;
		border-radius: 4px;
		margin-top: 5px;
		animation: fadeIn 0.3s linear;
		padding: 6px 0;
		background-color: white;
		width: 100%;
		z-index: 1;
		label {
			display: flex;
			align-items: center;
			padding: 8px 8px 8px 36px;
			height: inherit;
			line-height: inherit;
			&:hover {
				background-color: rgb(196, 220, 255, 0.2);
			}
			&:before,
			&:after {
				left: 8px;
				top: 8px;
			}
		}
		&.open {
			display: block;
		}
	}
}

input[type='checkbox'] {
	height: inherit;
	position: absolute;
	left: -9999px;
	opacity: 0;
}
label:has(input[type='checkbox']) {
	position: relative;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	&:before,
	&:after {
		content: '';
		display: block;
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 4px;
	}
	&:before {
		border: 1px solid #ddd;
		background-color: #fff;
		transition: all 0.3s;
	}
	&:after {
		background: url(/images/ico-check.svg) no-repeat center;
		border: 1px solid transparent;
		opacity: 0;
		transition: all 0.1s 0.2s;
		transform: scale(0);
	}
}
label:has(input[type='checkbox']:checked) {
	&:before {
		border-color: #002053;
	}
	&:after {
		opacity: 1;
		transform: scale(1);
	}
}
label:has(input[type='checkbox']:disabled) {
	&:before {
		border-color: #ddd;
		background-color: #fafafa;
	}
	&:after {
		opacity: 0;
		transform: scale(0);
	}
}
label:has(input[type='checkbox']:checked:disabled) {
	&:before {
		border-color: #999;
		background-color: #e5e5e5;
	}
	&:after {
		background: url(/images/ico-check-disabled.svg) no-repeat center;
		opacity: 1 !important;
		transform: scale(1) !important;
	}
}
</style>
