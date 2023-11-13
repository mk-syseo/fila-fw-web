<!--------------------------------------------------------------------
	파일   : FCheckbox.vue
	작성   : CJ Developer
	설명	 : [공통] 체크박스 컴포넌트
---------------------------------------------------------------------->
<template>
	<div :name="name" class="fCheck-box">
		<label
			v-if="label"
			:class="{ required: required, 'sub-required': subRequired }"
			>{{ label }}</label
		>
		<!-- 체크박스 options 미사용 -->
		<label v-if="options.length == 0" class="fCheckbox-item">
			<input
				:id="id"
				v-model="checkedItems"
				type="checkbox"
				:disabled="disabled"
				:chedcked="checkedItems === trueValue"
				:true-value="trueValue"
				:false-value="falseValue"
			/>
		</label>
		<!-- 체크박스 options 사용 -->
		<div v-else class="fCheckbox">
			<label
				v-for="(option, index) in options"
				:key="index"
				class="fCheckbox-item"
			>
				<input
					:id="id"
					v-model="checkedItems"
					type="checkbox"
					:value="getOptionValue(option)"
					:disabled="disabled"
					:chedcked="checkedItems.includes(option[trueValue])"
					:true-value="trueValue"
					:false-value="falseValue"
				/>
				{{ getOptionLabel(option) }}
			</label>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	// Basic Setting
	modelValue: {
		type: [String, Array, Boolean, Number],
		required: true,
	},
	options: {
		type: Array,
		default: () => [],
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
	labelField: {
		type: String,
		default: 'label',
	},
	valueField: {
		type: String,
		default: 'value',
	},
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

const checkedItems = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		// emit 'update:modelValue' 이벤트로 변경된 값을 부모 컴포넌트로 전달합니다.
		emit('update:modelValue', value);
	},
});

// 객체 또는 배열에서 옵션의 값을 가져오는 함수
const getOptionValue = option => {
	return typeof option === 'object' ? option[props.valueField] : option;
};

// 객체 또는 배열에서 옵션의 레이블을 가져오는 함수
const getOptionLabel = option => {
	return typeof option === 'object' ? option[props.labelField] : '';
};
</script>

<style lang="scss" scoped>
.fCheck-box {
	.fCheck-box-r {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		height: 28px;
		align-items: center;
	}
	&:has(.fCheckbox) {
		> label:first-child {
			margin-bottom: 4px;
		}
	}
}
div {
	&.fCheckbox {
		height: 28px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
	}
}
input[type='checkbox'] {
	height: inherit;
	position: absolute;
	left: -9999px;
	opacity: 0;
}
label:has(input[type='checkbox']).fCheckbox-item {
	position: relative;
	height: 20px;
	line-height: 20px;
	padding-left: 28px;
	display: inline-block;
	cursor: pointer;
	margin-bottom: 0;
	&:before,
	&:after {
		content: '';
		display: block;
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 4px;
		left: 0;
		top: 0;
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
// 로그인메인

@at-root {
	.login-main {
		.fCheckbox {
			.fCheckbox-item {
				font-size: 14px;
				font-weight: 500;
				line-height: 24px;
				height: 24px;
				padding-left: 30px;
				display: flex;
				align-items: center;
				&:before {
					width: 24px;
					height: 24px;
					border-radius: 50%;
					border: none;
					background: url(/images/ico-login-check-default.svg) no-repeat center;
					transform: scale(1);
					opacity: 1;
					transition: all 0.3s;
				}
				&:after {
					width: 24px;
					height: 24px;
					background: url(/images/ico-login-check-checked.svg) no-repeat center;
					transform: scale(1);
					opacity: 0;
					transition: all 0.3s;
				}
				&:has(input[type='checkbox']:checked) {
					&:before {
						opacity: 0;
					}
					&:after {
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
