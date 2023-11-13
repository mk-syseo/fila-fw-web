<!--------------------------------------------------------------------
	파일   : FAutoComplete.vue
	작성   : CJ Developer
	설명	 : [공통] 자동완성 팝업 호출 컴포넌트 예시
---------------------------------------------------------------------->
<template>
	<label
		v-if="label"
		:class="{
			required: required,
			'sub-required': subRequired,
			rightLayer: rightLayer,
		}"
		>{{ label }}</label
	>
	<div class="autocomplete">
		<div class="autocomplete-inner">
			<FInput
				v-model="userInput[comCd]"
				type="text"
				autocomplete="off"
				@input="onInputChange"
				@keydown.down="highlightNext"
				@keydown.up="highlightPrevious"
				@keydown.enter="selectSuggestion"
				@click="openSuggestions"
			/>
			<PopAutoComplete fix-label="Test" @receive="onReceiveData" />
		</div>
		<FInput v-if="isHidden" v-model="userInput[comNm]" type="text" disabled />
		<ul
			class="dropdown"
			:class="{ open: showSuggestions && filteredSuggestions.length > 0 }"
		>
			<li
				v-for="(suggestion, index) in filteredSuggestions"
				:key="index"
				:class="{ active: index === selectedIndex }"
				@mousedown="selectSuggestion(suggestion)"
			>
				<div class="suggestion-row">
					<div><span>Value :</span>{{ suggestion[valueField] }}</div>
					<div><span>Label :</span>{{ suggestion[labelField] }}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import FInput from '@/components/FInput.vue';
import PopAutoComplete from '@/components/PopAutoComplete.vue';

const props = defineProps({
	// Value Setting
	modelValue: {
		type: [String, Array],
	},
	suggestions: {
		type: Array,
	},
	userInput: {
		type: String,
		default: '',
	},
	showSuggestions: {
		type: Boolean,
		default: false,
	},
	isHidden: {
		type: Boolean,
		default: false,
	},
	selectedIndex: {
		type: Number,
		defautl: -1,
	},
	label: {
		type: String,
	},
	required: {
		type: Boolean,
		default: false,
	},
	subRequired: {
		type: Boolean,
		default: false,
	},
	rightLayer: {
		type: Boolean,
		default: false,
	},
	// Options Setting
	labelField: {
		type: String,
		default: 'label',
	},
	valueField: {
		type: String,
		default: 'value',
	},
	comCd: {
		type: String,
		default: 'comCd',
	},
	comNm: {
		type: String,
		default: 'comNm',
	},
});

const emit = defineEmits(['update:modelValue']);
const userInput = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

const showSuggestions = ref(props.showSuggestions);
const selectedIndex = ref(props.selectedIndex);

const filteredSuggestions = computed(() => {
	return props.suggestions.filter(
		suggestion =>
			suggestion[props.labelField]
				.toString()
				.toLowerCase()
				.includes(
					userInput.value[props.comCd] === undefined ||
						userInput.value[props.comCd] === ''
						? ''
						: userInput.value[props.comCd].toString().toLowerCase(),
				) ||
			suggestion[props.valueField]
				.toString()
				.toLowerCase()
				.includes(
					userInput.value[props.comCd] === undefined ||
						userInput.value[props.comCd] === ''
						? ''
						: userInput.value[props.comCd].toString().toLowerCase(),
				),
	);
});

function onReceiveData(selectedData) {
	userInput.value[props.comCd] = selectedData.comCd;
	userInput.value[props.comNm] = selectedData.comNm;
}

function onInputChange() {
	showSuggestions.value = true;
	selectedIndex.value = -1;

	if (userInput.value[props.comCd].length === 0) {
		userInput.value[props.comNm] = '';
	}
}
function selectSuggestion(suggestion) {
	userInput.value[props.comCd] = suggestion[props.valueField];
	userInput.value[props.comNm] = suggestion[props.labelField];
	showSuggestions.value = false;
}
function highlightNext() {
	if (selectedIndex.value < filteredSuggestions.value.length - 1) {
		selectedIndex.value++;
	}
}
function highlightPrevious() {
	if (selectedIndex.value > 0) {
		selectedIndex.value--;
	}
}
function openSuggestions() {
	if (filteredSuggestions.value.length > 0) {
		showSuggestions.value = true;
	}
}
function closeSuggestions() {
	showSuggestions.value = false;
}
</script>

<style lang="scss" scoped>
label {
	display: block;
	margin-bottom: 4px;
}
.autocomplete {
	.input-container {
		border-radius: 4px;
		display: inline-block;
		transition: all 0.3s;
		width: 50%;
		@at-root {
			input {
				width: 100%;
				font-size: 13px;
				padding-left: 8px;
				background: #fff url(/images/ico-16-search.svg) no-repeat center right
					8px;
			}
		}
		& + input {
			margin-left: 8px;
			width: 50%;
			background: #fff;
		}
	}
}

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
	width: calc(50% - 2px);
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

.suggestion-row {
	display: flex;
	gap: 12px;
	font-size: 14px;
	span {
		font-size: 12px;
		color: var(--finput-disabled-text);
		margin-right: 4px;
	}
}
</style>
