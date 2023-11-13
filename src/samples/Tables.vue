<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="table/Basic">
			<template #description>
				<h1>기본 테이블</h1>
				테이블 컴포넌트입니다.
			</template>

			<template #demo>
				<Basic style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import Basic from '~/codebox/table/Basic.vue';
</script>
