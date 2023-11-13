<template>
	<label v-if="label">{{ label }}</label>
	<div class="autocomplete">
		<div class="input-container">
			<input
				v-model="userInput"
				type="text"
				@input="onInputChange"
				@keydown.down="highlightNext"
				@keydown.up="highlightPrevious"
				@keydown.enter="selectSuggestion"
				@click="openSuggestions"
			/>
		</div>
		<input v-model="viewText" type="text" disabled />
		<table v-if="showSuggestions" class="suggestions">
			<tbody>
				<tr
					v-for="(suggestion, index) in filteredSuggestions"
					:key="index"
					:class="{ active: index === selectedIndex }"
				>
					<td
						v-for="propertyName in Object.keys(suggestion)"
						:key="propertyName"
						@click="() => selectSuggestion(suggestion)"
					>
						{{ suggestion[propertyName] }}
					</td>
					<td>
						<!-- 추가 동적으로 생성되는 td 요소 -->
					</td>

					<!-- 
					<td @click="() => selectSuggestion(suggestion)">
						{{ suggestion.label }}
					</td>
					<td @click="() => selectSuggestion(suggestion)">
						{{ suggestion.comCd }}
					</td>
					<td @click="() => selectSuggestion(suggestion)">
						{{ suggestion.comNm }}
					</td> -->
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
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
	viewText: {
		type: String,
		default: '',
	},
	showSuggestions: {
		type: Boolean,
		defautl: false,
	},
	selectedIndex: {
		type: Number,
		defautl: -1,
	},
	label: {
		type: String,
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

const viewText = ref(props.viewText);
const showSuggestions = ref(props.showSuggestions);
const selectedIndex = ref(props.selectedIndex);

const filteredSuggestions = computed(() => {
	return props.suggestions.filter(
		suggestion =>
			suggestion[props.labelField]
				.toString()
				.toLowerCase()
				.includes(
					userInput.value === undefined || userInput.value === ''
						? ''
						: userInput.value.toString().toLowerCase(),
				) ||
			suggestion[props.valueField]
				.toString()
				.toLowerCase()
				.includes(
					userInput.value === undefined || userInput.value === ''
						? ''
						: userInput.value.toString().toLowerCase(),
				),
	);
});

function onInputChange() {
	showSuggestions.value = true;
	selectedIndex.value = -1;

	if (userInput.value.length === 0) {
		viewText.value = '';
	}
}
function selectSuggestion(suggestion) {
	userInput.value = suggestion[props.valueField];
	viewText.value = suggestion[props.labelField];
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
	position: relative;
	display: flex;
	align-items: flex-end;
	width: 100%;
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

table.suggestions {
	list-style-type: none;
	padding: 0;
	margin: 4px 0 0 0;
	position: absolute;
	top: 28px;
	border-radius: 4px;
	background-color: #fff;
	width: 100%;
	z-index: 1;
	border-collapse: collapse;
	border-style: hidden;
	box-shadow: 0 0 0 1px #002053;
	tr {
		cursor: pointer;
		transition: background-color 0.3s;
		&.active {
			background-color: #1e90ff;
			color: #fff;
		}
		&:hover {
			background-color: #eff4fb;
		}
		th,
		td {
			padding: 8px;
			text-align: left;
			font-size: 13px;
			&:first-child {
				border-radius: 4px 0 0 4px;
			}
			&:last-child {
				border-radius: 0 4px 4px 0;
			}
		}
	}
}
</style>
