/**
 * Axios Function
 */
import axios from 'axios';
import commonUtils from '@/utils/commonUtils';
import { useMessage } from '@/plugins/message/message';

class apiCall {
	static checkParam(params) {
		let message = useMessage();
		if (!commonUtils.checkGetReqParam(params)) {
			message.showAlert({
				message: '사용불가 문자가 있습니다.',
			});
			return;
		}
	}
	static get(url, params) {
		// if(this.checkParam(params)) {
		// 	return axios.get(url, { params });
		// }
		return axios.get(url, { params });
	}

	static post(url, params) {
		// if (this.checkParam(params)) {
		// 	return axios.post(url, params);
		// }

		return axios.post(url, params);
	}

	static fileDownload(url, params) {
		// if (this.checkParam(params)) {
		// 	axios.defaults.headers.post['Content-Type'] =
		// 		'application/x-www-form-urlencoded';
		// 	axios.defaults.responseType = 'blob';
		// 	axios.defaults.params = params;

		// 	return axios.post(url);
		// }

		axios.defaults.headers.post['Content-Type'] =
			'application/x-www-form-urlencoded';
		axios.defaults.responseType = 'blob';
		axios.defaults.params = params;

		return axios.post(url);
	}
}

export default apiCall;
