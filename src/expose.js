/**
 * 호스트 프로젝트(portal)에 노출하기 위한 설정
 */
import fs from 'fs';

const expose = {
	'./routes': './src/routes/index.js',
	'./axios': './src/plugins/axios.js',
	'./lang': './src/lang/index.js',
	// './useLocalStorage': './src/utils/useLocalStorage.js',
};

/**
 * 하위 모든 디렉토리 반환
 */

function readDirectory(directory, initDirectory, type) {
	fs.readdirSync(directory).forEach(file => {
		if (file.endsWith(type)) {
			const division = directory.split('/').pop();
			expose[`./${division}/${file.split('.')[0]}`] = `${directory}/${file}`;
		} else {
			if (
				file.endsWith('js') ||
				file.endsWith('vue') ||
				file.endsWith('json')
			) {
				return;
			} else {
				readDirectory(`${directory}/${file}`, initDirectory, type);
			}
		}
	});
}

readDirectory('./src/views', './src/views', '.vue');
readDirectory('./src/views/sysmgt', './src/views/sysmgt', '.vue');

readDirectory('./src/components', './src/components', '.vue');
readDirectory('./src/utils', './src/utils', '.js');
readDirectory('./src/plugins', './src/plugins', '.js');

// console.log('expose', expose);

export default expose;
