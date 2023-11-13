<template>
	<FPageTitle />

	<FForm search>
		<FFormRow is-grid-cols="6">
			<FFormCol>
				<FInput label="label1" />
			</FFormCol>
			<FFormCol>
				<FInput label="label1" />
			</FFormCol>
			<FFormCol>
				<FSelect label="label1" required empty click-only />
			</FFormCol>
		</FFormRow>
	</FForm>

	<Splitpanes
		class="default-theme"
		@resize="e => onResize(e)"
		@splitter-click="e => onResize(e)"
	>
		<Pane :size="30" class="pane01">
			<Tabs>
				<Tab title="대상상품">
					<FGridRow is-grid-cols="1">
						<FGridCol class="gap-[10px]">
							<FGridCol>
								<FForm
									:is-toggle="isToggle"
									search="in-tab"
									@submit="handleSearch"
								>
									<FFormRow is-grid-cols="3">
										<FFormCol>
											<FAutoComplete
												v-model="userInput"
												:suggestions="suggestions"
												label="AutoComplete"
												label-field="comNm"
												value-field="comCd"
												is-hidden
												required
											/>
										</FFormCol>
										<FFormCol>
											<FSelect label="브랜드" required empty click-only />
										</FFormCol>
										<FFormCol>
											<FSelect label="년도" sub-required empty click-only />
										</FFormCol>
										<FFormCol>
											<FSelect label="시즌" required empty click-only />
										</FFormCol>
										<FFormCol>
											<FSelect label="카테고리" required empty click-only />
										</FFormCol>
										<FFormCol>
											<FSelect label="라인" empty click-only />
										</FFormCol>
										<FFormCol>
											<FSelect label="성별" empty click-only />
										</FFormCol>
										<FFormCol>
											<FSelect label="아이템" empty click-only />
										</FFormCol>
										<FFormCol>
											<FAutoComplete
												v-model="userInput"
												:suggestions="suggestions"
												label="AutoComplete"
												label-field="comNm"
												value-field="comCd"
												is-hidden
												right-layer
										/></FFormCol>
										<FFormCol>
											<FRadio
												id="divId"
												v-model="selectedOption"
												:options="options2"
												label="구분"
												name="divName"
												label-field="comNm"
												value-field="comCd"
											/>
										</FFormCol>
										<FFormCol class="grid-col-span-2">
											<FRadio
												id="divId"
												v-model="selectedOption"
												:options="options3"
												label="C/O 여부"
												name="divName"
												label-field="comNm"
												value-field="comCd"
											/>
										</FFormCol>
									</FFormRow>
									<FFormRow>
										<FlexBox class="gap-x-[6px] justify-end">
											<FButton icon="ico-16-reset">초기화</FButton>
											<FButton icon="ico-16-search">조회</FButton>
										</FlexBox>
									</FFormRow>
								</FForm>
							</FGridCol>
							<FGridCol>
								<AUIGrid
									ref="refLeftGrid"
									:data="roleList01"
									:column-layout="roleColumns01"
									title="대상상품"
								/>
							</FGridCol>
						</FGridCol>
					</FGridRow>
				</Tab>
				<Tab title="분배내역"> 2 </Tab>
			</Tabs>
		</Pane>
		<Pane :size="75" class="pane02">
			<Splitpanes
				horizontal
				@resize="e => onResize(e)"
				@splitter-click="e => onResize(e)"
			>
				<Pane class="pane03">
					<FGridRow is-grid-cols="1">
						<FGridCol>
							<FTitle level="4" name="출고요청" />
							<FForm form-only>
								<FFormRow is-grid-cols="5">
									<FFormCol>
										<FAutoComplete
											v-model="userInput"
											:suggestions="suggestions"
											label="AutoComplete"
											label-field="comNm"
											value-field="comCd"
											is-hidden
									/></FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
								</FFormRow>
							</FForm>
						</FGridCol>
						<FGridCol>
							<FTitle level="4" name="대상매장" />
							<FForm form-only>
								<FFormRow is-grid-cols="5">
									<FFormCol>
										<FAutoComplete
											v-model="userInput"
											:suggestions="suggestions"
											label="AutoComplete"
											label-field="comNm"
											value-field="comCd"
											is-hidden
									/></FFormCol>
									<FFormCol class="grid-col-span-2">
										<FRadio
											id="divId"
											v-model="selectedOption"
											:options="options"
											label="label1"
											name="divName"
											label-field="comNm"
											value-field="comCd"
										/>
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FSelect label="label1" required empty click-only />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
									<FFormCol>
										<FInput label="label1" />
									</FFormCol>
								</FFormRow>
							</FForm>
						</FGridCol>
					</FGridRow>
				</Pane>
				<Pane :size="100" class="pane04">
					<FGridRow is-grid-cols="1">
						<FGridCol>
							<AUIGrid
								ref="refRightGrid"
								:data="roleList"
								:column-layout="roleColumns"
								title="수입B/L내역"
								excel-up
								more
								filter
								:total="100"
							>
								<template #total></template>
								<template #header>
									<FForm form-only>
										<FFormRow is-grid-cols="2">
											<FFormCol>
												<FInput label="label1" />
											</FFormCol>
											<FFormCol>
												<FRadio
													id="divId"
													v-model="selectedOption"
													:options="options"
													label="label1"
													name="divName"
													label-field="comNm"
													value-field="comCd"
												/>
											</FFormCol>
										</FFormRow>
									</FForm>
								</template>
							</AUIGrid>
						</FGridCol>
						<FGridCol>
							<AUIGrid
								ref="refRightGrid"
								:data="roleList"
								:column-layout="roleColumns"
								title="수입B/L내역"
								excel-up
								more
								filter
								:total="100"
							>
								<template #total></template>
								<template #header>
									<FForm form-only>
										<FFormRow is-grid-cols="2">
											<FFormCol>
												<FInput label="label1" />
											</FFormCol>
											<FFormCol>
												<FRadio
													id="divId"
													v-model="selectedOption"
													:options="options"
													label="label1"
													name="divName"
													label-field="comNm"
													value-field="comCd"
												/>
											</FFormCol>
										</FFormRow>
									</FForm>
								</template>
							</AUIGrid>
						</FGridCol>
					</FGridRow>
				</Pane>
			</Splitpanes>
		</Pane>
	</Splitpanes>
</template>

<script setup>
// import Splitpanes from '@/components/split/FSplitPanes.vue';
// import Pane from '@/components/split/FPane.vue';

import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

import AUIGrid from '@/components/AUIGrid.vue';
import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';

import FTitle from '@/components/FTitle.vue';
import FPageTitle from '@/components/FPageTitle.vue';
import FlexBox from '@/components/FlexBox.vue';

import FInput from '@/components/FInput.vue';
import FSelect from '@/components/FSelect.vue';
import FForm from '@/components/FForm.vue';
import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';
import FAutoComplete from '@/components/FAutoComplete.vue';
import FRadio from '@/components/FRadio.vue';

import FButton from '@/components/FButton.vue';

import Tabs from '@/components/tab/FTabs.vue';
import Tab from '@/components/tab/FTab.vue';

const userInput = ref({
	comCd: '',
	comNm: '',
});
const suggestions = ref([
	{ comCd: 1, comNm: 'Apple', test1: 'Apple', test2: 'Apple' },
	{ comCd: 2, comNm: 'Banana', test1: 'Banana', test2: 'Banana' },
	{ comCd: 3, comNm: 'Cherry', test1: 'Cherry', test2: 'Cherry' },
	{ comCd: 4, comNm: 'Date', test1: 'Date', test2: 'Date' },
	{ comCd: 5, comNm: 'Elderberry', test1: 'Elderberry', test2: 'Elderberry' },
]);

const selectedOption = ref('');

const options = ref([
	{
		comCd: '1',
		comNm: '첫번째',
		name: 'radioName',
	},
	{
		comCd: '2',
		comNm: '두번째',
		name: 'radioName',
	},
	{
		comCd: '3',
		comNm: '세번째',
		name: 'radioName',
	},
]);

const options2 = ref([
	{
		comCd: '1',
		comNm: '재고',
		name: 'radioName',
	},
	{
		comCd: '2',
		comNm: '입고예정',
		name: 'radioName',
	},
]);

const options3 = ref([
	{
		comCd: '1',
		comNm: '전체',
		name: 'radioName',
	},
	{
		comCd: '2',
		comNm: 'Y',
		name: 'radioName',
	},
	{
		comCd: '3',
		comNm: 'N',
		name: 'radioName',
	},
]);

// const paneSize = ref(0);

/**
 * 그리드 테스트
 */
const refLeftGrid = ref(null);
const refRightGrid = ref(null);

const roleColumns01 = [
	{
		headerText: 'col001',
		dataField: 'col001',
	},
	{
		headerText: 'col002',
		dataField: 'col002',
		filter: {
			showIcon: true,
			displayFormatValues: true, // 포매팅된 값으로 필터 메뉴 작성 (기본값 : false)
		},
	},
	{
		headerText: 'col003',
		dataField: 'col003',
	},
	{
		headerText: 'col004',
		dataField: 'col004',
	},
	{
		headerText: 'col005',
		dataField: 'col005',
	},
	{
		headerText: 'col006',
		dataField: 'col006',
	},
	{
		headerText: 'col007',
		dataField: 'col007',
	},
	{
		headerText: 'col008',
		dataField: 'col008',
	},
	{
		headerText: 'col009',
		dataField: 'col009',
	},
	{
		headerText: 'col010',
		dataField: 'col010',
	},
	{
		headerText: 'col011',
		dataField: 'col011',
	},
	{
		headerText: 'ol012',
		dataField: 'col012',
	},
	{
		headerText: 'col013',
		dataField: 'col013',
	},
	{
		headerText: 'col014',
		dataField: 'col014',
	},
	{
		headerText: 'col015',
		dataField: 'col015',
	},
	{
		headerText: 'col016',
		dataField: 'col016',
	},
	{
		headerText: 'col017',
		dataField: 'col017',
	},
	{
		headerText: 'col018',
		dataField: 'col018',
	},
	{
		headerText: 'col019',
		dataField: 'col019',
	},
	{
		headerText: 'col020',
		dataField: 'col020',
	},
];

const roleList01 = ref([
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
]);

const roleColumns = [
	{
		headerText: 'col001',
		dataField: 'col001',
	},
	{
		headerText: 'col002',
		dataField: 'col002',
	},
	{
		headerText: 'col003',
		dataField: 'col003',
	},
	{
		headerText: 'col004',
		dataField: 'col004',
	},
	{
		headerText: 'col005',
		dataField: 'col005',
	},
	{
		headerText: 'col006',
		dataField: 'col006',
	},
	{
		headerText: 'col007',
		dataField: 'col007',
	},
	{
		headerText: 'col008',
		dataField: 'col008',
	},
	{
		headerText: 'col009',
		dataField: 'col009',
	},
	{
		headerText: 'col010',
		dataField: 'col010',
	},
	{
		headerText: 'col011',
		dataField: 'col011',
	},
	{
		headerText: 'ol012',
		dataField: 'col012',
	},
	{
		headerText: 'col013',
		dataField: 'col013',
	},
	{
		headerText: 'col014',
		dataField: 'col014',
	},
	{
		headerText: 'col015',
		dataField: 'col015',
	},
	{
		headerText: 'col016',
		dataField: 'col016',
	},
	{
		headerText: 'col017',
		dataField: 'col017',
	},
	{
		headerText: 'col018',
		dataField: 'col018',
	},
	{
		headerText: 'col019',
		dataField: 'col019',
	},
	{
		headerText: 'col020',
		dataField: 'col020',
	},
];

const roleList = ref([
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
	{
		col001: 'data001',
		col002: 'data002',
		col003: 'data003',
		col004: 'data004',
		col005: 'data005',
		col006: 'data006',
		col007: 'data007',
		col008: 'data008',
		col009: 'data009',
		col010: 'data010',
		col011: 'data011',
		col012: 'data012',
		col013: 'data013',
		col014: 'data014',
		col015: 'data015',
		col016: 'data016',
		col017: 'data017',
		col018: 'data018',
		col019: 'data019',
		col020: 'data020',
	},
]);

onMounted(() => {
	refRightGrid.value.setGridData(roleList.value);
	refLeftGrid.value.setGridData(roleList01.value);
	// onResize();
});

function onResize(event) {
	console.log('event', event);
	// const timer = setInterval(() => {
	// 	window.dispatchEvent(new Event('resize'));
	// }, 0);

	// setTimeout(() => {
	// 	clearInterval(timer);
	// }, 1000);
	window.dispatchEvent(new Event('resize'));
}
</script>

<style lang="scss" scoped>
.splitpanes {
	/* padding: 16px 20px; */
	/* height: calc(100vh - 93px); */
	.splitpanes__pane > .splitpanes {
		padding: 0;
		height: 100%;
	}
}
.splitpanes.default-theme .splitpanes__pane {
	background-color: #fff;
}
.pane01 {
	padding-right: 10px;
	min-width: 10%;
}
.pane02 {
	padding-left: 10px;
	min-width: calc(70% - 6px);
}

.pane03 {
	padding-bottom: 10px;
	min-height: 40px;
}
.pane04 {
	padding-top: 10px;
	min-height: calc(100% - 315px);
}
</style>
