import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

import App from '@/App.vue';
import './style.css';

import i18n from '@/lang';
import router from '@/routes';
import axios from '@/plugins/axios';
import VueCookies from 'vue-cookies';

// CodeEditor
import hljs from 'highlight.js';
import CodeEditor from 'simple-code-editor';

createApp(App)
	// Plugins
	.use(createPinia().use(piniaPersist))
	.use(router)
	.use(axios)
	.use(i18n)
	.use(VueCookies, {
		expireTimes: '30d',
		secure: true,
	})
	// Component
	.component('CodeEditor', CodeEditor)
	.mount('#app');
