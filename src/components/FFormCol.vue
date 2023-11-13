<!--------------------------------------------------------------------
	파일   : FFormCol.vue
	작성   : CJ Developer
	설명	 : [공통] 폼 컬럼 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="form-col" :class="'grid-col-span-' + isGridColSpan">
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	isGridColSpan: {
		type: String,
		default: null,
	},
});
</script>

<style lang="scss" scoped>
@at-root {
	.close {
		.form-col {
			display: none;
		}
	}
	.search,
	.grid-control {
		.form-col {
			&::before,
			&::after {
				display: none;
			}
		}
	}
	.grid-control {
		.form-col {
			padding: 0;
			flex-direction: row;
		}
	}
	.tab-in {
		.form-col {
			padding: 0;
		}
	}
}
.form-col {
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 8px;
	&::before {
		content: '';
		width: 1px;
		height: 100%;
		background-color: #ccc;
		position: absolute;
		left: -1px;
		top: 0;
	}
	&::after {
		content: '';
		width: 100%;
		height: 1px;
		background-color: #ccc;
		position: absolute;
		left: 0;
		bottom: 0;
		// z-index: 0;
	}
}

.grid-col-span-2 {
	grid-column: auto / span 2;
}
.grid-col-span-3 {
	grid-column: auto / span 3;
}
</style>
