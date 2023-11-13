<!--------------------------------------------------------------------
	파일   : AUIGrid.vue
	작성   : CJ Developer
	설명	 : [공통] AUIGrid 컴포넌트
---------------------------------------------------------------------->
<template>
	<div class="grid-wrapper">
		<div v-if="title || !noButton" class="grid-header">
			<div v-if="title" class="grid-title">
				{{ title }}
				<div v-if="total" class="grid-total">
					<slot name="total">
						총
						<span class="number">{{ total }}</span>
						건
					</slot>
				</div>
			</div>
			<div v-if="!noButton" class="grid-control">
				<slot name="header"></slot>
				<div class="grid-button">
					<FButton v-if="chart" text icon="ico-24-graph" />
					<FButton
						v-if="add"
						:disabled="btnDisabled"
						@click="
							isTree
								? addTreeRow(...add)
								: typeof add === 'boolean'
								? addRow()
								: addRow(add)
						"
					>
						행추가
					</FButton>
					<FButton v-if="insert">행삽입</FButton>
					<FButton v-if="copy" :disabled="btnDisabled" @click="copyRow()">
						행복사
					</FButton>
					<FButton v-if="moveUp" icon="ico-16-up">행이동</FButton>
					<FButton v-if="moveDown" icon="ico-16-down">행이동</FButton>
					<FButton v-if="remove" :disabled="btnDisabled" @click="removeRow()">
						행삭제
					</FButton>
					<FButton v-if="fileDown" icon="ico-16-dnload">양식</FButton>
					<FButton v-if="excelUp" icon="ico-16-dnload">엑셀</FButton>
					<FButton v-if="excelDown" icon="ico-16-upload">엑셀</FButton>
					<FButton v-if="more" text icon="ico-24-more" class="size28" />
					<FButton v-if="filter" text icon="ico-24-filter" />
				</div>
			</div>
			<slot />
		</div>
		<div :id="id" class="grid-body-height"></div>
	</div>
</template>

<script>
import axios from 'axios';
import _, { concat } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import AUIGrid_original from '@/library/AUIGrid/AUIGrid_original.vue';

import header from './header.json'; // 테스트용

// import {
// 	useI18n,
// } from '@/utils/import/scriptImport';

import { useMessage } from '@/plugins/message/message';

import FButton from '@/components/FButton.vue';
import DateRenderer from '@/library/AUIGrid/renderers/DateRenderer';
import PopupRenderer from '@/library/AUIGrid/renderers/PopupRenderer';

import 'file-saver';
import dataRegex from '@/utils/dataRegex';
import commonUtils from '@/utils/commonUtils';

const $ag = window.AUIGrid;
const message = useMessage();

// AUI 그리드 기본 속성 정의
const defaultProps = {
	width: '100%',
	editable: true,
	softRemoveRowMode: false,
	selectionMode: 'singleRow',
	headerHeight: 32,
	// rowHeight: 28,
	rowHeight: 30,
	noDataMessage: 'No data to display',
	useContextMenu: true,
	autoGridHeight: false,
	bodyHeight: 'auto',
	scrollHeight: 6,
	scrollThumbHeight: 4,
	enableFilter: true,
};

export default {
	components: {
		FButton,
	},
	extends: AUIGrid_original,
	props: {
		// Grid
		data: {
			type: [Array, Object],
			default() {
				return [];
			},
		},
		gridProps: {
			type: Object,
			default: null,
		},
		// Grid Property
		// name: {
		// 	type: String,
		// },
		title: {
			type: String,
			default: null,
		},
		total: {
			type: Number,
			default: null,
		},
		isTree: {
			type: Boolean,
			default: false,
		},
		notFocus: {
			type: Boolean,
			default: false,
		},
		existOnly: {
			type: Boolean,
			default: false,
		},
		// FButton
		noButton: {
			type: Boolean,
			default: false,
		},
		add: {
			type: [Boolean, Array, Object],
			default: null,
		},
		remove: {
			type: [Boolean, Array, Object],
			default: null,
		},
		copy: {
			type: [Boolean, Array, Object],
			default: null,
		},
		btnDisabled: {
			type: Boolean,
			default: false,
		},
		insert: {
			type: [Boolean, Array, Object],
			default: null,
		},
		moveUp: {
			type: [Boolean, Array, Object],
			default: null,
		},
		moveDown: {
			type: [Boolean, Array, Object],
			default: null,
		},
		fileDown: {
			type: [Boolean, Array, Object],
			default: null,
		},
		excelUp: {
			type: [Boolean, Array, Object],
			default: null,
		},
		excelDown: {
			type: [Boolean, Array, Object],
			default: null,
		},
		chart: {
			type: [Boolean, Array, Object],
			default: null,
		},
		filter: {
			type: [Boolean, Array, Object],
			default: null,
		},
		more: {
			type: [Boolean, Array, Object],
			default: null,
		},
	},
	emits: ['select'],
	data: () => ({
		// t: useI18n().t
		// Grid 커스텀 변환
		columns: Array,
		footers: Array,
		gridProperty: Object,
	}),
	watch: {
		data: function (newData) {
			this.setGridData(newData);
		},
		columnLayout: function (newColumnLayout) {
			this.changeColumnLayout(newColumnLayout);
		},
	},
	created: function () {
		const uuid = uuidv4();
		this.id = 'aui-grid-wrap-' + (this.name !== '' ? this.name : uuid);
		this.pid = '#' + this.id;
		this.timerId = null;

		this.columns = this.__setupColumnRenderer(this.__getColumnLayoutByProxy());
		this.gridProperty = this.__getGridPropsByProxy();
		this.footers = this.__getFooterLayoutByProxy();
	},
	mounted: function () {
		if ($ag.isCreated(this.pid)) {
			this.__resetGlobalResize();
			$ag.destroy(this.pid);
		}

		if (this.columns !== null)
			$ag.create(this.pid, this.columns, this.gridProperty);
		if (this.footers !== null) $ag.setFooter(this.pid, this.footers);

		this.__setupEvents();
		this.__setupEventBinding();
		this.__setupGlobalResize();

		this.setGridData(this.data);
	},
	activated: function () {
		// 화면 활성화 시 그려져있는 그리드 리사이징
		this.__globalResizeHandler();
	},
	methods: {
		/* Canal Frame Custom Function - Set up */
		__getColumnLayoutByProxy: function () {
			// @Override

			// 전달받은 컬럼이 없으면 빈 배열 반환
			if (this.columnLayout === null) return [];

			// 개인화 컬럼 반환
			if (this.name === header.id) {
				// TO-DO 개인화 컬럼 조회로 변경
				return header.data;
			}

			// 데이터에서 존재하는 컬럼만 반환
			if (this.existOnly) {
				const existColumns = Object.keys(this.data[0]);

				return this.columnLayout.filter(column =>
					existColumns.includes(column.dataField),
				);
			}

			if (
				Array.isArray(this.columnLayout) ||
				this.columnLayout instanceof Array ||
				this.columnLayout.constructor == 'Array'
			) {
				return this.columnLayout;
			}
			// if (isProxy(this.columnLayout)) { const rawObjectOrArray = toRaw(this.columnLayout); console.log(rawObjectOrArray); } only Vue3
			return Object.assign([], this.columnLayout);
		},
		__getGridPropsByProxy: function () {
			// @Override
			if (this.gridProps === null) return defaultProps;
			else {
				return { ...defaultProps, ...this.gridProps };
			}
		},
		__globalResizeHandler() {
			// @Override
			// 현재 화면에 그려진 그리드만 리사이징
			if ($ag.isCreated(this.pid) && document.getElementById(this.id)) {
				$ag.resize(this.pid);
			}

			// 리사이징까지 지연시간을 둘 경우 사용한다
			// const that = this;
			// if (that.timerId !== null) {
			// 	clearTimeout(that.timerId);
			// }

			// that.timerId = setTimeout(function () {
			// 	if ($ag.isCreated(that.pid)) {
			// 		$ag.resize(that.pid);
			// 	}
			// }, that.resizeDelayTime);
		},
		__setupColumnRenderer(columnLayout) {
			// @Override
			// TO-DO 여기서 컬럼 속성 보정 -> renderer, editRenderer, validation 등등
			return (columnLayout = columnLayout.map(column => {
				// 툴팁 : show, tooltipHtml(문구) 세팅
				if (column.tooltip) {
					column.headerTooltip = {
						show: true,
						tooltipHtml: `${column.tooltip}`,
					};
				}

				switch (column.renderer?.type) {
					case 'Datepicker':
						return {
							...column,
							renderer: {
								type: 'CustomRenderer',
								jsClass: DateRenderer,
								props: {
									format: 'yyyy-MM-dd',
									'auto-apply': true,
									'keep-action-row': true,
									'auto-position': true,
									...column.renderer.props,
									// 'month-change-on-scroll': false,
								},
							},
							editRenderer: {
								type: 'MaskEditRenderer',
								mask:
									column.renderer.props.format?.replace(/[YMD]/g, '9') ??
									'9999-99-99',
								applyMaskValue: true,
							},
						};
					// 팝업
					case 'Popup':
						return {
							...column,
							renderer: {
								type: 'CustomRenderer',
								jsClass: PopupRenderer,
								props: {
									...column.renderer.props,
								},
							},
						};
					// 입력 관련
					case 'HHMM':
						return {
							...column,
							editRenderer: {
								...column.editRenderer,
								type: 'InputEditRenderer',
								// validator:
							},
						};
					// Calender
					case 'CALENDAR':
						return {
							...column,
							dateInputFormat: 'yyyy-mm-dd',
							formatString: 'yyyy-mm-dd',
							editRenderer: {
								type: 'CalendarRenderer',
								onlyCalendar: true, // 달력으로만 수정 가능
								onlyMonthMode: false,
								titles: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
								monthTitleString: 'mmm',
								formatYearString: 'yyyy',
								formatMonthString: 'mmm',
								todayText: 'Today', // 오늘 날짜 버턴 텍스트
								showTodayBtn: true, // 오늘 날짜 선택 버튼 출력
								showExtraDays: true, // 지난 달, 다음 달 여분의 날짜(days) 출력
							},
						};
					case 'CALENDAR-MONTH':
						return {
							...column,
							dateInputFormat: 'yyyy-mm',
							formatString: 'yyyy-mm',
							editRenderer: {
								type: 'CalendarRenderer',
								onlyCalendar: true, // 달력으로만 수정 가능
								onlyMonthMode: true,
								titles: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
								monthTitleString: 'mmm',
								formatYearString: 'yyyy',
								formatMonthString: 'mmm yyyy',
								todayText: 'Today', // 오늘 날짜 버턴 텍스트
								showTodayBtn: true, // 오늘 날짜 선택 버튼 출력
								showExtraDays: true, // 지난 달, 다음 달 여분의 날짜(days) 출력
							},
						};
					// Checkbox
					case 'Checkbox':
						return {
							...column,
							renderer: {
								...column.renderer,
								type: 'CheckBoxEditRenderer',
							},
						};
					case 'CHECKBOX-DISABLE':
						return {
							...column,
							width: 70,
							renderer: {
								type: 'CheckBoxEditRenderer',
								editable: false,
								checkValue: '1',
								unCheckValue: '0',
							},
						};
					case 'Checkbox-Header':
						return {
							...column,
							headerRenderer: {
								...column.headerRenderer,
								dependentMode: true,
								type: 'CheckBoxHeaderRenderer',
							},
							renderer: {
								...column.renderer,
								type: 'CheckBoxEditRenderer',
							},
						};
					// Dropdown
					case 'Dropdown':
						return {
							...column,
							renderer: {
								...column.renderer,
								type: 'DropDownListRenderer',
							},
						};
					// Icon
					case 'Icon':
						return {
							...column,
							renderer: {
								...column.renderer,
								type: 'IconRenderer',
							},
						};
					default:
						return {
							...column,
							editRenderer: {
								...column.editRenderer,
								type: 'InputEditRenderer',
							},
						};
				}
			}));
		},
		/**
		 * 그리드 생성 시 행클릭 이벤트 추가
		 */
		__setupEventBinding() {
			const grid = this;
			$ag.bind(this.pid, 'selectionChange', function () {
				return grid.$emit('select', grid.getSelectedRows()[0]);
			});
		},
		__setupValidator() {},
		create(columnLayout, props) {
			// @Override
			// renderType에 따라 editRenderer 설정
			// this.__setupColumnRenderer(this.columnLayout);
			$ag.create(this.pid, columnLayout, props);
			this.__setupEvents();
			this.__setupGlobalResize();
			return this.pid;
		},
		/**
		 * 행 추가 시, item이나 rowIndex가 없이도 행 추가 가능하다
		 * @param {object} items
		 * @param {string} rowIndex 행이 추가될 위치('first' 가장 위/'last' 가장 아래, 'selectionUp' 선택행 위/'selectionDown' 선택행 아래)
		 */
		addRow(items = {}, rowIndex = 'last') {
			// @Override
			items.rowStatus = 'I';
			return $ag.addRow.call($ag, this.pid, items, rowIndex);
		},
		/**
		 * 트리형 그리드의 행 추가 시
		 * @param {array|object} items
		 * @param {string} parentField 참고할 부모 행의 필드
		 * @param {string} rowIndex 행이 추가될 위치('first' 가장 위/'last' 가장 아래, 'selectionUp' 선택행 위/'selectionDown' 선택행 아래)
		 */
		addTreeRow(items = {}, parentField, rowIndex = 'last') {
			// @Override
			let selectedItem =
				this.getItemByRowIndex(this.getSelectedIndex()[0]) ?? null;

			if (selectedItem) {
				// 선택행이 있는 경우
				let parentItem = this.getParentItemByRowId(selectedItem.rowId);

				// items의 타입에 따라 분기처리
				let setParentField;
				if (typeof items === 'array') {
					// TO-DO Array 타는지..
					setParentField = items.map(item => ({
						...item,
						[parentField]: parentItem
							? parentItem[this.getProp('treeIdField')]
							: selectedItem[this.getProp('treeIdField')],
					}));
				} else {
					setParentField = {
						...items,
						[parentField]: parentItem
							? parentItem[this.getProp('treeIdField')]
							: selectedItem[this.getProp('treeIdField')],
					};
				}

				return $ag.addTreeRow.call(
					$ag,
					this.pid,
					setParentField,
					parentItem ? parentItem.rowId : selectedItem.rowId,
					rowIndex,
				);
			} else {
				// 선택행이 없는 경우(최상위)
				return $ag.addTreeRow.call($ag, this.pid, items, null, 'first');
			}
		},
		/**
		 * __setupColumnRenderer 함수를 사용하여 컬럼 레이아웃을 변경한다
		 * @param {Object} newLayout 변경할 컬럼 정보
		 */
		changeColumnLayout(newLayout) {
			// @Override
			return $ag.changeColumnLayout.call(
				$ag,
				this.pid,
				this.__setupColumnRenderer(newLayout),
			);
		},
		/**
		 * 그리드 수정 시, 여러 dataField에 중복된 값의 조합이 있는지 확인한다
		 * (ex) dataField1과 dataField2의 조합이 중복되어 존재하는가?
		 * @param {String} dataFields '|'로 구분되는 대상 컬럼명 (ex) column1|column2|clolumn3,..
		 */
		checkComplexDuplicateValue(dataFields) {
			let changedData = this.getChangedData();

			if (commonUtils.isEmpty(changedData)) {
				return true;
			}

			// 1. dataFields를 | 를 구분자로 분리
			const fields = dataFields.replace(/'/g, '').split('|');

			// 2. 수정 행의 데이터 중 dataFields의 값만 가져온다
			const modifiedData = changedData.map(row => {
				let rowId = row._$uid;
				let fieldData = fields.map(field => row[field]);
				return {
					...fieldData,
					rowId,
				};
			});

			// 2-1. 전체 그리드 데이터 중 dataFields의 값만 가져온다
			const allData = this.getGridData().map(row => {
				let rowId = row._$uid;
				let fieldData = fields.map(field => row[field]);
				return {
					...fieldData,
					rowId,
				};
			});

			// 3. 동일한 결과가 있는지 확인한다
			for (let current of modifiedData) {
				let findValues = allData.filter(data => {
					if (
						_.isEqual(_.omit(current, 'rowId'), _.omit(data, 'rowId')) &&
						data.rowId !== current.rowId
					)
						return data;
				});

				// 3-1. 동일한 결과가 있는 경우
				//      중복 메세지 출력 후 중복된 행으로 포커스를 이동한다
				if (findValues.length) {
					let duplicateText = concat(
						fields.map((field, index) => {
							if (index !== fields.length - 1) {
								return this.getColumnItemByDataField(field).headerText;
								// return (
								// 	this.getColumnItemByDataField(field).headerText +
								// 	this.t('com.msg.and')
								// );
							} else {
								return this.getColumnItemByDataField(field).headerText;
							}
						}),
					);

					message.showAlert({
						message: this.t('com.msg.duplication2', [duplicateText.join('')]),
					});

					this.setSelectionByIndex(this.rowIdToIndex(findValues[0].rowId));
					return false;
				}

				// 4. 중복된 결과가 없는 경우
				return true;
			}
		},
		/**
		 * 그리드 수정 시, 단일 dataField에 중복된 값이 있는지 확인한다
		 * (ex) dataField1에 중복된 값이 존재하는가?
		 * @param {Array(String)} dataFields 대상 컬럼명
		 */
		checkDuplicateValue(dataFields) {
			let changedData = this.getChangedData();

			if (commonUtils.isEmpty(changedData)) {
				return true;
			}

			for (let field of dataFields) {
				let headerText = this.getColumnItemByDataField(field).headerText;

				for (let row of changedData) {
					let allColumnValues = this.getRowIndexesByValue(
						field,
						row[field],
					).filter(columnValues => {
						row._$uid !== columnValues._$uid;
					});

					if (allColumnValues?.length > 1) {
						message.showAlert({
							message: this.t('com.msg.duplication', [headerText]),
						});

						this.setSelectionByIndex(
							allColumnValues[allColumnValues.length - 1],
						);
						return false;
					}
				}
			}
			return true;
		},
		/**
		 * 행 복사 시, item이나 rowIndex를 지정하여 가능하다
		 * @param {object} item
		 * @param {string} rowIndex 행이 추가될 위치('first' 가장 위/'last' 가장 아래, 'selectionUp' 선택행 위/'selectionDown' 선택행 아래)
		 */
		copyRow(item = {}, rowIndex = 'selectionDown') {
			// @Override
			const copyRows = this.getSelectedRows().map(row => {
				return { ...row, ...item };
			});
			return $ag.addRow.call($ag, this.pid, copyRows, rowIndex);
		},
		/**
		 *
		 * @param {Object} exportWithStyle fileName 등 AUI의 exportProps 설정
		 * @param {Object} drm DRM 여부
		 */
		exportToXlsx(exportWithStyle, drm = true) {
			// @Override
			let base64Data;
			let exportOption = { ...exportWithStyle, progressBar: true };

			if (drm) {
				exportOption = {
					...exportOption,
					localControl: true,

					/**
					 * AUI 그리드에서 변환된 데이터를 받아 API로 전송 → DRM이 적용된 파일을 다운로드한다
					 * @param {*} data
					 */
					localControlFunc: function (data) {
						let reader = new FileReader();
						reader.readAsDataURL(data);
						reader.onloadend = function () {
							base64Data = reader.result;
							base64Data = base64Data.split(',')[1];
							console.log('base64', base64Data); // Base64 데이터 확인

							const params = {
								fileName: exportWithStyle.fileName,
								data: base64Data,
							};

							axios
								.post('/comfunc/func/excel/download/xlsx', params, {
									responseType: 'blob',
								})
								.then(res => {
									window.saveAs(
										new Blob([res.data]),
										dataRegex.decodeDisposition(
											res.headers['content-disposition'],
										),
									);
								});
						};
					},
				};
			}

			$ag.exportToXlsx.call($ag, this.pid, exportOption);
		},
		/**
		 * 변경된 데이터를 반환한다
		 */
		getChangedData() {
			let createData = this.getAddedRowItems();
			createData.map(data => {
				data.rowStatus = 'I';
			});

			let updateData = this.getEditedRowItems();
			updateData.map(data => {
				data.rowStatus = 'U';
			});

			let deleteData = this.getRemovedItems();
			deleteData.map(data => {
				data.rowStatus = 'D';
			});

			return concat(createData, updateData, deleteData);
		},
		isModified() {
			if (
				commonUtils.isEmpty(this.getAddedRowItems()) &&
				commonUtils.isEmpty(this.getEditedRowItems()) &&
				commonUtils.isEmpty(this.getRemovedItems())
			) {
				return false;
			} else {
				return true;
			}
		},
		removeRow(rowIndex = 'selectedIndex') {
			// @Override
			return $ag.removeRow.call($ag, this.pid, rowIndex);
		},
		setGridData(gridData) {
			// @Override
			this.gridData = gridData;
			$ag.setGridData.call($ag, this.pid, arguments[0]);

			if (gridData && !this.notFocus) {
				this.setSelectionByIndex(0);
			}
		},
		/**
		 * 전달받은 데이터필드 중 빈값이 있는지 확인한다
		 * @param {Array} dataFields 데이터필드
		 */
		validateGridData(dataFields) {
			// @Override
			if (commonUtils.isEmpty(dataFields)) {
				// TO-DO 전체 감지로 바꿀지? required 컬럼 속성을 넣을지
				return true;
			}

			for (let field of dataFields) {
				let headerText = this.getColumnItemByDataField(field).headerText;
				if (!$ag.validateGridData.call($ag, this.pid, field)) {
					message.showAlert({
						message: this.t('com.msg.requiredInput', [headerText]),
					});

					return false;
				}
			}
			return true;
		},

		// validateGridData() {
		// 	// @Override 테스트 필요
		// 	let requiredField = this.getColumnLayout().filter(
		// 		field => field.required,
		// 	);

		// 	if (!$ag.validateGridData.call($ag, this.pid, requiredField)) {
		// 		message.showAlert({
		// 			message: this.t('com.msg.requiredInput', [headerText]),
		// 		});

		// 		return false;
		// 	}
		// 	return true;
		// },

		/**
		 * 수정한 행에 대하여 required 컬럼의 값 확인 (미정)
		 */
		validateRequired() {
			let changedData = this.getChangedData();
			if (commonUtils.isEmpty(changedData)) {
				return true;
			}

			let requiredField = this.getColumnLayout().filter(
				field => field.required,
			);
			for (let row of changedData) {
				for (let field of requiredField) {
					if (commonUtils.isEmpty(row[field.dataField])) {
						message.showAlert({
							message: this.t('com.msg.requiredInput', [
								this.getColumnItemByDataField(field.dataField).headerText,
							]),
						});

						this.setSelectionByIndex(this.rowIdToIndex(row._$uid));
						return false;
					}
				}
			}
			return true;
		},
	}, // methods
};
</script>

<style lang="scss" scoped>
.grid-header {
	display: flex;
	margin-bottom: 8px;
	position: relative;
	justify-content: space-between;
	align-items: center;
	height: 28px;
	.grid-title {
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
		color: var(--heading-text);
		min-height: 22px;
		.grid-total {
			font-size: 14px;
			font-weight: 400;
			letter-spacing: -1.5px;
			margin-left: 8px;
			.number {
				color: #0752c9;
				font-weight: bold;
				margin-left: 4px;
			}
			&::before {
				content: '(';
				font-weight: bold;
			}
			&::after {
				content: ')';
				font-weight: bold;
			}
		}
	}
	.grid-control {
		display: flex;
		align-items: center;
		gap: 16px;
		.grid-button {
			display: flex;
			align-items: center;
			gap: 6px;
			&:not(:has(button)) {
				display: none;
			}
			button {
				padding: 0 8px;
			}
		}
	}
}
.grid-wrapper {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.grid-body-height {
	flex-grow: 1;
}

@at-root {
	.widget {
		.grid-header {
			display: none;
		}
	}
}

.asd {
	color: blue;
	background-color: #0752c9;
}
</style>
