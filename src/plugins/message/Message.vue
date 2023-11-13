<template>
	<div class="message">
		<div class="message-container">
			<!-- <div class="message-title">
				{{ title }}
				<img src="/images/ico-24-closePop.svg" @click="onCancel" />
			</div> -->

			<div class="message-content">
				<FImage v-if="error" src="@/assets/images/error" />
				<p>
					{{ message }}
				</p>
			</div>

			<div class="message-buttons">
				<FButton @click="onCancel">취소</FButton>
				<FButton primary @click="onConfirm">확인</FButton>
				<!-- <button v-if="type === 'confirm'" @click="onCancel">취소</button>
				<button @click="onConfirm">확인</button> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import FImage from '@/components/FImage.vue';
import FButton from '@/components/FButton.vue';

const props = defineProps({
	type: {
		type: String,
		default: 'alert', // 'alert' 또는 'confirm' 사용
	},
	title: {
		type: String,
	},
	error: {
		type: Boolean,
		default: false,
	},
	message: {
		type: String,
	},
	onCancel: {
		type: Function,
	},
	onConfirm: {
		type: Function,
	},
});
</script>

<style lang="scss" scoped>
.message {
	position: fixed;
	z-index: 9999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;

	&-container {
		width: 100%;
		max-width: 280px;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		background-color: #fff;
	}

	&-title {
		display: flex;
		justify-content: space-between;
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		> img {
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				transform: rotate(90deg);
			}
		}
	}

	&-content {
		text-align: center;
		padding: 10px 0 20px 0;
		p {
			text-align: center;
		}
	}

	&-buttons {
		display: flex;
		gap: 4px;
		justify-content: center;
	}
	animation: fadeIn 0.2s linear;
}
</style>
