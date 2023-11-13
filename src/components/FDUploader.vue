<!--------------------------------------------------------------------
	파일   : FDUploader.vue
	작성   : CJ Developer
	설명	 : [공통] 드래그앤드랍 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="dnd-upload">
		<div class="dnd-upload-header">
			<h3>첨부파일</h3>
			<span>※ 파일당 최대 00MB, N개 첨부 가능</span>
		</div>
		<div
			class="dnd-upload-container mb-[6px]"
			:class="isDragged ? 'dragged' : ''"
			@dragenter="onDragEnter"
			@dragleave="onDragLeave"
			@dragover.prevent="event"
			@drop.prevent="onDrop"
		>
			<div class="dnd-upload-title">
				<p>첨부할 파일을 Drag & Drop 하세요.</p>
				<FButton @click="onUploadFile">파일찾기</FButton>
			</div>
		</div>
		<div v-if="fileList.length > 0" class="dnd-upload-list">
			<FButton
				class="mb-[6px]"
				:disabled="fileList.length < 1"
				@click="onDeleteAll"
			>
				전체삭제
			</FButton>

			<FForm form-only>
				<FFormRow class="grid-cols-5 gap-x-[10px]">
					<FFile
						v-for="file in fileList"
						:key="file.fileName"
						:file-name="file.fileName"
					>
						<FFormCol>
							{{ file.fileName }}
						</FFormCol>
					</FFile>
				</FFormRow>
			</FForm>
		</div>
		<input
			ref="refFile"
			type="file"
			class="file-upload-input"
			multiple
			@change="onChangeFile"
		/>
	</div>
</template>

<script setup>
import FFile from '@/components/FFile.vue';
import FButton from '@/components/FButton.vue';
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';

const isDragged = ref(false);

const refFile = ref(null); //
const fileList = ref([]);

/**
 *
 * @param {*} event
 */
function onDragEnter() {
	isDragged.value = true;
}

function onDragLeave() {
	isDragged.value = false;
}

function onDrop(event) {
	isDragged.value = false;
	addUploadFile(event.dataTransfer.files);
}

function onUploadFile() {
	refFile.value.click();
}

function onChangeFile(event) {
	addUploadFile(event.target.files);
	event.target.value = null;
}

/**
 *
 */
function addUploadFile(files) {
	/**
	 * TO-DO 파일 크기 제한 등 검증 필요
	 */
	Object.keys(files).map(key => {
		fileList.value.push({
			fileName: files[key].name,
			size: files[key].size,
			file: files[key],
		});
	});
}

/**
 *
 */
function onDeleteAll() {
	console.log('onDeleteAll');
}

/**
 * 선택한 파일만 제거
 * @param {number} index
 */
function onDeleteFile(index) {
	fileList.value.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.dnd-upload {
	button {
		padding: 0 8px;
	}
	&-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		// :disabled {
		// 	cursor: not-allowed;
		// }
		span {
			color: #e1002b;
			font-size: 13px;
		}
	}

	&-container {
		width: 100%;
		height: 160px;
		border-radius: 12px;
		background-color: #f4f4f6;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&.dragged {
			border: 2px dashed #ccc;
		}
	}
	&-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		p {
			font-size: 14px;
			color: #111;
		}
	}
}

input[type='file'] {
	display: none;
}

.dnd-upload {
	&.dragged {
		border: 1px dashed powderblue;
		opacity: 0.6;
	}
}
</style>
