<!--------------------------------------------------------------------
	파일   : FEmail.vue
	작성   : CJ Developer
	설명	 : [공통] 이메일 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="email">
		<label
			v-if="label"
			:class="{ required: required, 'sub-required': subRequired }"
			>{{ label }}
		</label>
		<div class="email-box">
			<input
				:id="id"
				:value="emailId"
				:disabled="disabled"
				:readonly="readOnly"
				@input="emailId = $event.target.value"
			/>
			<label for="email-divide">@</label>
			<FSelect
				:id="id"
				v-model="emailCompany"
				:options="options"
				:disabled="disabled"
				:readonly="readOnly"
				@input="emailCompany = $event.target.value"
			/>
		</div>
	</div>
</template>

<script setup>
import FSelect from '@/components/FSelect.vue';

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
});

const emit = defineEmits(['update:modelValue']);

const options = ref([
	/* 	{
		value: '',
		label: direct,
	}, */
	{
		value: 'paran.com',
		label: 'paran.com',
	},
	{
		value: 'hanmir.com',
		label: 'hanmir.com',
	},
	{
		value: 'freechal.com',
		label: 'freechal.com',
	},
	{
		value: 'lycos.co.kr',
		label: 'lycos.co.kr',
	},
	{
		value: 'korea.com',
		label: 'korea.com',
	},
	{
		value: 'hanmail.net',
		label: 'hanmail.net',
	},
	{
		value: 'nate.com',
		label: 'nate.com',
	},
	{
		value: 'natian.com',
		label: 'natian.com',
	},
	{
		value: 'naver.com',
		label: 'naver.com',
	},
	{
		value: 'unitel.co.kr',
		label: 'unitel.co.kr',
	},
	{
		value: 'gmail.com',
		label: 'gmail.com',
	},
	{
		value: 'cholian.net',
		label: 'cholian.net',
	},
]);

const emailId = ref(props.modelValue.split('@')[0] ?? '');
const emailCompany = ref(props.modelValue.split('@')[1] ?? '');

const completeEmail = computed(() => emailId.value + '@' + emailCompany.value);

watch([emailId, emailCompany], () => {
	emit('update:modelValue', completeEmail.value);
});
</script>

<style lang="scss" scoped>
.email {
	.email-box {
		display: flex;
		align-items: center;
		gap: 6px;
		> input,
		.fSelect {
			width: 100%;
		}
		> input {
			font-size: 13px;
			padding-left: 8px;
			box-sizing: border-box;
		}
	}
}
</style>
