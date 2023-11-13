<template>
	<div class="example">
		<div :id="id" class="example-name" @click="onClickShow">
			<p># {{ title }}</p>
			<FIcon icon="ico-16-black-new" />
		</div>

		<!-- <transition name="slide-up"> -->
		<div v-if="isShow">
			<slot />
		</div>
		<!-- </transition> -->

		<hr class="example-divider" />
	</div>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
	},
});

const isShow = ref(false);
function onClickShow() {
	isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped>
.example {
	&-name {
		font-size: 30px;
		font-weight: bold;
		color: var(--heading-text);
		margin: 20px 0;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&-divider {
		height: 1px;
		margin: 20px 0;
		background-color: var(--user-section-border-color);
	}
}

// .slide-up {
// 	transition: all 0.25s;
// }
// .slide-up-enter-active {
// 	transition: all 0.25s ease;
// }
// .slide-up-leave-active {
// 	transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
// }
// .slide-up-enter,
// .slide-up-leave-active {
// 	opacity: 0;
// 	transform: translateY(-100%);
// }
</style>
