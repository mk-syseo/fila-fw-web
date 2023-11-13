import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';

import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

import Pages from 'vite-plugin-pages';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite';
import federation from '@originjs/vite-plugin-federation';

import expose from './src/expose';
import sharedConfig from './src/sharedConfig';

export default ({ mode }) => {
	const remote = loadEnv(mode, './env');

	return defineConfig({
		server: {
			port: 8081,
			//필요 시 Back단으로 뺼 것
			proxy: {
				'/apitest': {
					target: 'https://www.juso.go.kr', // 원격 서버 주소
					changeOrigin: true, // 주소 변경 허용
					secure: true, // HTTPS 사용 여부에 따라 true 또는 false 설정
					rewrite: path => path.replace(/^\/apitest/, ''), // API 경로 리라이트
				},
			},
		},
		envDir: './env',
		build: {
			target: 'esnext',
			cssCodeSplit: false,
			outDir: 'dist/cm',
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('src', import.meta.url)),
				'~': fileURLToPath(new URL('public', import.meta.url)),
				'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
			},
		},
		plugins: [
			vue(),
			VueI18nPlugin({}),
			AutoImport({
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
				],
				imports: [
					// presets
					'vue',
					'vue-router',
					'vue-i18n',
				],
				vueTemplate: false,
			}),
			svgLoader(),
			// eslint(),
			federation({
				name: 'cm-app',
				filename: 'cm.js',
				exposes: expose,
				remotes: {
					// '@fila/cm': `${remote.VITE_REMOTE_CM}`,
					hr: `${remote.VITE_REMOTE_HR}`,
					fcm: `${remote.VITE_REMOTE_FCM}`,
					srm: `${remote.VITE_REMOTE_SRM}`,
					'crm-kr': `${remote.VITE_REMOTE_CRM_KR}`,
					'scm-kr': `${remote.VITE_REMOTE_SCM_KR}`,
					'pos-kr': `${remote.VITE_REMOTE_POS_KR}`,
				},
				shared: sharedConfig,
			}),
			Pages({
				dirs: [
					{ dir: 'src/views', baseRoute: '' },
					{
						dir: 'src/samples',
						baseRoute: 'samples',
					},
				],
				exclude: ['**/codebox/**'],
			}),
		],
	});
};
