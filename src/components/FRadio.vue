<!--------------------------------------------------------------------
	파일   : FRadio.vue
	작성   : CJ Developer
	설명	 : [공통] 라디오 버튼 컴포넌트
---------------------------------------------------------------------->
<template>
	<div :id="id" :name="name" class="fRadio-box">
		<label
			v-if="label"
			:class="{ required: required, 'sub-required': subRequired }"
			>{{ label }}</label
		>
		<div class="fradio-box-r">
			<label v-for="(option, index) in options" :key="index" class="fRadio">
				<input
					:id="`radioOption${index}`"
					v-model="selectedItem"
					type="radio"
					:name="option.name"
					:value="option[valueField]"
					:disabled="disabled"
					:checked="option[valueField] === selectedItem"
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
		type: String,
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
	empty: {
		type: [Boolean, Object],
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
});

const emit = defineEmits(['update:modelValue']);

const selectedItem = computed({
	get() {
		return props.modelValue;
	},
	set(selectedItem) {
		emit('update:modelValue', selectedItem);
	},
});
</script>

<style lang="scss" scoped>
.required {
	position: relative;
	&:before {
		content: '*';
		color: #e1002b;
		margin-right: 1px;
	}
}
.sub-required {
	position: relative;
	&:before {
		content: '*';
		color: #1951c1;
		margin-right: 1px;
	}
}
.fRadio-box {
	> label:first-child {
		display: block;
		margin-bottom: 4px;
	}
	.fradio-box-r {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		height: 28px;
		align-items: center;
	}
}
input[type='radio'] {
	height: inherit;
}
.fRadio {
	position: relative;
	height: 20px;
	line-height: 20px;
	padding-left: 28px;
	cursor: pointer;
	input[type='radio'] {
		position: absolute;
		left: -9999px;
		opacity: 0;
	}
	&:before,
	&:after {
		content: '';
		position: absolute;
		display: block;
		border-radius: 50%;
		box-sizing: border-box;
	}
	&:before {
		width: 20px;
		height: 20px;
		left: 0;
		top: 0;
		background-color: #fff;
		border: 1px solid #ddd;
		transition: all 0.3s;
	}
	&:after {
		width: 20px;
		height: 20px;
		left: 0;
		top: 0;
		background-color: #ffffff;
		opacity: 0;
		transition: all 0.2s 0.2s;
		transform: scale(0);
	}
	&:has(input[type='radio']:checked) {
		&:before {
			background-color: #002053;
			border-color: #002053;
		}
		&:after {
			opacity: 1;
			transform: scale(0.4);
		}
	}
	&:has(input[type='radio']:disabled) {
		&:before {
			background-color: #fafafa;
			border-color: #ddd;
		}
		&:after {
			opacity: 0;
			transform: scale(0);
		}
	}
	&:has(input[type='radio']:checked:disabled) {
		&:before {
			background-color: #999999;
			border-color: #999999;
		}
		&:after {
			background-color: #e5e5e5;
			opacity: 1;
			transform: scale(0.4);
		}
	}
}
/* Add your custom CSS styles here */
@at-root {
	.grid-control {
		.fRadio-box {
			display: flex;
			align-items: center;
			gap: 8px;
			label {
				margin-bottom: 0;
			}
		}
	}
	/* User Language / Theme */
	.user-items {
		.fradio-box-r {
			gap: 24px;
			label {
				padding-left: 0;
				margin-bottom: 0;
				width: 24px;
				height: 24px;
				input {
					width: 24px;
					height: 24px;
					opacity: 0;
				}
				&::before {
					display: none;
				}
				&::after {
					content: '';
					display: block;
					width: 24px;
					height: 24px;
					position: absolute;
					top: 0;
					left: 0;
					border-radius: 24px;
				}
				&:has(input[type='radio']) {
					&::after {
						opacity: 1;
						transform: scale(1);
						transition: unset;
						background-repeat: no-repeat;
						background-position:
							-24px bottom,
							right bottom;
					}
				}
				&:has(input[type='radio']:checked) {
					&::after {
						transform: scale(1);
						background-position:
							right bottom,
							right bottom;
					}
				}
				&:has([value='ko-KR']) {
					&::after {
						background-image: url(/images/ico-24-user-mode-check.svg),
							url(/images/img-flag-kr.png);
					}
				}
				&:has([value='en-US']) {
					&::after {
						background-image: url(/images/ico-24-user-mode-check.svg),
							url(/images/img-flag-us.png);
					}
				}
				&:has([value='zh-CN']) {
					&::after {
						background-image: url(/images/ico-24-user-mode-check.svg),
							url(/images/img-flag-cn.png);
					}
				}
				&:has([value='default']) {
					&::after {
						background-image: url(/images/ico-24-user-mode-check.svg),
							linear-gradient(to bottom, #d6001f, #002053);
					}
				}
				&:has([value='light']) {
					&::after {
						background-image: url(/images/ico-24-user-mode-check.svg),
							url(/images/ico-24-user-mode-light.svg);
					}
				}
				&:has([value='dark']) {
					&::after {
						background-image: url(/images/ico-24-user-mode-check.svg);
						background-color: #222;
					}
				}
			}
		}
	}
}
</style>
