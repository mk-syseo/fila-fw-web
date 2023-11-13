<template>
	<div class="card-wrapper">
		<slot />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card-wrapper {
	box-shadow:
		0px 3px 3px -2px rgba(0, 0, 0, 0.2),
		0px 3px 4px 0px rgba(0, 0, 0, 0.14),
		0px 1px 8px 0px rgba(0, 0, 0, 0.12);

	padding: 20px;
}
</style>
