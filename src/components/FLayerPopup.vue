<!--------------------------------------------------------------------
	파일   : FLayerPopup.vue
	작성   : CJ Developer
	설명	 : [공통] 레이어 팝업 컴포넌트
---------------------------------------------------------------------->
<template>
	<div @click="open">
		<slot />
	</div>

	<Teleport to="body" :disabled="!visible">
		<div v-if="visible" class="modal-overlay">
			<div
				class="modal"
				:style="{ width: `${popupWidth}px`, height: `${popupHeight}px` }"
			>
				<div class="modal-header">
					<div>
						<slot name="header" />
					</div>
					<FIcon icon="ico-24-closePop" @click="close" />
				</div>

				<div class="modal-body">
					<slot name="search" />
					<slot name="body" />
				</div>

				<div class="modal-footer">
					<slot name="footer" />

					<div class="btn-area">
						<FButton v-if="cancel" size="large" @click="onClickCancel">
							{{ typeof cancel === 'boolean' ? '취소' : cancel }}
						</FButton>
						<FButton
							v-if="confirm"
							size="large"
							primary
							@click="onClickConfirm"
						>
							{{ typeof confirm === 'boolean' ? '확인' : confirm }}
						</FButton>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';
import FButton from '@/components/FButton.vue';

const props = defineProps({
	width: {
		type: String,
		default: '480',
	},
	height: {
		type: String,
		default: '320',
	},
	size: {
		type: String,
	},
	cancel: {
		type: [Boolean, String],
		default: false,
	},
	confirm: {
		type: [Boolean, String],
		default: true,
	},
	onCancel: {
		type: Function,
		default: () => {},
	},
	onConfirm: {
		type: Function,
		default: () => {},
	},
});

const popupWidth = computed({
	get() {
		switch (props.size) {
			case 'small':
				return 480;
			case 'large':
				return 1024;
			default:
				return props.width;
		}
	},
});

const popupHeight = computed({
	get() {
		switch (props.size) {
			case 'small':
				return 480;
			case 'large':
				return 1024;
			default:
				return props.height;
		}
	},
});

const visible = ref(false);

/**
 * LayerPopup을 여는 함수
 */
const open = () => {
	visible.value = true;
};

/**
 * LayerPopup을 닫는 함수
 */
const close = () => {
	visible.value = false;
};

const emit = defineEmits(['cancel', 'confirm']);

async function onClickCancel() {
	emit('cancel');
	close();
}

async function onClickConfirm() {
	emit('confirm');
	close();
}

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
/* Modla */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;

	background-color: rgba(0, 0, 0, 0.5); /* 반투명 레이어 */
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn 0.2s linear;
	.modal {
		position: relative;
		padding: 24px;
		border-radius: 16px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		background-color: #fff;
		overflow: auto !important;
		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			> h2 {
				font-size: 20px !important;
				font-weight: 700 !important;
			}
			> img {
				cursor: pointer;
				transition: all 0.3s;
				&:hover {
					transform: rotate(90deg);
				}
			}
		}
		&-body {
			height: calc(100% - 116px);
			margin-top: 20px;
			overflow: auto;
		}
		&-footer {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			left: 0;
			bottom: 24px;
			width: 100%;
			.btn-area {
				display: flex;
				align-items: center;
				gap: 8px;
			}
			&:has(.layout-left) {
				justify-content: space-between;
				padding: 0 20px;
				.btn-area {
					button.large {
						font-size: 13px;
						height: 28px;
						line-height: 28px;
						min-width: 48px;
						padding: 0 13px 0 10px;
					}
				}
			}
		}
	}
}
</style>
