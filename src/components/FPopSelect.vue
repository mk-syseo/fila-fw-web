<!--------------------------------------------------------------------
	파일   : FPopSelect.vue
	작성   : CJ Developer
	설명	 : [공통] 팝업 Select
---------------------------------------------------------------------->
<template>
	<label v-if="label">{{ label }}</label>
	<div class="autocomplete">
		<div class="finb">
			<FInput
				id="inputText"
				v-model="selectDataInfo[comGrpCd]"
				placeholder=""
			/>
			<PopSelect
				fix-label="그룹"
				popup-width="700"
				popup-height="600"
				@receive="onReceiveData"
			/>
		</div>
		<FInput
			v-model="selectDataInfo[grpCdNm]"
			placeholder=""
			type="text"
			disabled
		/>
	</div>
</template>

<script setup>
import FInput from '@/components/FInput.vue';
import PopSelect from '@/components/PopSelect.vue';

const props = defineProps({
	modelValue: {
		type: Object,
	},
	comGrpCd: {
		type: String,
		default: 'comGrpCd',
	},
	grpCdNm: {
		type: String,
		default: 'grpCdNm',
	},

	disabled: {
		type: Boolean,
		default: false,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:modelValue']);

const selectDataInfo = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

function onReceiveData(selectData) {
	selectDataInfo.value[props.comGrpCd] = selectData.comGrpCd; // 우편번호
	selectDataInfo.value[props.grpCdNm] = selectData.grpCdNm; // 도로명주소
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
