<template>
	<div>
		<FPopSelect v-model="selectDataInfo" />
		<p>선택된 데이터는 {{ selectDataInfo }}</p>
	</div>
</template>

<script setup>
import FPopSelect from '@/components/FPopSelect.vue';

const selectDataInfo = ref({
	comGrpCd: '',
	grpCdNm: '',
});
</script>
