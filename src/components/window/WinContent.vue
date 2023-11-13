<template>
	<div>
		내용들
		<slot />

		<button type="button" @click="sendToParent">호스트로 이벤트 보내기</button>
	</div>
</template>

<script setup>
// 호스트의 refContent에 현재 정보
if (opener) {
	opener.refContent = getCurrentInstance();
}

function sendToParent(data) {
	if (opener) {
		const sendData = JSON.stringify(data ?? { sample: 'ghdlt' });
		window.opener.postMessage(sendData, '*');
		console.log('sendData end');
	}
}

function receiveData(data) {
	console.log('WinContent receiveData', data);
}

defineExpose({ sendToParent });
</script>

<style lang="scss" scoped></style>
