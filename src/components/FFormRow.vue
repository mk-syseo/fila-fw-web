<!--------------------------------------------------------------------
	파일   : FFormRow.vue
	작성   : CJ Developer
	설명	 : [공통] 폼 행 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="form-row" :class="'grid-cols-' + isGridCols">
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	isGridCols: {
		type: String,
		default: null,
	},
	isMoreOpen: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss" scoped>
@at-root {
	form {
		&.detail {
			.form-row {
				gap: 16px;
			}
		}
		&.search {
			&.tab-in {
				.form-row {
					gap: 12px;
					padding-top: 16px;
				}
			}
		}
	}
	.grid-control {
		.form-row {
			gap: 16px;
		}
	}
}
.form-row {
	display: grid;
	&:has(.file-uploaded) {
		display: flex;
	}
	&.grid-cols-1 {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
	&.grid-cols-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	&.grid-cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	&.grid-cols-4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
	&.grid-cols-5 {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}
	&.grid-cols-6 {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}
	&.grid-cols-7 {
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}
	&.grid-cols-8 {
		grid-template-columns: repeat(8, minmax(0, 1fr));
	}
	&.grid-cols-9 {
		grid-template-columns: repeat(9, minmax(0, 1fr));
	}
	&.grid-cols-10 {
		grid-template-columns: repeat(10, minmax(0, 1fr));
	}
	&.grid-cols-11 {
		grid-template-columns: repeat(11, minmax(0, 1fr));
	}
	&.grid-cols-12 {
		grid-template-columns: repeat(12, minmax(0, 1fr));
	}
	&.grid-cols-none {
		grid-template-columns: none;
	}

	@at-root {
		.grid-control {
			.form-row {
				display: flex;
			}
		}
	}
}
</style>
