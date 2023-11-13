<!--------------------------------------------------------------------
	파일   : FSelect.vue
	작성   : CJ Developer
	설명	 : [공통] 셀렉트 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="fSelect">
		<label v-if="label" :for="id">{{ label }}</label>
		<div>
			<div :class="{ required: required, 'sub-required': subRequired }">
				<input
					:id="id"
					ref="refInput"
					v-model="word"
					v-maska
					:name="name"
					:data-maska="masking"
					type="text"
					autocomplete="off"
					:disabled="disabled"
					:readonly="disabled || clickOnly || readOnly"
					:placeholder="placeholder"
					@input="setWord($event.target.value)"
					@keyup.up="onMoveList('up')"
					@keyup.down="onMoveList('down')"
					@keyup.enter="onSelect"
					@focus="onDropdownStatus(true)"
					@blur="onDropdownStatus(false)"
					@click.prevent="() => !disabled && onDropdownStatus(true)"
				/>
				<!-- @focus="onDropdownStatus(true)" -->
				<FIcon
					icon="ico-16-select"
					@click="!disabled && !readOnly && setWord('')"
				/>
			</div>

			<Teleport to="body" :disabled="!isDropOpen">
				<ul
					:style="dropdownPosition"
					class="dropdown"
					:class="{ open: isDropOpen && filter.length > 0 }"
				>
					<li
						v-for="(option, index) in filter"
						:key="option[valueField]"
						:class="{ active: index === focusIndex }"
						:value="option[valueField]"
						@mousedown="onSelect($event, option)"
					>
						{{ option[labelField] }}
					</li>
				</ul>
			</Teleport>
		</div>
	</div>
</template>

<script setup>
import { vMaska } from 'maska';

import FIcon from '@/components/FIcon.vue';

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
	clickOnly: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
	},
	// Masking Setting
	masking: {
		type: String,
	},
});

const emit = defineEmits(['update:modelValue']);

const options = ref([...props.options]);

// Initial value from Props
const selectLabel = computed(
	() =>
		options.value.find(
			option => option[props.valueField] === props.modelValue,
		)?.[props.labelField] ?? '',
);

// Search Word
const refInput = ref(null);
const word = ref(selectLabel.value);

function setWord(value) {
	word.value = value;
}

// Empty Value settings
switch (typeof props.empty) {
	case 'boolean':
		if (props.empty) {
			// empty : true → 기본값 포함
			options.value.unshift({
				[props.labelField]: '전체',
				[props.valueField]: '',
			});
			word.value = options.value[0][props.labelField];
			emit('update:modelValue', options.value[0][props.valueField]);
		}
		break;
	case 'object':
		options.value.unshift(props.empty);
		word.value = options.value[0][props.labelField];
		emit('update:modelValue', options.value[0][props.valueField]);
		break;
	default:
		break;
}

/**
 * Dropdown
 */
const isDropOpen = ref(false);

const filter = computed(() =>
	options.value.filter(option => {
		if (props.clickOnly) {
			return option;
		}
		if (props.empty && word.value === options.value[0][props.labelField]) {
			return option;
		}
		if (
			option[props.labelField].includes(word.value) ||
			option[props.valueField].includes(word.value)
		) {
			return option;
		}
	}),
);

/**
 * Select Value
 * @param {event} event
 * @param {object} selectValue
 */
function onSelect(event, selectValue) {
	switch (event.type) {
		case 'keyup':
			if (focusIndex.value > 0) {
				emit(
					'update:modelValue',
					filter.value[focusIndex.value][props.valueField],
				);
				word.value = filter.value[focusIndex.value][props.labelField];
			} else {
				emit('update:modelValue', filter.value[0][props.valueField]);
				word.value = filter.value[0][props.labelField];
			}
			break;
		default:
			// click
			emit('update:modelValue', selectValue[props.valueField]);
			word.value = selectValue[props.labelField];
			break;
	}

	onDropdownStatus(false);
	refInput.value.blur();
	focusIndex.value = -1;
}

/**
 * Key Event
 */
const focusIndex = ref(-1);

/**
 *
 * @param {string} direction
 */
function onMoveList(direction) {
	switch (direction) {
		case 'up':
			if (focusIndex.value > -1) {
				focusIndex.value -= 1;
			}
			break;
		case 'down':
			if (focusIndex.value + 1 < filter.value.length) {
				focusIndex.value += 1;
			}
			break;
	}
}

/**
 * Focus Event
 */
const dropdownPosition = ref({ top: 0, left: 0, width: 0 });
function onDropdownStatus(value) {
	// 입력의 위치를 기준으로 드롭다운의 위치 결정
	const position = refInput.value.getBoundingClientRect();
	dropdownPosition.value.left = `${position.left}px`;
	dropdownPosition.value.top = `${
		window.scrollY + position.top + position.height
	}px`;
	dropdownPosition.value.width = `${position.width}px`;

	isDropOpen.value = value;
}
</script>

<style lang="scss" scoped>
/* colors palette */
$black: #111;
$white: #fff;
$gray-1: #555;
$gray-2: #777;
$gray-3: #999;
$blue-1: #002053;
$blue-2: #1951c1;
$red-1: #e1002b;
$primary-1: $blue-1;
$secondary-1: $red-1;

.fSelect:has(.required) {
	label {
		position: relative;
		&:before {
			content: '*';
			color: $secondary-1;
			margin-right: 1px;
		}
	}
	input {
		background-color: var(--required-bg);
	}
}

.fSelect:has(.sub-required) {
	label {
		position: relative;
		&:before {
			content: '*';
			color: $blue-2;
			margin-right: 1px;
		}
	}
	input {
		background-color: var(--sub-required-bg);
	}
}
.fSelect {
	position: relative;
	> div {
		> div {
			position: relative;
			width: 100%;

			&.error {
				border: red 20px;
			}
			> input {
				width: 100%;
				font-size: 13px;
				padding-left: 8px;
				&::placeholder {
					color: #777;
				}
			}
			> img {
				position: absolute;
				right: 7px;
				bottom: 6px;
				transition: all 0.3s;
			}
		}
	}
	&.h32 {
		> div {
			> div {
				> input {
					height: 32px;
					line-height: 32px;
				}
				> img {
					bottom: 7px;
				}
			}
		}
	}
}
.dropdown {
	position: absolute;
	display: none;
	border: 1px solid var(--dropdown-border);
	border-radius: 4px;
	margin-top: 4px;
	animation: fadeIn 0.3s linear;
	transform-origin: 0 0;
	background-color: var(--fselect-bg);
	width: 100%;
	z-index: 2;
	&.open {
		display: block;
	}
	li {
		font-size: 13px;
		padding: 8px;
		border-radius: 0;
		color: var(--basic-text);
		&:first-child {
			border-radius: 4px 4px 0 0;
		}
		&:last-child {
			border-radius: 0 0 4px 4px;
		}
		&:hover,
		&.active {
			background-color: rgb(196, 220, 255, 0.2);
		}
	}
}
@at-root {
	.grid-control {
		.fSelect {
			display: flex;
			align-items: center;
			gap: 8px;
			label {
				margin-bottom: 0;
			}
			> div {
				position: relative;
				input {
					max-width: 120px;
				}
			}
		}
	}
}
</style>
