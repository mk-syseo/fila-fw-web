<!--------------------------------------------------------------------
	파일   : FTable.vue
	작성   : CJ Developer
	설명	 : [공통] 테이블 컴포넌트
---------------------------------------------------------------------->
<template>
	<div>
		<table>
			<!-- Table Header -->
			<tr>
				<th
					v-for="head in header"
					:key="head[headerField]"
					:style="{
						width: head.width ? `${Number(head.width)}px` : 'auto',
					}"
				>
					{{ head[headerLabel] }}
				</th>
			</tr>

			<!-- Table Row -->
			<tr v-for="(row, idx) in data" :key="idx">
				<td
					v-for="head in header"
					:key="head[headerField]"
					:style="{
						textAlign: head.align ?? 'left',
						width: head.width ? `${Number(head.width)}px` : 'auto',
					}"
				>
					{{ row[head[headerField]] }}
				</td>
			</tr>
		</table>

		<!-- 데이터가 없을 시 -->
		<div v-if="data.length === 0" class="no-data">데이터가 없습니다</div>
	</div>
</template>

<script setup>
const props = defineProps({
	header: {
		type: Array,
		default: new Array([
			{
				label: 'label',
				value: 'label-field',
				align: 'left', // left, center, right
			},
		]),
	},
	headerLabel: {
		type: String,
		default: 'label',
	},
	headerField: {
		type: String,
		default: 'value',
	},
	data: {
		type: Array,
		default: new Array([]),
	},
});
</script>

<style lang="scss" scoped>
table {
	table-layout: fixed;
	border-top: 2px solid #002053;
	border-bottom: 1px solid #002053;
	width: 100%;
	tr {
		th,
		td {
			border-right: 1px solid #e5e5e5;
			&:last-child {
				border-right: 0;
			}
		}
		th {
			font-size: 13px;
			color: #111;
			padding: 6px 8px;
			border-bottom: 1px solid #002053;
			background-color: #fff;
		}
		td {
			font-size: 13px;
			color: #555;
			padding: 8px;
			background-color: #fff;
			border-top: 1px solid #e5e5e5;
		}
		&:first-child {
			td {
				border-top: 0;
			}
		}
		&:hover {
			td {
				background-color: #eff4fb;
			}
		}
	}
}

.no-data {
	width: 100%;
	padding: 10px;

	color: #555;
	font-size: 13px;
	text-align: center;
}
</style>
