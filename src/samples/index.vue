<!--------------------------------------------------------------------
	파일   : samples/index.vue
	작성   : CJ Developer
	설명	 : [공통] 컴포넌트 예제 리스트
---------------------------------------------------------------------->
<template>
	<div class="samples">
		<p class="samples-title">컴포넌트 사용 예제</p>

		<AutoComplete
			v-model="userInput"
			:suggestions="suggestions"
			label="label1"
			label-field="comNm"
			value-field="comCd"
		></AutoComplete>

		<!-- <div>
			<a href="#button">버튼으로 이동@@</a>
		</div> -->

		<FExample id="button" title="버튼 (FButton)">
			<Buttons />
		</FExample>

		<FExample id="input" title="입력 (FInput)">
			<Inputs />
		</FExample>

		<FExample id="radio" title="라디오 (FRadio)">
			<Radios />
		</FExample>

		<FExample id="checkbox" title="체크박스 (FCheckbox)">
			<Checkboxes />
		</FExample>

		<FExample id="select" title="단일셀렉트 (FSelect)">
			<Selects />
		</FExample>

		<FExample id="multiSelect" title="멀티셀렉트 (FMSelect)">
			<MultiSelects />
		</FExample>

		<FExample id="toggle" title="토글 (FToggle)">
			<Toggles />
		</FExample>

		<FExample id="flag" title="플래그 (FFlag)">
			<Flags />
		</FExample>

		<div id="input" class="samples-name">
			# 자동완성..(FAddress)
			<FIcon icon="aside-ico-arrow-down" />
		</div>

		<Etc />

		<hr class="samples-divider" />

		<FExample id="address" title="주소 (FAddress)">
			<Addresses />
		</FExample>

		<FExample id="email" title="이메일 (FEmail)">
			<Emails />
		</FExample>

		<FExample id="date" title="날짜선택 (FDate)">
			<Dates />
		</FExample>

		<FExample id="dateRange" title="날짜범위 (FDateRange)">
			<DateRanges />
		</FExample>

		<FExample id="dateRange" title="날짜범위구분 (FDateCategory)">
			<DateCategory />
		</FExample>

		<FExample id="time" title="시간 (FTime)">
			<Times />
		</FExample>

		<div id="input" class="samples-name">
			# 그리드(AUIGrid)
			<FIcon icon="aside-ico-arrow-down" />
		</div>
		<AUIGrids />
		<hr class="samples-divider" />

		<FExample id="layerPopup" title="레이어팝업 (FLayerPopup)">
			<Layers />
		</FExample>

		<FExample id="form" title="폼 (FForm)">
			<Forms />
		</FExample>

		<FExample id="tab" title="탭 (FTabs, FTab)">
			<Tabs />
		</FExample>

		<FExample id="upload" title="첨부파일 (FUploader)"></FExample>

		<FExample id="dndUpload" title="드래그앤드랍 첨부파일 (FDUploader)">
		</FExample>

		<FExample id="icon" title="아이콘 (FIcon)">
			<Icons />
		</FExample>
	</div>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';
import FExample from '@/samples/element/FExample.vue';

// 입력
import Buttons from '@/samples/Buttons.vue';
import Inputs from '@/samples/Inputs.vue';
import Radios from '@/samples/Radios.vue';
import Checkboxes from '@/samples/Checkboxes.vue';

import Selects from '@/samples/Selects.vue';
import MultiSelects from '@/samples/MultiSelects.vue';
import Etc from '@/samples/Etc.vue';
import Toggles from '@/samples/Toggles.vue';
import Flags from '@/samples/Flags.vue';
import Addresses from '@/samples/Addresses.vue';
import Emails from '@/samples/Emails.vue';

// 날짜
import Dates from '@/samples/Dates.vue';
import DateRanges from '@/samples/DateRanges.vue';
import DateCategory from '@/samples/DateCategory.vue';
import Times from '@/samples/Times.vue';

// 그리드
import AUIGrids from './AUIGrids.vue';

// 기타
import Layers from '@/samples/Layers.vue';
import Forms from '@/samples/Forms.vue';
import Tabs from '@/samples/Tabs.vue';
import Icons from '@/samples/Icons.vue';
</script>

<style lang="scss" scoped>
.samples {
	padding: 20px;

	&-title {
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 20px;
		color: var(--heading-text);
	}
}

.lightBlue {
	color: #0795d6;
	font-weight: 600;
}

.fs-complete {
	font-size: 11px;
	font-weight: 600;
	margin-left: 5px;
	&.lightBlue {
		background-color: #0795d6;
		color: white;
		padding: 2px 5px;
		border-radius: 6px;
		opacity: 0.8;
	}
}
</style>
