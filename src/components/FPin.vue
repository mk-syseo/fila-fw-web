<template>
	<label :class="{ 'btn-pin': true, on: on }">
		<input type="checkbox" />
	</label>
</template>

<script setup>
const props = defineProps({
	on: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
.btn-pin {
	height: 28px;
	width: 20px;
	position: relative;
	cursor: pointer;
	input[type='checkbox'] {
		height: inherit;
		position: absolute;
		left: -9999px;
		opacity: 0;
	}
	&:before,
	&:after {
		content: '';
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		width: 20px;
		height: 28px;
		transition: all 0.2s;
	}
	&:before {
		background: url(/images/ico-20-pin.svg) no-repeat center;
	}
	&:after {
		background: url(/images/ico-20-pinOn.svg) no-repeat center;
		opacity: 0;
	}
	&.on,
	&:has(input[type='checkbox']:checked) {
		&:after {
			opacity: 1;
		}
	}
}
</style>
