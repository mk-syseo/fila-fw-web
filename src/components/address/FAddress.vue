<!--------------------------------------------------------------------
	파일   : FAddress.vue
	작성   : CJ Developer
	설명	 : [공통] 행안부 주소API 호출 컴포넌트
---------------------------------------------------------------------->
<template>
	<div :id="id" class="faddress">
		<div class="faddress-content">
			<label :class="{ required: required, 'sub-required': subRequired }">
				우편번호
			</label>
			<div class="post-code">
				<FInput
					:id="postcode"
					v-model="addressInfo[postcode]"
					placeholder="우편번호"
					disabled
				/>
				<PopAddress
					popup-width="700"
					popup-height="500"
					fix-label="우편번호"
					@receive="onReceiveAddress"
				/>
				<FInput
					:id="address"
					v-model="addressInfo[address]"
					placeholder="도로명주소"
					input-width="400px"
					disabled
				/>
			</div>
		</div>

		<div class="faddress-content">
			<label>상세주소</label>
			<FInput
				:id="detail"
				v-model="addressInfo[detail]"
				placeholder="상세주소"
				input-width="500px"
				:disabled="disabled"
				:readonly="readOnly"
			/>
		</div>
	</div>
</template>

<script setup>
import FInput from '@/components/FInput.vue';
import PopAddress from '@/components/address/PopAddress.vue';

const props = defineProps({
	// Basic Setting
	modelValue: {
		type: Object,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	name: {
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
	postcode: {
		type: String,
		default: 'postcode',
	},
	address: {
		type: String,
		default: 'address',
	},
	detail: {
		type: String,
		default: 'detail',
	},
});

const emit = defineEmits(['update:modelValue']);

const addressInfo = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

function onReceiveAddress(selectAddress) {
	addressInfo.value[props.postcode] = selectAddress.zipNo; // 우편번호
	addressInfo.value[props.address] = selectAddress.roadAddr; // 도로명주소
	addressInfo.value[props.detail] = selectAddress.bdNm; // 건물명
}
</script>

<style lang="scss" scoped>
.faddress {
	.post-code {
		display: flex;
		align-items: flex-end;
		width: 100%;

		label {
			min-width: 80px;
		}

		div:first-child {
			width: 40%;
		}
		.input-box {
			width: 100%;
		}
		& + div {
			margin-top: 10px;
		}
	}

	.faddress-content {
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		label {
			min-width: 80px;
		}

		.input-box {
			width: 100%;
		}
	}
}
</style>
