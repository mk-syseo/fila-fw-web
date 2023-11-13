<template>
	<div>
		<FLayerPopup
			cancel="취소버튼"
			confirm="확인버튼"
			@confirm="onClickConfirm"
			@cancel="onClickCancel"
		>
			<FButton> 버튼명 변경 </FButton>

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
