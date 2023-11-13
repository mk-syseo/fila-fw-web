<template>
	<div class="user-alarm" :class="isAlarmToggle ? 'hide' : 'show'">
		<div class="user-alarm-title">
			<div class="user-alarm-title-item">
				<h2>알림</h2>
				<div class="total">6</div>
			</div>
			<div class="user-alarm-title-buttons">
				<FButton text @click="onClickisAlarmRead">전체 읽음처리</FButton>
				<FButton text>쪽지함</FButton>
			</div>
		</div>
		<div class="user-alarm-card">
			<div class="user-alarm-card-item" :class="isAlarmRead ? null : 'read'">
				<div class="card-item-title">
					<h5>[긴급] 프로모션 확인</h5>
					<FButton v-if="isAlarmRead" text @click="onClickisAlarmRead"
						>읽음처리</FButton
					>
					<FButton v-if="!isAlarmRead" text @click="onClickisAlarmRead"
						>읽음</FButton
					>
				</div>
				<pre>FW 신상품 할인품목 재고 부족합니다.<br/>금일 입고예정 품목 아직 안들어왔어요!!</pre>
				<div class="card-item-info">
					<div class="card-item-info-writer">필라 안성점 홍길동 매니저</div>
					<div class="card-item-info-date">2023-10-11 14:45</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
