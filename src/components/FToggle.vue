<template>
	<div>
		<label
			v-if="label"
			:class="{ required: required, 'sub-required': subRequired }"
			>{{ label }}</label
		>
		<label class="btn-toggle">
			<input
				:id="id"
				v-model="value"
				:name="name"
				type="checkbox"
				:disabled="disabled"
				:true-value="trueValue"
				:false-value="falseValue"
			/>
		</label>
	</div>
</template>

<script setup>
const props = defineProps({
	// Basic Setting
	modelValue: {
		type: [Boolean, String],
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
	// readOnly: {
	// 	type: Boolean,
	// 	default: false,
	// },
	required: {
		type: Boolean,
		default: false,
	},
	subRequired: {
		type: Boolean,
		default: false,
	},
	// Option Setting
	trueValue: {
		type: [Boolean, String],
		default: true,
	},
	falseValue: {
		type: [Boolean, String],
		default: false,
	},
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});
</script>

<style lang="scss" scoped>
/* Toggle : checkbox */
.btn-toggle {
	height: 16px;
	position: relative;
	cursor: pointer;
	input[type='checkbox'] {
		height: inherit;
		position: absolute;
		left: -9999px;
		opacity: 0;
	}
	&:before,
	&:after {
		content: '';
		display: block;
		transition: all 0.3s;
	}
	&:before {
		position: relative;
		width: 30px;
		height: 16px;
		border-radius: 12px;
		background-color: #d3d6d9;
	}
	&:after {
		position: absolute;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: white;
		left: 1px;
		top: 1px;
	}
	&:has(input[type='checkbox']:checked) {
		&:before {
			background-color: var(--color-primary);
		}
		&:after {
			left: 15px;
		}
	}
	&:has(input[type='checkbox']:disabled) {
		&:after {
			background-color: #abafb2;
		}
	}
	&:has(input[type='checkbox']:checked:disabled) {
		&:before {
			background-color: #d3d6d9;
		}
	}
}
</style>
