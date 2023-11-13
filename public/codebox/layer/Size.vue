<template>
	<div>
		<FLayerPopup size="small" @confirm="onClickConfirm">
			<FButton> 스몰사이즈 </FButton>

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

		<FLayerPopup size="large" @confirm="onClickConfirm">
			<FButton> 라지사이즈 </FButton>

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

		<FLayerPopup width="1024" height="960" @confirm="onClickConfirm">
			<FButton> 커스텀사이즈 </FButton>

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
</script>
