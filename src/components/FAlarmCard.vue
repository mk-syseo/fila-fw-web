<template>
	<div class="user-alarm-card">
		<div class="user-alarm-card-item" :class="isAlarmRead ? null : 'read'">
			<div class="card-item-title">
				<h5>{{ title }}</h5>
				<FButton v-if="isAlarmRead" text @click="onClickisAlarmRead"
					>읽음처리</FButton
				>
				<FButton v-if="!isAlarmRead" text @click="onClickisAlarmRead"
					>읽음</FButton
				>
			</div>
			<pre>{{ content }}</pre>
			<div class="card-item-info">
				<div class="card-item-info-writer">{{ caller }}</div>
				<div class="card-item-info-date">{{ callTime }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
	},
	content: {
		type: String,
	},
	caller: {
		type: String,
	},
	callTime: {
		type: String,
	},
});
</script>

<style lang="scss" scoped></style>
