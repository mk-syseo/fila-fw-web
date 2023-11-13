<template>
	<div>
		<FForm id="searchForm" v-model="searchForm" search>
			<FFormRow is-grid-cols="2">
				<FFormCol>
					<FInput
						id="comGrpCd"
						v-model="searchForm.comGrpCd"
						label="그룹코드"
						placeholder="그룹코드를 입력하세요"
					/>
				</FFormCol>
				<FFormCol>
					<FInput
						id="grpCdNm"
						v-model="searchForm.grpCdNm"
						label="그룹명"
						placeholder="그룹명을 입력하세요"
					/>
				</FFormCol>
			</FFormRow>
		</FForm>
	</div>
</template>

<script setup>
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';

import FInput from '@/components/FInput.vue';

const { t } = useI18n();
const searchForm = ref({ comGrpCd: '', grpCdNm: '' });
</script>
