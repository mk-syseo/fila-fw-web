<template>
	<Splitpanes
		class="default-theme"
		@resize="e => onResize(e)"
		@splitter-click="e => onResize(e)"
	>
		<Pane :size="25" class="pane01">
			<FGridRow is-grid-cols="1">
				<FGridCol class="gap-[10px]">
					<FGridCol>
						<FForm search @submit="handleSearch">
							<FFormRow is-grid-cols="1">
								<FFormCol>
									<FInput label="label1" />
								</FFormCol>
								<FFormCol>
									<FInput label="label1" />
								</FFormCol>
								<FFormCol>
									<FSelect label="label1" :required="true" empty click-only />
								</FFormCol>
							</FFormRow>
						</FForm>
					</FGridCol>
					<FGridCol>
						<AUIGrid
							ref="refLeftGrid"
							:data="roleList01"
							:column-layout="roleColumns01"
						/>
					</FGridCol>
				</FGridCol>
			</FGridRow>
		</Pane>
		<Pane :size="75" class="pane02">
			<Splitpanes
				horizontal
				@resize="e => onResize(e)"
				@splitter-click="e => onResize(e)"
			>
				<pane class="pane03">
					<FForm vertical>
						<FFormRow is-grid-cols="5">
							<FFormCol>
								<AutoComplete
									v-model="userInput"
									:suggestions="suggestions"
									label="label1"
									label-field="comNm"
									value-field="comCd"
								></AutoComplete>
							</FFormCol>
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
								<FSelect label="label1" :required="true" empty click-only />
							</FFormCol>
							<FFormCol>
								<FInput label="label1" />
							</FFormCol>
							<FFormCol>
								<FInput label="label1" />
							</FFormCol>
						</FFormRow>
					</FForm>
				</pane>
				<pane class="pane04" :size="100">
					<FGridRow is-grid-cols="1">
						<FGridCol>
							<AUIGrid
								ref="refRightGrid"
								:data="roleList"
								:column-layout="roleColumns"
								title="Grid Title"
								chart
								add
								insert
								copy
								move-up
								move-down
								remove
								file-down
								excel-down
								excel-up
								more
								filter
								:total="100"
							>
								<template #total></template>
								<template #header>
									<FForm>
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
				</pane>
			</Splitpanes>
		</Pane>
	</Splitpanes>
</template>

<script setup>
// import SplitPanes from '@/components/SplitPanes';
// import Pane from '@/components/Pane';

import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

import AUIGrid from '@/components/AUIGrid.vue';
import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';

import FInput from '@/components/FInput.vue';
import FSelect from '@/components/FSelect.vue';
import FForm from '@/components/FForm.vue';

import FFormRow from '@/components/FFormRow.vue';
import FFormCol from '@/components/FFormCol.vue';
import AutoComplete from '@/components/AutoComplete.vue'; // 자식 컴포넌트 경로에 따라 수정
import FRadio from '@/components/FRadio.vue'; // 자식 컴포넌트 경로에 따라 수정

const userInput = ref('');
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
	padding: 16px 20px;
	height: calc(100vh - 93px);
}
.splitpanes--horizontal {
	padding: 0;
	height: calc(100vh - 125px);
}
.splitpanes.default-theme .splitpanes__pane {
	background-color: #fff;
}
.pane01 {
	width: 25%;
	padding-right: 10px;
}
.pane02 {
	width: calc(75% - 6px);
	padding-left: 10px;
}
.pane03 {
	max-height: 128px;
}
.pane04 {
	min-height: calc(100% - 134px);
	height: 100%;
}
</style>
