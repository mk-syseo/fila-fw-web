<!--------------------------------------------------------------------
	파일   : Buttons.vue
	작성   : CJ Developer
	설명	 : [공통] 버튼 컴포넌트 사용 예제
---------------------------------------------------------------------->
<template>
	<div>
		<!-- <div style="margin: 15px 20px 30px">
			<h2>PreLoader</h2>
			<div
				style="
					display: flex;
					gap: 20px;
					margin: 10px 0;
					padding: 20px;
					border: 1px solid #999;
					border-radius: 10px;
				"
			>
				<div class="preloader"></div>
			</div>
			<div
				style="
					display: flex;
					gap: 20px;
					margin: 10px 0;
					padding: 20px;
					border: 1px solid #333;
					background: #333;
					border-radius: 10px;
				"
			>
				<div class="preloader dark"></div>
			</div>
		</div>

		<h1>Top 버튼 : 28 사이즈</h1>

		<div style="display: flex; gap: 4px">
			<div
				style="display: flex; align-items: center; gap: 4px; padding-left: 10px"
			>
				<label class="btn-fav">
					<input type="checkbox" />
				</label>
				<span style="font-size: 12px">즐겨찾기 : 체크박스임</span>
			</div>
		</div>
		<br />

		<div style="display: flex; gap: 4px">
			<div
				style="display: flex; align-items: center; gap: 4px; padding-left: 10px"
			>
				<label class="btn-pin">
					<input type="checkbox" />
				</label>
				<span style="font-size: 12px">핀고정 : 체크박스임</span>
			</div>
		</div>
		<br /> -->

		<!-- 기본 -->
		<FCodeBox example="button/Basic">
			<template #description>
				<h1>기본 버튼</h1>
				버튼 컴포넌트입니다. primary 옵션 사용 시 버튼 배경색이 변경되고, size
				옵션 부여 시 크기가 변경됩니다. size는 default(기본)와 large 옵션이
				존재합니다.
			</template>

			<template #demo>
				<BasicButton style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<!-- 12, 28사이즈 -->
		<FCodeBox example="button/Size">
			<template #description>
				<h1>사이즈별 버튼</h1>
			</template>

			<template #demo>
				<Size style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<!-- 아이콘 -->
		<FCodeBox example="button/Icon">
			<template #description>
				<h1>아이콘</h1>
				버튼 컴포넌트에 아이콘 사용 시 예제입니다.
			</template>

			<template #demo>
				<Icon style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<!-- 텍스트 + 아이콘 -->
		<FCodeBox example="button/TextIcon">
			<template #description>
				<h1>텍스트와 아이콘</h1>
			</template>

			<template #demo>
				<TextIcon style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<!-- 아이콘 리스트 -->
		<FCodeBox example="button/IconBox">
			<template #description>
				<h1>아이콘 리스트</h1>
			</template>

			<template #demo>
				<IconBox style="display: flex; gap: 10px; align-items: center" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import BasicButton from '~/codebox/button/Basic.vue';
import Size from '~/codebox/button/Size.vue';

import Icon from '~/codebox/button/Icon.vue';
import IconBox from '~/codebox/button/IconBox.vue';
import TextIcon from '~/codebox/button/TextIcon.vue';

const properties = [
	{
		property: 'id',
		desc: '버튼의 id 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'name',
		desc: '버튼의 name 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'disabled',
		desc: '버튼의 활성화 상태를 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'size',
		desc: '버튼의 크기를 변경합니다',
		type: 'String',
		default: "'default'",
		required: '',
		option: "'default' | 'large'",
	},
	{
		property: 'primary',
		desc: '버튼을 primary색으로 변경합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'text',
		desc: '버튼의 Border를 제거합니다',
		type: 'Boolean',
		default: 'false',
		required: '',
		option: '',
	},
	{
		property: 'icon',
		desc: '버튼의 아이콘을 지정합니다. 아이콘의 위치는 public/images에 위치해야하며 파일명만 입력합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'ext',
		desc: '아이콘 확장자를 지정합니다',
		type: 'String',
		default: "'svg'",
		required: '',
		option: '',
	},
	{
		property: 'shortKey',
		desc: '오픈 예정',
		type: '',
		default: '',
		required: '',
		option: '',
	},
];
</script>

<script>
export default {
	data() {
		return {
			isActive: false,
		};
	},
	methods: {
		bgMode: function () {
			this.isActive = !this.isActive;
			// some code to filter users
		},
	},
};
</script>
