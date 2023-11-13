<template>
	<div>
		<button @click="open">윈도우 팝업 열기</button>
	</div>
</template>

<script setup>
const props = defineProps({
	// Popup Setting
	uri: {
		type: String,
		required: true,
	},
	data: {
		type: Object,
	},
	// Position Setting
	width: {
		type: Number,
		// default: 1200, // 1920 기준
		default: 300,
	},
	height: {
		type: Number,
		// default: 800, // 1920 기준
		default: 200,
	},
});
const emit = defineEmits(['onClose', 'onReceive']);

const refWindow = ref(null);
const refContent = ref(null);

/**
 * 윈도우 팝업을 생성하는 함수
 */
function open() {
	if (refWindow.value) {
		return;
	}

	let left = screen.width ? screen.width / 2 - props.width / 2 : 360;
	let top = screen.height ? screen.height / 2 - props.height / 2 : 140;

	let attr =
		'top=' +
		top +
		', left=' +
		left +
		', width=' +
		props.width +
		', height=' +
		props.height +
		', resizable=no,status=no';

	// 1. 윈도우 팝업 생성
	refWindow.value = window.open(props.uri, '', attr);
	refWindow.value.addEventListener('beforeunload', close);

	if (refWindow.value) {
		refWindow.value.addEventListener('beforeunload', close);
	}

	// 2. 새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리
	window.addEventListener('message', receiveFromContent, true);

	console.log('WinPopup open - refContent', refContent.value);
}

/**
 * 윈도우 팝업을 종료하는 함수
 */
function close() {
	if (refWindow.value) {
		// 이벤트 해제
		refWindow.value.removeEventListener('beforeunload', close);
		window.removeEventListener('message', receiveFromContent, true);

		refWindow.value.close();
		refWindow.value = null;
		emit('onClose');
	}
}

/**
 * 팝업 내로 데이터를 전달하는 함수
 * @param {object} data
 */
function sendToContent(data) {
	if (refWindow.value && refContent.value) {
		refContent.value.receiveData(data);
	}
}

function receiveFromContent(event) {
	console.log('event.data', event.data);

	if (event.origin !== 'http://localhost:8099') {
		console.log('origin 불일치');
	}
	// let received = JSON.stringify(event.data);
	// emit('onReceive', received);
}
</script>

<style lang="scss" scoped></style>
