<template>
	<div>
		<FLayerPopup cancel @confirm="onClickConfirm" @cancel="onClickCancel">
			<FButton> 취소버튼이 있는 레이어팝업 </FButton>

			<template #header>
				<h2>모달 헤더</h2>
			</template>

			<template #body>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
				<p>모달 콘텐츠</p>
			</template>

			<template #footer> 푸터 필요 시 넣어주세요 </template>
		</FLayerPopup>
	</div>
</template>

<script setup>
import FButton from '@/components/FButton.vue';
import FLayerPopup from '@/components/FLayerPopup.vue';

function onClickConfirm() {
	console.log('click confirm');
}

function onClickCancel() {
	console.log('click cancel');
}
</script>
