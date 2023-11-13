<template>
	<transition ref="root" :name="transition">
		<div
			v-show="isActive"
			tabindex="0"
			class="vld-overlay is-active"
			:class="{ 'is-full-page': isFullPage }"
			:aria-busy="isActive"
			aria-label="Loading"
			:style="{ zIndex }"
		>
			<div class="vld-background" @click.prevent="cancel" />
			<div class="vld-icon">
				<slot name="before" />
				<slot name="default">
					<div class="preloader"></div>
				</slot>
				<slot name="after" />
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue';

export default defineComponent({
	name: 'VueLoading',
	props: {
		active: Boolean,
		programmatic: Boolean,
		container: [Object, Function, HTMLElement],
		isFullPage: {
			type: Boolean,
			default: true,
		},
		enforceFocus: {
			type: Boolean,
			default: true,
		},
		lockScroll: {
			type: Boolean,
			default: false,
		},
		transition: {
			type: String,
			default: 'fade',
		},
		/**
		 * Allow user to hide the loader
		 */
		canCancel: Boolean,
		onCancel: {
			type: Function,
			default: () => {
				return;
			},
		},
		color: String,
		backgroundColor: String,
		blur: {
			type: String,
			default: '2px',
		},
		opacity: Number,
		width: Number,
		height: Number,
		zIndex: {
			type: Number,
			default: 100,
		},
		loader: {
			type: String,
			default: 'spinner',
		},
	},
	setup(props) {
		const isActive = ref<boolean>(props.active);

		const hide = () => {
			// Timeout for the animation complete before destroying
			if (props.programmatic) {
				isActive.value = false;
				setTimeout(() => {
					return;
				}, 150);
			}
		};
		const cancel = () => {
			if (!props.canCancel || !isActive.value) return;
			hide();
			props.onCancel();
		};
		const keyUp = event => {
			if (event.keyCode === 27) {
				cancel();
			}
		};
		const disableScroll = () => {
			if (props.isFullPage && props.lockScroll) {
				document.body.classList.add('vld-shown');
			}
		};
		const enableScroll = () => {
			if (props.isFullPage && props.lockScroll) {
				document.body.classList.remove('vld-shown');
			}
		};
		onMounted(() => {
			if (props.programmatic) {
				isActive.value = true;
				document.addEventListener('keyup', keyUp);
			}
		});
		onUnmounted(() => {
			document.removeEventListener('keyup', keyUp);
		});
		watch(
			() => props.active,
			() => {
				isActive.value = props.active;
			},
		);
		watch(isActive, () => {
			if (isActive.value) {
				disableScroll();
			} else {
				enableScroll();
			}
		});
		return {
			isActive,
			hide,
			cancel,
		};
	},
});
</script>

<style lang="scss" scoped>
.vld-shown {
	overflow: hidden;
}

.vld-overlay {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	align-items: center;
	display: none;
	justify-content: center;
	overflow: hidden;
	z-index: 9999;
}

.vld-overlay.is-active {
	display: flex;
}

.vld-overlay.is-full-page {
	z-index: 9999;
	position: fixed;
}

.vld-overlay .vld-background {
	display: flex;
	gap: 20px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);

	&.dark {
		display: flex;
		gap: 20px;
		margin: 10px 0;
		padding: 20px;
		border: 1px solid #333;
		background: #333;
		border-radius: 10px;
	}
}

.vld-overlay .vld-icon,
.vld-parent {
	position: relative;
}

/* preloader */
.preloader {
	z-index: 1;
	width: 80px;
	height: 24px;
	background-image: url(/images/img-loading-light.webp);
	transform: scale(1);
	animation: play 1s steps(49) infinite;
}
.preloader {
	&.dark {
		width: 80px;
		height: 24px;
		background-image: url(/images/img-loading-dark.webp);
		transform: scale(1);
		animation: play 1s steps(49) infinite;
	}
}
</style>
