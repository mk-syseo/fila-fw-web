/* eslint-disable */
/*
 * AUIGrid 사용자 정의 렌더러 - @vuepic/vue-datepicker
 */
import { h, render } from 'vue';
import FPopSelect from '@/components/FPopSelect.vue';

export default window.AUIGrid.Class({
	/****************************************************************
	 *
	 * Overriden Properties
	 *
	 ****************************************************************/
	/* 생성될 HTML Tag 명 */
	tagName: 'div',

	/* CSS 스타일 클래스 */
	cssClass: 'aui-grid-renderer-base aui-grid-renderer-custom',

	/* 행 아이템 */
	data: null,

	/* 렌더러의 칼럼 레이아웃 데이터 */
	columnData: null,

	/* 칼럼 인덱스 */
	columnIndex: -1,

	/* 행 인덱스 */
	rowIndex: -1,

	/* 헤더 텍스트 */
	headerText: '',

	/* 데이터 필드명 */
	dataField: '',

	/* 초기화 여부 */
	initialized: false,

	/****************************************************************
	 *
	 * Private Properties
	 *
	 * Rule : Private Properties 는 반드시 __ 로 시작하십시오
	 * 즉, 사용자가 추가하는 속성, 메소드는 __ 로 시작하십시오.
	 *
	 ****************************************************************/

	/* 사용자가 작성할 엘리먼트*/
	__props: null,
	__grid: null,

	/****************************************************************
	 *
	 * Overriden Methods
	 *
	 ****************************************************************/

	/*
	 * @Overriden public update
	 *
	 * 그리드에 의해 호출되는 메소드이며 빈번히 호출됩니다.
	 * 이 메소드에서 DOM 검색이나, jQuery 객체 생성 등은 자제하십시오.
	 * DOM 검색이나 jQuery 객체는 initialize() 메소드에서 하십시오.
	 */
	update: function () {
		// 행 아이템
		if (!this.data) return;

		// 최초 1회만 실행해야 할 것들.
		if (!this.initialized) {
			this.initialize();
		}

		this.__drawPopup();
	},

	/*
	 * @Overriden public destroy
	 *
	 * 여기서 해제할 것 모두 해제 하십시오.
	 * 메모리 누수를 유발하는 코드들을 모두 해제 하십시오.
	 */
	destroy: function (unload) {
		this.__props = null;
		this.__grid = null;

		// 필수 : 반드시 아래 코드는 추가 해야 합니다.
		this.$super.destroy(unload);
	},

	/*
	 * @Overriden public initialize
	 *
	 * 최초 1번만 실행되므로 설정할 사항이 있으면 여기서 설정하십시오.
	 */
	initialize: function () {
		if (this.initialized) return;
		this.initialized = true;

		this.__grid = window.AUIGrid;
		this.__props = this.columnData.renderer.props;

		this.__drawPopup();

		// style
		// .aui-grid-renderer-base 하위에 아래 요소
        // dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg > { border: none, background: transparent; }
	},
	/****************************************************************
	 *
	 * Private Methods
	 *
	 * Rule : Private Methods 는 반드시 __ 로 시작하십시오
	 * 즉, 사용자가 추가하는 속성, 메소드는 __ 로 시작하십시오.
	 *
	 ****************************************************************/
	__drawPopup: function() {
		// 행추가 시 중복하여 생성되는 것을 방지하기위함
		const parentChild = this.element.parentElement.children;
		while(parentChild.length > 2) {
			this.element.parentElement.removeChild(parentChild[1]);
		}
		const vnode = h(FPopGroupList, 
			{
				modelValue: this.data[this.dataField],
        comGrpCd: 'comGrpCd',
        grpCdNm: 'grpCdNm',
				...this.__props,
				'onUpdate:modelValue': value => this.__updateDate(value),
			}
		);
    console.log(vnode);
    render(vnode, this.element.parentElement);
	},
	__updateDate: function(date) {
		// if(this.__props.year){
		// 	// __props.year : true -> dayjs 미사용
		// 	this.__grid.setCellValue(this.pid, this.rowIndex, this.columnIndex, date.toString());
		// 	this.data[this.dataField] = date.toString();
		// }else{
		// 	this.__grid.setCellValue(this.pid, this.rowIndex, this.columnIndex, dayjs(date).format(this.__props.format.replace('yyyy', 'YYYY').replace('dd', 'DD')));
		// 	this.data[this.dataField] = dayjs(date).format(this.__props.format.replace('yyyy', 'YYYY').replace('dd', 'DD'));
		// }
		//this.__drawDatepicker();
	}
}).extend(AUIGrid.RendererBase);
