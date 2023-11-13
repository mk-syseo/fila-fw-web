<!--------------------------------------------------------------------
	파일   : Etc.vue
	작성   : CJ Developer
	설명	 : [공통] 이메일 등 기타 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 자동완성 및 팝업 -->
		<FCodeBox example="etc/AutoComplete">
			<template #description>
				<h1>자동완성</h1>
				자동완성 컴포넌트입니다.
			</template>

			<template #demo>
				<AutoComplete />
			</template>
		</FCodeBox>

		<!-- 팝업 -->
		<FCodeBox example="popselect/PopSelect">
			<template #description>
				<h1>팝업</h1>
				팝업
			</template>

			<template #demo>
				<PopSelect />
			</template>
		</FCodeBox>
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';

import AutoComplete from '~/codebox/etc/AutoComplete.vue';
import PopSelect from '~/codebox/popselect/PopSelect.vue';
</script>
