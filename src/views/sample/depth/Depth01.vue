<template>
	<div>
		<FButton @click="onClickButton">버튼테스트</FButton>
		<p>현재 값은 {{ cmButton }}</p>
	</div>
</template>

<script setup>
const cmButton = ref(false);

function onClickButton() {
	cmButton.value = !cmButton.value;
}
</script>

<style lang="scss" scoped></style>
