<template>
	<div>
		<FForm form-only>
			<FFormRow class="grid-cols-1">
				<FFormCol>
					<div class="file-upload">
						<label for="file-id">파일찾기</label>
						<input
							id="file-id"
							ref="refFile"
							type="file"
							multiple
							@change="event => onChangeFile(event.target.files)"
						/>
						<span>※ 파일당 최대 00MB, N개 첨부 가능</span>
					</div>
				</FFormCol>
			</FFormRow>
		</FForm>
		<FForm form-only>
			<FFormRow class="grid-cols-10 gap-x-[10px]">
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
</template>

<script setup>
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';
import FFile from '@/components/FFile.vue';

const refFile = ref(null);
const fileList = ref([]);

/**
 *
 * @param {*} e
 */
function onChangeFile(files) {
	Object.keys(files).map(key => {
		fileList.value.push({
			fileName: files[key].name,
			size: files[key].size,
			file: files[key],
		});
	});
}
</script>

<style lang="scss" scoped>
.file-upload {
	display: flex;
	align-items: center;
	justify-content: space-between;
	label {
		padding: 4px 8px;
		border-radius: 4px;
		color: #002053;
		border: solid 1px #002053;
		background-color: #fff;
		margin: 0;
		font-size: 13px;
	}
	span {
		color: #e1002b;
		font-size: 13px;
	}
	input[type='file'] {
		display: none;
	}
}
</style>
