<!--------------------------------------------------------------------
	파일   : FButton.vue
	작성   : CJ Developer
	설명	 : [공통] 버튼 컴포넌트
---------------------------------------------------------------------->
<template>
	<!-- <button v-shortkey.once="shortKey.key" @shortkey="shortKey.func">
		{{ name }}
	</button> -->
	<button
		:id="id"
		:name="name"
		:class="{
			primary: primary,
			large: size === 'large',
			'text-only': text,
			darkMode: theme === 'dark',
			light: theme === 'light',
		}"
		:disabled="disabled"
	>
		<img v-if="icon" :src="getImageUrl()" />
		<slot />
	</button>
</template>

<script setup>
import { getTheme } from '@/stores/cookie';

const theme = getTheme();

const props = defineProps({
	// Basic Setting
	id: {
		type: String,
	},
	name: {
		type: String,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	// Option Setting
	size: {
		type: String,
		default: 'default', // default, large
	},
	mode: {
		type: String,
		default: 'default',
		validator: value => {
			return ['default', 'dark', 'light'].includes(value);
		},
	},
	primary: {
		type: Boolean,
		default: false,
	},
	icon: {
		type: String,
		default: null,
	},
	text: {
		type: Boolean,
		default: false,
	},
	ext: {
		type: String,
		default: 'svg',
	},
	shortKey: {
		type: Object,
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

<style lang="scss" scoped>
/* colors palette */
$black: #111;
$white: #fff;
$dark: #222427;
$gray-1: #555;
$gray-2: #777;
$gray-3: #999;
$blue-1: #002053;
$blue-2: #1951c1;
$red-1: #e1002b;
$primary-1: $blue-1;
$secondary-1: $red-1;

button {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	min-width: 48px;
	height: 28px;
	line-height: 28px;
	font-size: 13px;
	border-radius: 4px;
	padding: 0 8px 0 4px;
	color: var(--btn-text);
	border: solid 1px var(--btn-text);
	background-color: var(--btn-bg);
	transition: all 0.3s;

	&.large {
		height: 40px;
		font-size: 14px;
		font-weight: 600;
		min-width: 120px;
		height: 40px;
		line-height: 40px;
		padding: 0 16px 0 12px;
	}
	&.primary {
		color: white;
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}
	&.text-only {
		border: none;
		padding: 0;
		min-width: 28px;
	}
	&.size12 {
		height: 12px;
		width: 12px;
		line-height: 12px;
		min-width: 12px;
	}
	&.size16 {
		height: 16px;
		width: 16px;
		line-height: 16px;
		min-width: 16px;
	}
	&.size60 {
		height: 60px;
		width: 60px;
	}
	&.size50 {
		height: 50px;
		width: 50px;
	}
	&.size40 {
		height: 40px;
		width: 40px;
	}
	&.size28 {
		height: 28px;
		width: 28px;
	}
	&.w-full {
		width: 100%;
	}
}
</style>
