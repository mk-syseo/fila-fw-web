<!--------------------------------------------------------------------
	파일   : FFile.vue
	작성   : CJ Developer
	설명	 : [공통] 업로드한 파일 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="file-uploaded">
		<!-- readOnly는 View 모드일 때-->
		<FIcon icon="ico-input-file-clip" />
		<FIcon v-if="readOnly" icon="ico-input-del" />
		<span>{{ fileName }}</span>

		<!-- -->
		<FIcon icon="ico-input-del" @click="disabled ? null : deleteFile()" />
	</div>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';

const props = defineProps({
	fileName: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	readOnly: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['delete']);

/**
 * 파일 삭제
 */
function deleteFile() {
	emit('delete', props.fileName);
}
</script>

<style lang="scss" scoped>
.file-uploaded {
	display: flex;
	gap: 4px;
	padding: 12px 0;
	span {
		font-size: 13px;
		color: #555;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: block;
		width: calc(100% - 32px);
	}
}
</style>
