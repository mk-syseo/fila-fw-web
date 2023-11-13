<!--------------------------------------------------------------------
	파일   : FForm.vue
	작성   : CJ Developer
	설명	 : [공통] 폼 컴포넌트
---------------------------------------------------------------------->
<template>
	<form
		v-if="!toggle"
		:id="id"
		ref="refForm"
		:name="name"
		:class="{
			'p-[4px]': search,
			search: search,
			close: toggle === true,
			open: toggle === false,
			'tab-in': search === 'in-tab',
			vertical: vertical,
		}"
		@submit.prevent="onSubmit"
	>
		<slot />
	</form>

	<!-- Toggle -->
	<div
		v-if="!formOnly"
		class="h-[1px] relative search-toggle-btn"
		:class="{ close: toggle, open: !toggle, 'tab-in': search === 'in-tab' }"
	>
		<button class="toggle-btn" @click="onToggle">
			<span></span>
		</button>
	</div>
</template>

<script setup>
import validator from '@/utils/validator';

const props = defineProps({
	// Basic Setting
	modelValue: {
		type: null,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	// Option Setting
	search: {
		type: [Boolean, String],
		default: false,
	},
	vertical: {
		type: Boolean,
		default: false,
	},
	formOnly: {
		type: Boolean,
		default: false,
	},
	submit: {
		type: Function,
	},
});

const emit = defineEmits(['update:modelValue']);

const values = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

const toggle = ref(false);

/**
 * Toggle
 */
function onToggle() {
	toggle.value = !toggle.value;

	const timer = setInterval(() => {
		window.dispatchEvent(new Event('resize'));
	}, 0);

	setTimeout(() => {
		clearInterval(timer);
	}, 300);
}

const refForm = ref(null);

/**
 * Submit function
 */
function onSubmit(event) {
	console.log('FForm onSubmit');
	console.log('event', event);

	validator.checkFormValidation(props.modelValue);

	// props.submit();
	reset();
}

/**
 * reset
 */
function reset() {
	// console.log('reset event', event);

	Object.keys(values.value).map(key => {
		switch (typeof values.value[key]) {
			case 'boolean':
				values.value[key] = false;
				break;
			case 'string':
				values.value[key] = '';
				break;
			case 'number':
				values.value[key] = 0;
				break;
		}
	});
	console.log('reset value', refForm.value);
	// refForm.value.resetFields();
}

// const height = ref(refForm.value??.clientHeight);
// onMounted(() => {
// 	console.log('height', height);
// });

defineExpose({ reset });
</script>

<style lang="scss" scoped>
form {
	position: relative;
	display: grid;
	row-gap: 10px;
	border-top: 2px solid #002053;
	&:not(.search)::after {
		content: '';
		width: 100%;
		height: 1px;
		background-color: #002053;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	&:not(.search)::before {
		content: '';
		width: 1px;
		height: 100%;
		background-color: #fff;
		position: absolute;
		left: -1px;
		bottom: 0;
		z-index: 1;
	}
	&.search {
		border-radius: 8px;
		background-color: var(--form-search-bg);
		border: 0;
		&.tab-in {
			background-color: transparent;
			padding: 0;
		}
	}
	&.tab-in {
		padding: 0 12px;
	}
}

@at-root {
	.grid-control {
		form {
			border: 0;
			&::after,
			&::before {
				display: none;
			}
		}
	}
}

/* Toggle */
.search-toggle-btn {
	background-color: var(--user-section-border-color);
	/* position: relative; */
	margin-left: -20px;
	margin-right: -20px;
	margin-top: 16px;

	&.tab-in {
		/* margin: 0; */
	}

	.toggle-btn {
		width: 18px;
		height: 18px;
		position: absolute;
		top: 50%;
		left: 0;
		border-radius: 9px;
		border: 1px solid #002053;
		background-color: #fff;
		transform: translate(20px, -50%);
		box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);
		span {
			display: block;
			width: 18px;
			height: 18px;
			background-position: 4px 4px;
			background-repeat: no-repeat;
			background-image: url(/images/ico-search-toggle-btn-arrow.svg);
		}
	}
}

.close {
	height: 1px;
	max-height: 1px;
	padding: 0;
	margin-bottom: 0;

	&.tab-in {
		padding-top: 0;
	}

	.toggle-btn {
		span {
			background-position: 6px 6px;
			transform: rotate(180deg);
		}
	}
}
</style>
