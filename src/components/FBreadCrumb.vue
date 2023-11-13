<!--------------------------------------------------------------------
	파일   : FBreadCrumb.vue
	작성   : CJ Developer
	설명	 : [공통] 메뉴타이틀 내 상위 메뉴를 나타내는 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="bread-crumb">
		<ul>
			<li v-for="level in levelList" :key="level">
				{{ level[labelField] }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import router from '@/routes';
import useMenuStore from '@/stores/menuStore';

const props = defineProps({
	levels: {
		type: Array,
		default: null,
	},
	labelField: {
		type: String,
		default: 'menuNm',
	},
});

const menuStore = useMenuStore();
const currentRoute = router.currentRoute.value.meta;

const levelList = computed(
	() => props.levels ?? menuStore.findHierachy(currentRoute),
);
</script>

<style lang="scss" scoped>
.bread-crumb {
	ul {
		display: flex;
		gap: 6px;
		li {
			color: var(--bread-crumb-color);
			font-size: 13px;
			&::before {
				content: '<';
				margin-right: 4px;
			}
		}
	}
}
</style>
