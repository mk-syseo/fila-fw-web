<!-- 
	*************************************************************
	파일명	: TwoInput.vue
	설명		: [공통] TwoInput 아이콘
	메뉴		: 공통 컴포넌트
	*************************************************************
-->
<template>
	<div>
		<label v-if="label">{{ label }} </label>
		<input
			:id="id"
			:value="modelValue"
			:name="name"
			@input="$emit('update:modelValue', $event.target.value)"
		/>

		<input
			:id="idSecond"
			:value="modelValueSecond"
			:name="nameSecond"
			@input="$emit('update:modelValueSecond', $event.target.value)"
		/>
	</div>
</template>

<script setup>
/**
 * Propss
 */
const props = defineProps({
	// Value Setting
	modelValue: {
		type: String,
	},
	label: {
		type: String,
	},
	id: {
		type: String,
	},
	name: {
		type: String,
	},
	modelValueSecond: {
		type: String,
	},
	idSecond: {
		type: String,
	},
	nameSecond: {
		type: String,
	},
});

defineEmits(['update:modelValue', 'update:modelValueSecond']);
</script>

<style lang="scss" scoped>
/* 각 input 요소의 CSS 스타일을 설정합니다. */
input {
	margin-right: 10px; /* 입력 요소 사이의 간격을 조정합니다. */
	font-size: 13px;
	padding: 0 8px;
}
label {
	margin-right: 6px;
}
</style>
