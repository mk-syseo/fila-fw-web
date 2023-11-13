<template>
	<div>
		<FLayerPopup @confirm="onClickConfirm">
			기본 레이어팝업

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

			<template #footer>
				<div class="layout-left">
					<FCheckbox
						id="checkBoxSeveral"
						v-model="checkBoxSeveral"
						:options="processedOptions"
						name="checkboxName1"
						value-field="comCd"
						label-field="comNm"
					/>
				</div>
			</template>
		</FLayerPopup>
	</div>
</template>

<script setup>
import FLayerPopup from '@/components/FLayerPopup.vue';
import FCheckbox from '@/components/FCheckbox.vue';

function onClickConfirm() {
	console.log('click confirm');
}

const checkBoxSeveral = ref([]);
const options = ref([
	{
		comCd: '001',
		comNm: '다시 보지 않기',
	},
]);

const processedOptions = options; // 동적으로 처리된 options prop
</script>
