<template>
	<div
		class="input-box"
		:class="{ required: required, 'sub-required': subRequired }"
	>
		<label v-if="label">{{ label }} </label>
		<div class="input-item">
			<span v-if="prefix">{{ prefix }}</span>
			<input
				:id="id"
				v-maska
				:name="name"
				:type="type"
				:value="values"
				:disabled="disabled"
				:data-maska="masking"
				:style="{ width: inputWidth }"
				:placeholder="placeholder"
				@input="onInput"
				@blur="onComplete(true)"
			/>
			<span v-if="postfix">{{ postfix }}</span>
			<FIcon
				v-if="complete && !commonUtils.isEmpty(values)"
				icon="ico-input-del"
				@click="disabled ? null : resetValue()"
			/>
			<slot />
		</div>
	</div>
</template>

<script setup>
import { vMaska } from 'maska';

import FIcon from '@/components/FIcon.vue';
import commonUtils from '@/utils/commonUtils';

/**
 * Propss
 */
const props = defineProps({
	// Basic Setting
	modelValue: {
		type: String,
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
	required: {
		type: Boolean,
		default: false,
	},
	subRequired: {
		type: Boolean,
		default: false,
	},
	// Option Setting
	placeholder: {
		type: String,
	},
	type: {
		type: String,
		default: 'text',
	},
	prefix: {
		type: String,
	},
	postfix: {
		type: String,
	},
	// Masking Setting
	masking: {
		type: String,
	},
	// Component Setting
	inputWidth: {
		type: String,
	},
});

const emit = defineEmits(['update:modelValue']);

const values = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

/**
 * 입력 시 발생하는 이벤트
 * @param {event} event
 */
function onInput(event) {
	complete.value = false;
	emit('update:modelValue', event.target.value);
}

const complete = ref(values.value ?? false);
function onComplete(status) {
	complete.value = status;
}

/**
 * 입력한 값을 초기화하는 함수
 */
function resetValue() {
	values.value = '';
	complete.value = false;
}
</script>

<style lang="scss" scoped>
.input-box {
	&.required {
		label {
			position: relative;
			&:before {
				content: '*';
				color: #e1002b;
				margin-right: 1px;
			}
		}
		input,
		.input-item {
			background-color: var(--required-bg);
		}
	}
}
.input-box {
	&.sub-required {
		label {
			position: relative;
			&:before {
				content: '*';
				color: #1951c1;
				margin-right: 1px;
			}
		}
		input,
		.input-item {
			background-color: var(--sub-required-bg);
		}
	}
}
.input-item {
	position: relative;
	display: flex;
	align-items: center;
	border: solid 1px var(--finput-border);
	border-radius: 4px;
	background-color: var(--finput-bg);
	box-sizing: border-box;
	padding-right: 18px;
	transition: all 0.3s;
	&:hover {
		border-color: var(--finput-border-hover);
	}
	> span {
		flex: none;
		font-size: 13px;
		line-height: 28px;
		&:first-child {
			padding-left: 8px;
		}
		&:nth-child(3) {
			padding-right: 8px;
		}
	}
	> img {
		flex: none;
		position: absolute;
		right: 8px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		opacity: 0;
		transition: all 0.3s;
	}
	&:hover {
		> img {
			opacity: 1;
		}
	}
	input {
		width: 100%;
		box-sizing: border-box;
		padding: 0 8px 0 8px;
		font-size: 13px;
		border: none;
		&:read-only,
		&:disabled {
			background-color: var(--finput-disabled-bg);
			color: var(--finput-disabled-text) !important;
		}
		&:disabled {
			cursor: default !important;
		}
		&:read-only {
			cursor: not-allowed;
		}
	}
	&:has(input:read-only),
	&:has(input:disabled) {
		background-color: var(--finput-disabled-bg);
		border-color: var(--finput-disabled-border);
	}
	&:has(input:read-only) {
		cursor: not-allowed;
	}
	&:has(input:disabled) {
		cursor: default !important;
	}
}
@at-root {
	.grid-control {
		.input-box {
			display: flex;
			align-items: center;
			gap: 8px;
			label {
				margin-bottom: 0;
			}
			.input-item {
				max-width: 120px;
			}
		}
	}
	.login-page {
		.input-item {
			padding-right: 32px;
			background-color: #e8f0fe;
			input {
				height: 64px;
				font-size: 16px;
				background-color: #e8f0fe;
			}
			> img {
				margin-right: 12px;
			}
		}
	}
	.login-sub {
		label {
			font-size: 16px;
			font-weight: 500;
			margin-bottom: 12px;
		}
		.input-item {
			padding-right: 32px;
			border-radius: 12px;
			input {
				height: 64px;
				font-size: 16px;
				border-radius: 12px;
				padding: 0 15px;
			}
			> span {
				display: none;
			}
			> img {
				margin-right: 15px;
			}
		}
	}
}
.auth-num {
	.input-item {
		position: relative;
		input {
			padding-right: 120px;
		}
		> span {
			&:last-child {
				position: absolute;
				color: #e1002b;
				right: 15px;
				top: calc(50% - 10px);
				background: url(/images/ico-16-rt.svg) no-repeat center left;
				padding-left: 22px;
			}
		}
	}
}
</style>
