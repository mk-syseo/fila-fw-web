<template>
	<LNBLayout :is-menu="isMenu">
		<div class="page-wrap">
			<RouterView v-slot="{ Component }">
				<!-- <KeepAlive :include="cachedTabs"> -->
				<component :is="Component" :key="$route.params.page" />
				<!-- </KeepAlive> -->
			</RouterView>
			<!-- [중복 탭] 수정 -->
			<!-- <component :is="Component" :key="$route.query.page" /> -->
		</div>
	</LNBLayout>
</template>

<script setup>
import LNBLayout from '@/layout/LNBLayout.vue';
import useMenuStore from '@/stores/menuStore';

const isMenu = ref(false);
// const cachedTabs = computed(() => useMenuStore().openedTabs);

/**
 * 정보 조회
 */
onMounted(() => {
	initData();
});

/**
 * 초기값 설정 : user, menu
 */
async function initData() {
	// 메뉴 적용 뒤 화면 Open
	if (useMenuStore().menuTree.children) {
		isMenu.value = true;
	}
}
</script>

<style lang="scss" scoped>
.page-wrap {
	padding: 16px 20px;
	height: calc(100vh - 93px);
	display: flex;
	flex-direction: column;
	gap: 16px;
	overflow-y: auto;
	overflow-x: auto;
	&:has(.home-wrap) {
		background-color: var(--main-background);
		padding: 32px 34px 20px 34px;
	}
	&:has(.splitpanes) {
		/* padding: 0; */
	}
}
</style>
