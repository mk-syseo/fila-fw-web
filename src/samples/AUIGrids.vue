<template>
	<div>
		<!-- 참고사항 -->
		<div style="color: blue; padding: 10px">
			<span>
				&nbsp; ※ 참고사항 ※
				<br />&nbsp;&nbsp;&nbsp;&nbsp;REST-API 호출 시 Token 정보가 필요하여
				로그인이 필요합니다. <br />&nbsp;&nbsp;&nbsp;&nbsp;로그인 후
				샘플소스(AUIGrid)를 참고해주시기 바랍니다.
			</span>
		</div>

		<!-- 기본 -->
		<FCodeBox example="grid/BasicGrid">
			<template #description>
				<h1>기본 그리드(샘플)</h1>
				기본 그리드 샘플입니다.<br />
				기본 그리드는 gridProps를 공통으로 사용하고 있는 속성만 적용되어
				있습니다.
			</template>

			<template #demo>
				<BasicGrid class="page-wrap" />
			</template>
		</FCodeBox>

		<!-- gridProps + 기본  -->
		<FCodeBox example="grid/PropsBasicGrid">
			<template #description>
				<h1>gridProps 설정 + 기본 그리드(샘플)</h1>
				gridProps 설정 + 기본 그리드 샘플입니다.<br />추가적으로 필요한 속성이
				있을 경우, 아래의 AUIGrid 문서를 참고하여 속성을 추가하시면 됩니다.<br />
				<div style="color: blue">
					<span>&nbsp;&nbsp; - 링크 : </span>
					<a
						href="https://www.auisoft.net/documentation/auigrid/DataGrid/Properties.html"
					>
						https://www.auisoft.net/documentation/auigrid/DataGrid/Properties.html
					</a>
				</div>
			</template>

			<template #demo>
				<PropsBasicGrid class="page-wrap" />
			</template>
		</FCodeBox>

		<!-- Master & Detail 그리드  -->
		<FCodeBox example="grid/MstDelGrid">
			<template #description>
				<h1>마스터 + 상세 그리드(샘플)</h1>
				마스터 + 상세 그리드 샘플입니다.<br />마스터 그리드의 행을 선택하면 상세
				그리드의 데이터가 노출됩니다.
			</template>

			<template #demo>
				<MstDelGrid class="page-wrap" style="height: 600px" />
			</template>
		</FCodeBox>

		<!-- Master + Detail 그리드 간 데이터 이동  -->
		<FCodeBox example="grid/MoveMstDelGrid">
			<template #description>
				<h1>그리드(1) + 그리드(2) 간 데이터 이동(샘플)</h1>
				그리드(1) + 그리드(2) 간 데이터 이동하는 샘플입니다.<br />그리드(1) 또는
				그리드(2)의 행을 선택하고 이동 버튼을 클릭하면 선택한 데이터가
				이동됩니다.
			</template>

			<template #demo>
				<MoveMstDelGrid class="page-wrap" style="height: 700px" />
			</template>
		</FCodeBox>

		<!-- Header 그리드  -->
		<FCodeBox example="grid/HeaderGrid">
			<template #description>
				<h1>Header 그리드(샘플)</h1>
				그리드 헤더(2단계), 헤더(colspan) 적용된 샘플입니다.<br />추가적인
				정보가 필요하다면 아래의 링크를 참조해주시기 바랍니다.
				<div style="color: blue">
					<span>&nbsp;&nbsp; - 링크 : </span>
					<a href="https://www.auisoft.net/demo/auigrid/index.html">
						https://www.auisoft.net/demo/auigrid/index.html
					</a>
				</div>
			</template>

			<template #demo>
				<HeaderGrid class="page-wrap" />
			</template>
		</FCodeBox>

		<!-- 컬럼 그리드(체크박스, 셀렉트박스, 캘린더)  -->
		<FCodeBox example="grid/ColumnGrid">
			<template #description>
				<h1>컬럼 그리드(체크박스, 셀렉트박스, 캘린더)(샘플)</h1>
				그리드 컬럼의 체크박스, 셀렉트박스, 캘린더를 적용한 샘플입니다.<br />추가적인
				정보가 필요하다면 아래의 링크를 참조해주시기 바랍니다.
				<div style="color: blue">
					<span>&nbsp;&nbsp; - 링크 : </span>
					<a href="https://www.auisoft.net/demo/auigrid/index.html">
						https://www.auisoft.net/demo/auigrid/index.html
					</a>
				</div>
			</template>

			<template #demo>
				<ColumnGrid class="page-wrap" />
			</template>
		</FCodeBox>

		<!-- 소계&합계 그리드 -->
		<FCodeBox example="grid/SummaryGrid">
			<template #description>
				<h1>소계&합계 그리드(샘플)</h1>
				그리드 소계&합계를 적용한 샘플입니다.<br />추가적인 정보가 필요하다면
				아래의 링크를 참조해주시기 바랍니다.
				<div style="color: blue">
					<span>&nbsp;&nbsp; - 링크 : </span>
					<a href="https://www.auisoft.net/demo/auigrid/index.html">
						https://www.auisoft.net/demo/auigrid/index.html
					</a>
				</div>
			</template>

			<template #demo>
				<SummaryGrid class="page-wrap" style="height: 500px" />
			</template>
		</FCodeBox>

		<!-- 팝업 그리드 -->
		<FCodeBox example="grid/ColumnPopupGrid">
			<template #description>
				<h1>컬럼 팝업 그리드(샘플)</h1>
				컬럼 팝업 그리드를 적용한 샘플입니다.
			</template>

			<template #demo>
				<ColumnPopupGrid class="page-wrap" />
			</template>
		</FCodeBox>

		<FProperty :data="properties" />
	</div>
</template>

<script setup>
import FCodeBox from '@/samples/element/FCodeBox.vue';
import FProperty from '@/samples/element/FProperty.vue';

import BasicGrid from '~/codebox/grid/BasicGrid.vue';
import PropsBasicGrid from '~/codebox/grid/PropsBasicGrid.vue';
import MstDelGrid from '~/codebox/grid/MstDelGrid.vue';
import MoveMstDelGrid from '~/codebox/grid/MoveMstDelGrid.vue';
import HeaderGrid from '~/codebox/grid/HeaderGrid.vue';
import ColumnGrid from '~/codebox/grid/ColumnGrid.vue';
import SummaryGrid from '~/codebox/grid/SummaryGrid.vue';
import ColumnPopupGrid from '~/codebox/grid/ColumnPopupGrid.vue';

const properties = [
	{
		property: 'id',
		desc: '버튼의 id 속성을 지정합니다',
		type: 'String',
		default: '',
		required: '',
		option: '',
	},
	{
		property: 'options',
		desc: '선택 가능한 옵션을 지정합니다',
		type: 'Array',
		default: '[]',
		required: '✓',
		option: '',
	},
];
</script>

<style lang="scss" scoped>
.page-wrap {
	padding: 16px 20px;
	height: 300px;
	display: flex;
	flex-direction: column;
	gap: 16px;

	&:has(.home-wrap) {
		background-color: #f4f4f6;
	}
	&:has(.splitpanes) {
		padding: 0;
	}
}
</style>
