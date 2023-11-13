<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="flag/Basic">
			<template #description>
				<h1>플래그</h1>
				플래그를 나타냅니다. 스타일 추가가 필요한 경우 담당자에게 문의해주세요.
			</template>

			<template #demo>
				<BasicFlag style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import BasicFlag from '~/codebox/flag/Basic.vue';

const properties = [];
</script>
