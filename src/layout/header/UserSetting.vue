<!--------------------------------------------------------------------
	파일   : FUser.vue
	작성   : CJ Developer
	설명	 : [공통] 아이콘으로 표현된 라디오 컴포넌트로 언어/테마 선택에 사용
---------------------------------------------------------------------->
<template>
	<div>
		<FRadio
			id="selected"
			v-model="selected"
			class="user-items"
			:options="options"
			@change="event => onChange(event.target.value)"
		/>
	</div>
</template>

<script setup>
import FRadio from '@/components/FRadio.vue';

import { LOCALES } from '@/utils/constCommon';
import { getTheme, setTheme } from '@/stores/cookie';
import { useLocalStorage, setLocalStorage } from '@/utils/useLocalStorage';

const props = defineProps({
	mode: {
		type: String,
		default: 'locale',
		validator: value => {
			return ['locale', 'theme'].includes(value);
		},
	},
});

// 다국어
let locales = [...LOCALES];
locales.map(locale => (locale.label = ''));

// 테마
const themes = [
	{ label: '', value: 'default' },
	{ label: '', value: 'light' },
	{ label: '', value: 'dark' },
];

// 연결데이터
const selected =
	props.mode === 'locale'
		? computed(() => useLocalStorage('user', 'locale'))
		: computed(() => getTheme());
const options = props.mode === 'locale' ? locales : themes;

function onChange(newValue) {
	switch (props.mode) {
		case 'locale':
			setLocalStorage('user', 'locale', newValue);
			break;
		case 'theme':
			setTheme(newValue);
			break;
	}
}
</script>
