<!-- <template>
	<div :id="id"></div>
</template> -->

<script>
/**
 * Canal Frame 적용 방법
 * 0. AUIGrid.js, AUIGridLicense.js 경로 변경
 * 1. AUIGrid_style.css를 경로에 맞추고 AUIGrid_style.scss로 변경
 * 2. <template> 주석 처리
 * 3. created, mounted 전체 주석
 * 4. (선택) __setupGlobalReisze → __setupGlobalResize로 변경
 */
/* eslint-disable */
/**
 * AUIGrid.vue for Vue.js v1.1.20221018
 * AUIGrid v3.0.12.5 for Vue.js
 * Copyright © AUISoft Co., Ltd.
 * www.auisoft.net
 */
// 프로젝트 경로에 맞게 바꾸세요
import './AUIGrid.js';
import './AUIGridLicense.js';
import './AUIGrid_style.scss';

// 이 아래 소스는 절대 수정하지 마세요.
const $ag = window.AUIGrid;
let uuid = 0;
export default {
	props: {
		name: {
			type: String,
			default: '',
		},
		autoResize: {
			type: Boolean,
			default: true,
		},
		resizeDelayTime: {
			type: Number,
			default: 300,
		},
		gridProps: {
			type: Object,
			default() {
				return {};
			},
		},
		columnLayout: {
			type: Array,
			default() {
				return null;
			},
		},
		footerLayout: {
			type: Array,
			default() {
				return null;
			},
		},
	},
	data: () => ({
		timerId: null,
	}),
	created: function () {
		// this.uuid = uuid.toString();
		// uuid += 1;
		// this.id = 'aui-grid-wrap-' + (this.name !== '' ? this.name : this.uuid);
		// this.pid = '#' + this.id;
		// this.timerId = null;
	},
	mounted: function () {
		// const columnLayout = this.__getColumnLayoutByProxy();
		// const gridProps = this.__getGridPropsByProxy();
		// const footerLayout = this.__getFooterLayoutByProxy();
		// if (columnLayout !== null) $ag.create(this.pid, columnLayout, gridProps);
		// if (footerLayout !== null) $ag.setFooter(this.pid, footerLayout);
		// this.__setupEvents();
		// this.__setupGlobalResize();
	},
	beforeUnmount: function () {
		// for Vue 2
		this.__resetGlobalReisze();
		if ($ag.isCreated(this.pid)) $ag.destroy(this.pid);
	},
	beforeUnmount: function () {
		// for Vue 3
		this.__resetGlobalReisze();
		if ($ag.isCreated(this.pid)) $ag.destroy(this.pid);
	},
	methods: {
		__setupEvents() {
			let n, name;
			const that = this;
			const events = [
				'addColumn',
				'addRow',
				'addRowFinish',
				'addTreeColumn',
				'cellClick',
				'cellDoubleClick',
				'cellEditCancel',
				'cellEditEnd',
				'cellLongTap',
				'columnStateChange',
				'copyEnd',
				'dropCancel',
				'dropEnd',
				'filtering',
				'footerClick',
				'footerDoubleClick',
				'grouping',
				'hScrollChange',
				'notFound',
				'pageChange',
				'pageRowCountChange',
				'pasteEnd',
				'removeColumn',
				'removeRow',
				'removeSoftRows',
				'rowAllChkClick',
				'rowCheckClick',
				'selectionChange',
				'ready',
				'sorting',
				'treeLazyRequest',
				'treeOpenChange',
				'undoRedoChange',
				'updateRow',
				'updateRows',
				'vScrollChange',
			];
			const invokers = [
				'beforeInsertRow',
				'beforeRemoveColumn',
				'beforeRemoveRow',
				'beforeRemoveSoftRows',
				'cellEditBegin',
				'cellEditEndBefore',
				'contextMenu',
				'copyBegin',
				'dragBegin',
				'dropEndBefore',
				'headerClick',
				'keyDown',
				'pasteBegin',
				'rowNumCellClick',
				'rowStateCellClick',
				'selectionConstraint',
			];

			if (typeof that._events !== 'undefined') {
				// for Vue 2
				for (n in events) {
					name = events[n];
					if (that._events[name]) {
						$ag.bind(this.pid, name, function (e) {
							that.$emit(e.type, e);
						});
					}
				}
				for (n in invokers) {
					name = invokers[n];
					if (that._events[name]) {
						$ag.bind(this.pid, name, function (e) {
							return that.__invoke(e.type, e);
						});
					}
				}
			} else {
				// for Vue 3
				for (n in events) {
					name = events[n];
					let vname = 'on' + name.replace(/^[a-z]/, c => c.toUpperCase());
					if (typeof that.$attrs[vname] === 'function') {
						$ag.bind(this.pid, name, function (e) {
							that.$emit(e.type, e);
						});
					}
				}
				for (n in invokers) {
					name = invokers[n];
					let vname = 'on' + name.replace(/^[a-z]/, c => c.toUpperCase());
					if (typeof that.$attrs[vname] === 'function') {
						$ag.bind(this.pid, name, function (e) {
							return that.__invoke(e.type, e);
						});
					}
				}
			}
		},
		__invoke(n, e) {
			const that = this;
			if (typeof that._events !== 'undefined') {
				// for Vue 2
				if (that._events[n] && typeof that._events[n][0] == 'function') {
					return that._events[n][0](e);
				}
			} else {
				// for Vue 3
				let vname = 'on' + n.replace(/^[a-z]/, c => c.toUpperCase());
				return that.$attrs[vname](e);
			}
		},
		__setupGlobalResize() {
			if (!this.autoResize) return;
			window.addEventListener('resize', this.__globalResizeHandler);
		},
		__resetGlobalReisze() {
			if (!this.autoResize) return;
			window.removeEventListener('resize', this.__globalResizeHandler);
		},
		__globalResizeHandler() {
			const that = this;
			if (that.timerId !== null) {
				clearTimeout(that.timerId);
			}
			that.timerId = setTimeout(function () {
				if ($ag.isCreated(that.pid)) {
					$ag.resize();
				}
			}, that.resizeDelayTime);
		},
		__getColumnLayoutByProxy: function () {
			if (this.columnLayout === null) return null;
			else if (
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
			if (this.gridProps === null) return {};
			else if (typeof this.gridProps.gridProps === 'object') {
				return Object.assign({}, this.gridProps);
			}
			return this.gridProps;
		},
		__getFooterLayoutByProxy: function () {
			if (this.footerLayout === null) return null;
			else if (
				Array.isArray(this.footerLayout) ||
				this.footerLayout instanceof Array ||
				this.footerLayout.constructor == 'Array'
			) {
				return this.footerLayout;
			}
			return Object.assign([], this.footerLayout);
		},
		create(columnLayout, props) {
			$ag.create(this.pid, columnLayout, props);
			this.__setupEvents();
			this.__setupGlobalResize();
			return this.pid;
		},
		addCheckedRowsByIds(ids) {
			return $ag.addCheckedRowsByIds.call($ag, this.pid, arguments[0]);
		},
		addCheckedRowsByValue(dataField, value) {
			return $ag.addCheckedRowsByValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		addColumn(cItems, position) {
			return $ag.addColumn.call($ag, this.pid, arguments[0], arguments[1]);
		},
		addRow(items, rowIndex) {
			return $ag.addRow.call($ag, this.pid, arguments[0], arguments[1]);
		},
		addTreeColumn(cItems, parentDataField, position) {
			return $ag.addTreeColumn.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		addTreeRow(item, parentRowId, position) {
			return $ag.addTreeRow.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		addTreeRowByIndex(items, rowIndex) {
			$ag.addTreeRowByIndex.call($ag, this.pid, items, rowIndex);
		},
		addUncheckedRowsByIds(ids) {
			return $ag.addUncheckedRowsByIds.call($ag, this.pid, ids);
		},
		addUncheckedRowsByValue(dataField, value) {
			return $ag.addUncheckedRowsByValue.call(
				$ag,
				this.pid,
				dataField,
				value,
			);
		},
		appendData(items) {
			return $ag.appendData.call($ag, this.pid, arguments[0]);
		},
		bind(name, func) {
			return $ag.bind.call($ag, this.pid, arguments[0], arguments[1]);
		},
		changeColumnLayout(newLayout) {
			return $ag.changeColumnLayout.call($ag, this.pid, arguments[0]);
		},
		changeFooterLayout(newLayout) {
			return $ag.changeFooterLayout.call($ag, this.pid, arguments[0]);
		},
		clearFilter(dataField) {
			return $ag.clearFilter.call($ag, this.pid, arguments[0]);
		},
		clearFilterAll() {
			$ag.clearFilterAll.call($ag, this.pid);
		},
		clearGridData() {
			$ag.clearGridData.call($ag, this.pid);
		},
		clearSelection(mode) {
			$ag.clearSelection.call($ag, this.pid, arguments[0]);
		},
		clearSortingAll() {
			$ag.clearSortingAll.call($ag, this.pid);
		},
		clearUndoRedoStack() {
			$ag.clearUndoRedoStack.call($ag, this.pid);
		},
		closeFilterLayer() {
			$ag.closeFilterLayer.call($ag, this.pid);
		},
		collapseAll() {
			$ag.collapseAll.call($ag, this.pid);
		},
		destroy() {
			$ag.destroy.call($ag, this.pid);
		},
		expandAll() {
			$ag.expandAll.call($ag, this.pid);
		},
		expandItemByRowId(rowId, open, recursive) {
			return $ag.expandItemByRowId.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		exportAsCsv(props) {
			$ag.exportAsCsv.call($ag, this.pid, arguments[0]);
		},
		exportAsJson(keyValueMode, props) {
			$ag.exportAsJson.call($ag, this.pid, arguments[0], arguments[1]);
		},
		exportAsObject(keyValueMode) {
			return $ag.exportAsObject.call($ag, this.pid, arguments[0]);
		},
		exportAsPdf(props) {
			$ag.exportAsPdf.call($ag, this.pid, arguments[0]);
		},
		exportAsTxt(props) {
			$ag.exportAsTxt.call($ag, this.pid, arguments[0]);
		},
		exportAsXlsx(exportWithStyle, props) {
			$ag.exportAsXlsx.call($ag, this.pid, arguments[0], arguments[1]);
		},
		exportAsXml(props) {
			$ag.exportAsXml.call($ag, this.pid, arguments[0]);
		},
		exportToCsv(props) {
			$ag.exportToCsv.call($ag, this.pid, arguments[0]);
		},
		exportToJson(keyValueMode, props) {
			$ag.exportToJson.call($ag, this.pid, arguments[0], arguments[1]);
		},
		exportToObject(keyValueMode) {
			return $ag.exportToObject.call($ag, this.pid, arguments[0]);
		},
		exportToPdf(props) {
			$ag.exportToPdf.call($ag, this.pid, arguments[0]);
		},
		exportToTxt(props) {
			$ag.exportToTxt.call($ag, this.pid, arguments[0]);
		},
		exportToXlsx(exportWithStyle, props) {
			$ag.exportToXlsx.call($ag, this.pid, arguments[0], arguments[1]);
		},
		exportToXlsxMulti(subGridIds, props) {
			$ag.exportToXlsxMulti.call($ag, this.pid, arguments[0], arguments[1]);
		},
		exportToXml(props) {
			$ag.exportToXml.call($ag, this.pid, arguments[0]);
		},
		forceEditingComplete(value, cancel) {
			return $ag.forceEditingComplete.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getAddedColumnFields() {
			return $ag.getAddedColumnFields.call($ag, this.pid);
		},
		getAddedRowItems() {
			return $ag.getAddedRowItems.call($ag, this.pid);
		},
		getAscendantsByRowId(rowId) {
			return $ag.getAscendantsByRowId.call($ag, this.pid, arguments[0]);
		},
		getCellElementByIndex(rowIndex, columnIndex) {
			return $ag.getCellElementByIndex.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getCellFormatValue(rowIndex, dataField) {
			return $ag.getCellFormatValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getCellFormattedValue(rowIndex, dataField) {
			return $ag.getCellFormattedValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getCellValue(rowIndex, dataField) {
			return $ag.getCellValue.call($ag, this.pid, arguments[0], arguments[1]);
		},
		getCheckedRowItems() {
			return $ag.getCheckedRowItems.call($ag, this.pid);
		},
		getCheckedRowItemsAll() {
			return $ag.getCheckedRowItemsAll.call($ag, this.pid);
		},
		getColumnCount() {
			return $ag.getColumnCount.call($ag, this.pid);
		},
		getColumnDistinctValues(dataField, total) {
			return $ag.getColumnDistinctValues.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getColumnIndexByDataField(dataField) {
			return $ag.getColumnIndexByDataField.call($ag, this.pid, arguments[0]);
		},
		getColumnInfoList() {
			return $ag.getColumnInfoList.call($ag, this.pid);
		},
		getColumnItemByDataField(dataField) {
			return $ag.getColumnItemByDataField.call($ag, this.pid, arguments[0]);
		},
		getColumnLayout() {
			return $ag.getColumnLayout.call($ag, this.pid);
		},
		getColumnValues(dataField, total) {
			return $ag.getColumnValues.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getCurrentPageData() {
			return $ag.getCurrentPageData.call($ag, this.pid);
		},
		getDataFieldByColumnIndex(idx) {
			return $ag.getDataFieldByColumnIndex.call($ag, this.pid, arguments[0]);
		},
		getDepthByRowId(rowId) {
			return $ag.getDepthByRowId.call($ag, this.pid, arguments[0]);
		},
		getDescendantsByRowId(rowId) {
			return $ag.getDescendantsByRowId.call($ag, this.pid, arguments[0]);
		},
		getEditedRowColumnItems() {
			return $ag.getEditedRowColumnItems.call($ag, this.pid);
		},
		getEditedRowItems() {
			return $ag.getEditedRowItems.call($ag, this.pid);
		},
		getFilterCache() {
			return $ag.getFilterCache.call($ag, this.pid);
		},
		getFilterInlineTexts() {
			return $ag.getFilterInlineTexts.call($ag, this.pid);
		},
		getFitColumnSizeList(fitToGrid) {
			return $ag.getFitColumnSizeList.call($ag, this.pid, arguments[0]);
		},
		getFooterData() {
			return $ag.getFooterData.call($ag, this.pid);
		},
		getFooterFormatValueByDataField(posField) {
			return $ag.getFooterFormatValueByDataField.call(
				$ag,
				this.pid,
				arguments[0],
			);
		},
		getFooterLayout() {
			return $ag.getFooterLayout.call($ag, this.pid);
		},
		getFooterValueByDataField(posField) {
			return $ag.getFooterValueByDataField.call($ag, this.pid, arguments[0]);
		},
		getGridData() {
			return $ag.getGridData.call($ag, this.pid);
		},
		getHiddenColumnDataFields() {
			return $ag.getHiddenColumnDataFields.call($ag, this.pid);
		},
		getHiddenColumnIndexes() {
			return $ag.getHiddenColumnIndexes.call($ag, this.pid);
		},
		getInitCellValue(rowId, dataField) {
			return $ag.getInitCellValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getInitValueItem(rowId) {
			return $ag.getInitValueItem.call($ag, this.pid, arguments[0]);
		},
		getItemByRowId(rowIdValue) {
			return $ag.getItemByRowId.call($ag, this.pid, arguments[0]);
		},
		getItemByRowIndex(rowIndex) {
			return $ag.getItemByRowIndex.call($ag, this.pid, arguments[0]);
		},
		getItemsByValue(dataField, value) {
			return $ag.getItemsByValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getMergeEndRowIndex(rowIndex, columnIndex) {
			return $ag.getMergeEndRowIndex.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getMergeItems(rowIndex, columnIndex) {
			return $ag.getMergeItems.call($ag, this.pid, arguments[0], arguments[1]);
		},
		getMergeStartRowIndex(rowIndex, columnIndex) {
			return $ag.getMergeStartRowIndex.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getOrgCellValue(uid, dataField) {
			return $ag.getOrgCellValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getOrgGridData() {
			return $ag.getOrgGridData.call($ag, this.pid);
		},
		getOrgValueItem(uids) {
			return $ag.getOrgValueItem.call($ag, this.pid, arguments[0]);
		},
		getParentColumnByDataField(dataField) {
			return $ag.getParentColumnByDataField.call($ag, this.pid, arguments[0]);
		},
		getParentItemByRowId(rowId) {
			return $ag.getParentItemByRowId.call($ag, this.pid, arguments[0]);
		},
		getProp(name) {
			return $ag.getProp.call($ag, this.pid, arguments[0]);
		},
		getProperty(name) {
			return $ag.getProperty.call($ag, this.pid, arguments[0]);
		},
		getRemovedColumnFields() {
			return $ag.getRemovedColumnFields.call($ag, this.pid);
		},
		getRemovedItems(includeAdded) {
			return $ag.getRemovedItems.call($ag, this.pid, arguments[0]);
		},
		getRemovedNewItems() {
			return $ag.getRemovedNewItems.call($ag, this.pid);
		},
		getRowCount() {
			return $ag.getRowCount.call($ag, this.pid);
		},
		getRowIndexesByValue(dataField, values) {
			return $ag.getRowIndexesByValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		getRowPosition() {
			return $ag.getRowPosition.call($ag, this.pid);
		},
		getRowsByValue(dataField, values) {
			return $ag.getRowsByValue.call($ag, this.pid, arguments[0], arguments[1]);
		},
		getScaleFactor() {
			return $ag.getScaleFactor.call($ag, this.pid);
		},
		getSelectedColIndexes() {
			return $ag.getSelectedColIndexes.call($ag, this.pid);
		},
		getSelectedIndex() {
			return $ag.getSelectedIndex.call($ag, this.pid);
		},
		getSelectedItems() {
			return $ag.getSelectedItems.call($ag, this.pid);
		},
		getSelectedRows() {
			return $ag.getSelectedRows.call($ag, this.pid);
		},
		getSelectedText(exceptHidden) {
			return $ag.getSelectedText.call($ag, this.pid, arguments[0]);
		},
		getSortingFields() {
			return $ag.getSortingFields.call($ag, this.pid);
		},
		getStateCache() {
			return $ag.getStateCache.call($ag, this.pid);
		},
		getTreeFilteredFlatData() {
			return $ag.getTreeFilteredFlatData.call($ag, this.pid);
		},
		getTreeFlatData() {
			return $ag.getTreeFlatData.call($ag, this.pid);
		},
		getTreeGridData() {
			return $ag.getTreeGridData.call($ag, this.pid);
		},
		getTreeTotalDepth() {
			return $ag.getTreeTotalDepth.call($ag, this.pid);
		},
		hideColumnByDataField(dataField) {
			return $ag.hideColumnByDataField.call($ag, this.pid, arguments[0]);
		},
		hideColumnGroup(dataField) {
			return $ag.hideColumnGroup.call($ag, this.pid, arguments[0]);
		},
		hideFooterLater() {
			$ag.hideFooterLater.call($ag, this.pid);
		},
		indentTreeDepth() {
			$ag.indentTreeDepth.call($ag, this.pid);
		},
		indexToRowId(rowIndex) {
			return $ag.indexToRowId.call($ag, this.pid, arguments[0]);
		},
		isAddedById(uid) {
			return $ag.isAddedById.call($ag, this.pid, arguments[0]);
		},
		isAvailabePdf() {
			return $ag.isAvailabePdf.call($ag, this.pid);
		},
		isAvailableLocalDownload() {
			return $ag.isAvailableLocalDownload.call($ag, this.pid);
		},
		isCheckedRowById(id) {
			return $ag.isCheckedRowById.call($ag, this.pid, arguments[0]);
		},
		isCreated() {
			return $ag.isCreated.call($ag, this.pid);
		},
		isEditedById(uid) {
			return $ag.isEditedById.call($ag, this.pid, arguments[0]);
		},
		isEditedCell(uid, dataField) {
			return $ag.isEditedCell.call($ag, this.pid, arguments[0], arguments[1]);
		},
		isFilteredGrid() {
			return $ag.isFilteredGrid.call($ag, this.pid);
		},
		isItemBranchByRowId(rowId) {
			return $ag.isItemBranchByRowId.call($ag, this.pid, arguments[0]);
		},
		isItemOpenByRowId(rowId) {
			return $ag.isItemOpenByRowId.call($ag, this.pid, arguments[0]);
		},
		isItemVisibleByRowId(rowId) {
			return $ag.isItemVisibleByRowId.call($ag, this.pid, arguments[0]);
		},
		isMergedCell(rowIndex, columnIndex) {
			return $ag.isMergedCell.call($ag, this.pid, arguments[0], arguments[1]);
		},
		isOpenFilterLayer() {
			return $ag.isOpenFilterLayer.call($ag, this.pid);
		},
		isRemovedById(uid) {
			return $ag.isRemovedById.call($ag, this.pid, arguments[0]);
		},
		isSortedGrid() {
			return $ag.isSortedGrid.call($ag, this.pid);
		},
		isTreeGrid() {
			return $ag.isTreeGrid.call($ag, this.pid);
		},
		isUniqueValue(dataField, value) {
			return $ag.isUniqueValue.call($ag, this.pid, arguments[0], arguments[1]);
		},
		movePageTo(pageNum, maintainVScroll, maintainHScroll) {
			return $ag.movePageTo.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		moveRows2Down() {
			return $ag.moveRows2Down.call($ag, this.pid);
		},
		moveRows2Up() {
			return $ag.moveRows2Up.call($ag, this.pid);
		},
		moveRowsToDown() {
			return $ag.moveRowsToDown.call($ag, this.pid);
		},
		moveRowsToUp() {
			return $ag.moveRowsToUp.call($ag, this.pid);
		},
		moveRowToIndex(rowId, toRowIndex) {
			return $ag.moveRowToIndex.call($ag, this.pid, rowId, toRowIndex);
		},
		openFilterLayer(dataField) {
			return $ag.openFilterLayer.call($ag, this.pid, arguments[0]);
		},
		openInputer() {
			return $ag.openInputer.call($ag, this.pid);
		},
		outdentTreeDepth() {
			$ag.outdentTreeDepth.call($ag, this.pid);
		},
		redo() {
			$ag.redo.call($ag, this.pid);
		},
		redoable() {
			return $ag.redoable.call($ag, this.pid);
		},
		refresh() {
			$ag.refresh.call($ag, this.pid);
		},
		refreshRows(items, style, flashTime) {
			return $ag.refreshRows.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		removeAjaxLoader() {
			$ag.removeAjaxLoader.call($ag, this.pid);
		},
		removeCheckedRows() {
			return $ag.removeCheckedRows.call($ag, this.pid);
		},
		removeColumn(columnIndex) {
			$ag.removeColumn.call($ag, this.pid, arguments[0]);
		},
		removeInfoMessage() {
			$ag.removeInfoMessage.call($ag, this.pid);
		},
		removeRow(rowIndex) {
			return $ag.removeRow.call($ag, this.pid, arguments[0]);
		},
		removeRowByRowId(rowIds) {
			return $ag.removeRowByRowId.call($ag, this.pid, arguments[0]);
		},
		removeSoftRows(ids) {
			return $ag.removeSoftRows.call($ag, this.pid, arguments[0]);
		},
		removeToastMessage() {
			$ag.removeToastMessage.call($ag, this.pid);
		},
		resetUpdatedColumns(opts) {
			$ag.resetUpdatedColumns.call($ag, this.pid, arguments[0]);
		},
		resetUpdatedItemById(rowId, flag) {
			$ag.resetUpdatedItemById.call($ag, this.pid, arguments[0], arguments[1]);
		},
		resetUpdatedItems(flag) {
			$ag.resetUpdatedItems.call($ag, this.pid, arguments[0]);
		},
		resize(w, h) {
			$ag.resize.call($ag, this.pid, arguments[0], arguments[1]);
		},
		restoreEditedCells(cells) {
			$ag.restoreEditedCells.call($ag, this.pid, arguments[0]);
		},
		restoreEditedRows(rowIndex) {
			$ag.restoreEditedRows.call($ag, this.pid, arguments[0]);
		},
		restoreSoftRows(flag) {
			return $ag.restoreSoftRows.call($ag, this.pid, arguments[0]);
		},
		rowIdToIndex(rowId) {
			return $ag.rowIdToIndex.call($ag, this.pid, arguments[0]);
		},
		search(dataField, term, opts) {
			return $ag.search.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		searchAll(term, opts) {
			return $ag.searchAll.call($ag, this.pid, arguments[0], arguments[1]);
		},
		selectRowsByRowId(rowIds) {
			return $ag.selectRowsByRowId.call($ag, this.pid, arguments[0]);
		},
		setAllCheckedRows(check) {
			$ag.setAllCheckedRows.call($ag, this.pid, arguments[0]);
		},
		setCellMerge(flag) {
			$ag.setCellMerge.call($ag, this.pid, arguments[0]);
		},
		setCellValue(rowIndex, dataField, value) {
			return $ag.setCellValue.call(
				$ag,
				this.pid,
				rowIndex,
				dataField,
				value,
			);
		},
		setCheckedRowsByIds(ids) {
			return $ag.setCheckedRowsByIds.call($ag, this.pid, arguments[0]);
		},
		setCheckedRowsByValue(dataField, value) {
			return $ag.setCheckedRowsByValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		setColumnChildOrder(dataFieldOrders) {
			$ag.setColumnChildOrder.call($ag, this.pid, arguments[0]);
		},
		setColumnOrder(dataFieldOrders) {
			$ag.setColumnOrder.call($ag, this.pid, arguments[0]);
		},
		setColumnProp(columnIndex, obj) {
			$ag.setColumnProp.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setColumnPropByDataField(dataField, obj) {
			$ag.setColumnPropByDataField.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		setColumnSizeList(value) {
			return $ag.setColumnSizeList.call($ag, this.pid, arguments[0]);
		},
		setCsvGridData(gridData, isSimple) {
			return $ag.setCsvGridData.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setEditingInputValue(value) {
			return $ag.setEditingInputValue.call($ag, this.pid, arguments[0]);
		},
		setFilter(dataField, func) {
			return $ag.setFilter.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setFilterByValues(dataField, values) {
			return $ag.setFilterByValues.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		setFilterCache(cache) {
			$ag.setFilterCache.call($ag, this.pid, arguments[0]);
		},
		setFilterInlineTexts(values) {
			$ag.setFilterInlineTexts.call($ag, this.pid, arguments[0]);
		},
		setFixedColumnCount(value) {
			$ag.setFixedColumnCount.call($ag, this.pid, arguments[0]);
		},
		setFixedRowCount(value) {
			$ag.setFixedRowCount.call($ag, this.pid, arguments[0]);
		},
		setFocus() {
			$ag.setFocus.call($ag, this.pid);
		},
		setFooter(footerData) {
			return $ag.setFooter.call($ag, this.pid, arguments[0]);
		},
		setGridData(gridData) {
			return $ag.setGridData.call($ag, this.pid, arguments[0]);
		},
		setGroupBy(groupingFields, summaryProps) {
			return $ag.setGroupBy.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setHScrollPosition(columnIndex) {
			return $ag.setHScrollPosition.call($ag, this.pid, arguments[0]);
		},
		setHScrollPositionByPx(px) {
			return $ag.setHScrollPositionByPx.call($ag, this.pid, arguments[0]);
		},
		setHeaderRendererProp(columnIndex, obj) {
			$ag.setHeaderRendererProp.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setInfoMessage(msgHTML) {
			$ag.setInfoMessage.call($ag, this.pid, arguments[0]);
		},
		setPageRowCount(count) {
			$ag.setPageRowCount.call($ag, this.pid, arguments[0]);
		},
		setProp(obj, value) {
			$ag.setProp.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setProperty(obj, value) {
			return $ag.setProperty.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setRendererProp(columnIndex, obj) {
			$ag.setRendererProp.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setRowPosition(rowPosition) {
			return $ag.setRowPosition.call($ag, this.pid, arguments[0]);
		},
		setScaleFactor(value) {
			$ag.setScaleFactor.call($ag, this.pid, arguments[0]);
		},
		setSelectionAll() {
			$ag.setSelectionAll.call($ag, this.pid);
		},
		setSelectionBlock(sr, er, sc, ec) {
			$ag.setSelectionBlock.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
				arguments[3],
			);
		},
		setSelectionByIndex(rowIndex, columnIndex) {
			return $ag.setSelectionByIndex.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		setSelectionColumn(startColIdx, endColIdx) {
			return $ag.setSelectionColumn.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		setSelectionMode(mode) {
			return $ag.setSelectionMode.call($ag, this.pid, arguments[0]);
		},
		setSorting(sortingInfoArr, onlyLastDepthSorting) {
			return $ag.setSorting.call($ag, this.pid, arguments[0], arguments[1]);
		},
		setXmlGridData(gridData, selector) {
			return $ag.setXmlGridData.call($ag, this.pid, arguments[0], arguments[1]);
		},
		showAjaxLoader() {
			$ag.showAjaxLoader.call($ag, this.pid);
		},
		showAllColumns() {
			$ag.showAllColumns.call($ag, this.pid);
		},
		showColumnByDataField(dataField) {
			return $ag.showColumnByDataField.call($ag, this.pid, arguments[0]);
		},
		showColumnGroup(dataField) {
			return $ag.showColumnGroup.call($ag, this.pid, arguments[0]);
		},
		showFooterLater() {
			$ag.showFooterLater.call($ag, this.pid);
		},
		showInfoMessage(msgHTML) {
			$ag.showInfoMessage.call($ag, this.pid, arguments[0]);
		},
		showItemsOnDepth(depth) {
			return $ag.showItemsOnDepth.call($ag, this.pid, arguments[0]);
		},
		showToastMessage(rowIndex, columnIndex, msg) {
			return $ag.showToastMessage.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		syncGridData(gridData, stateCache) {
			$ag.syncGridData.call($ag, this.pid, arguments[0], arguments[1]);
		},
		unbind(name, func) {
			return $ag.unbind.call($ag, this.pid, arguments[0], arguments[1]);
		},
		undo() {
			$ag.undo.call($ag, this.pid);
		},
		undoable() {
			return $ag.undoable.call($ag, this.pid);
		},
		update() {
			$ag.update.call($ag, this.pid);
		},
		updateAllToValue(dataField, value) {
			return $ag.updateAllToValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		updateGrouping() {
			$ag.updateGrouping.call($ag, this.pid);
		},
		updateRow(item, rowIndex, isMarkEdited) {
			return $ag.updateRow.call(
				$ag,
				this.pid,
				item,
				rowIndex,
				isMarkEdited,
			);
		},
		updateRowBlockToValue(start, end, dataField, value) {
			$ag.updateRowBlockToValue.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
				arguments[3],
			);
		},
		updateRows(items, rowIndexes, isMarkEdited) {
			return $ag.updateRows.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
		updateRowsById(items, isMarkEdited) {
			return $ag.updateRowsById.call($ag, this.pid, arguments[0], arguments[1]);
		},
		validateChangedGridData(dataFields, msg) {
			return $ag.validateChangedGridData.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		validateGridData(fields, msg) {
			return $ag.validateGridData.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
			);
		},
		validateGridDataByFunc(fields, validFunc, msg) {
			return $ag.validateGridDataByFunc.call(
				$ag,
				this.pid,
				arguments[0],
				arguments[1],
				arguments[2],
			);
		},
	},
};

export const agUtils = {
	formatDate: $ag.formatDate,
	formatNumber: $ag.formatNumber,
	getActiveGrid: $ag.getActiveGrid,
	getCreatedGridAll: $ag.getCreatedGridAll,
	makeValueMasked: $ag.makeValueMasked,
	makeValueUnmasked: $ag.makeValueUnmasked,
	releaseDate: $ag.releaseDate,
	version: $ag.version,
};
</script>
