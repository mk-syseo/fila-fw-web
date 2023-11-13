<!--------------------------------------------------------------------
	파일   : Uploaders.vue
	작성   : CJ Developer
	설명	 : [공통] 파일업로드 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- 기본 -->
		<FCodeBox example="upload/Basic">
			<template #description>
				<h1>기본 업로드</h1>
				파일업로드 컴포넌트입니다. 아직 개발중입니다...
			</template>

			<template #demo>
				<Basic />
			</template>
		</FCodeBox>

		<!-- 드래그앤드랍 -->
		<FCodeBox example="upload/Dnd">
			<template #description>
				<h1>드래그앤드랍 업로드</h1>
				드래그앤드랍 파일업로드 컴포넌트입니다. 아직 개발중입니다...
			</template>

			<template #demo>
				<Dnd />
			</template>
		</FCodeBox>
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';

import Basic from '~/codebox/upload/Basic.vue';
import Dnd from '~/codebox/upload/Dnd.vue';
</script>
