export function useWindowContent() {
	const windowContent = {
		setUp() {
			if (opener) {
				opener.refContent = getCurrentInstance();
				console.log('setUp - opener', opener);
			}
		},
		sendToParent(data) {
			if (opener) {
				const sendData = JSON.stringify(data ?? { sample: 'ghdlt' });
				window.opener.postMessage(sendData, '*');
				console.log('sendData end');
			}
		},
		receiveData(data) {
			console.log('WinContent receiveData', data);
		},
	};

	return windowContent;
}
