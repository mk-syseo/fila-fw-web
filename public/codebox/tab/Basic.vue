<template>
	<div>
		<Tabs>
			<Tab title="예제1">
				<p>예제1번 컴포넌트 화면</p>
				<FInput id="example1" v-model="example1" />
				<p>example value is {{ example1 }}</p>
			</Tab>
			<Tab title="예제2">
				<FInput id="example2" v-model="example2" />
				<p>example value is {{ example2 }}</p>
			</Tab>
		</Tabs>
	</div>
</template>

<script setup>
import Tabs from '@/components/tab/FTabs.vue';
import Tab from '@/components/tab/FTab.vue';

import FInput from '@/components/FInput.vue';

const example1 = ref('');
const example2 = ref('');
</script>
