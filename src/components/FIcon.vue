<!--------------------------------------------------------------------
	파일   : FIcon.vue
	작성   : CJ Developer
	설명	 : [공통] 아이콘 컴포넌트
---------------------------------------------------------------------->
<template>
	<img :src="getImageUrl()" />
</template>

<script setup>
import { getTheme } from '@/stores/cookie';

const theme = getTheme();
const props = defineProps({
	icon: {
		type: String,
		required: true,
	},
	ext: {
		type: String,
		default: 'svg',
	},
	mode: {
		type: String,
		default: 'default',
		validator: value => {
			return ['default', 'dark', 'light'].includes(value);
		},
	},
});

function getImageUrl() {
	switch (theme) {
		case 'dark':
		case 'light':
			return `${import.meta.env.VITE_URL}/images/${props.icon}-${theme}.${
				props.ext
			}`;
		default:
			return `${import.meta.env.VITE_URL}/images/${props.icon}.${props.ext}`;
	}
}
</script>
