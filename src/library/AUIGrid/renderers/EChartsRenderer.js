// Apache ECharts is licensed under Apache License 2.0.
// https://echarts.apache.org/en/download.html
import * as echarts from 'echarts';

/* eslint-disable */
/*
 * AUIGrid �ъ슜�� �뺤쓽 �뚮뜑��
 */
export default window.AUIGrid.Class({
	/****************************************************************
	 *
	 * Overriden Properties
	 *
	 ****************************************************************/

	/* �앹꽦�� HTML Tag 紐� */
	tagName: 'div',

	/* CSS �ㅽ��� �대옒�� */
	cssClass: 'aui-grid-renderer-base aui-grid-renderer-custom',

	/* �� �꾩씠�� */
	data: null,

	/* �뚮뜑�ъ쓽 移쇰읆 �덉씠�꾩썐 �곗씠�� */
	columnData: null,

	/* 移쇰읆 �몃뜳�� */
	columnIndex: -1,

	/* �� �몃뜳�� */
	rowIndex: -1,

	/* �ㅻ뜑 �띿뒪�� */
	headerText: '',

	/* �곗씠�� �꾨뱶紐� */
	dataField: '',

	/* 珥덇린�� �щ� */
	initialized: false,

	/****************************************************************
	 *
	 * Private Properties
	 *
	 * Rule : Private Properties �� 諛섎뱶�� __ 濡� �쒖옉�섏떗�쒖삤
	 * 利�, �ъ슜�먭� 異붽��섎뒗 �띿꽦, 硫붿냼�쒕뒗 __ 濡� �쒖옉�섏떗�쒖삤.
	 *
	 ****************************************************************/

	/* echart  媛앹껜 */
	__chart: null,

	/****************************************************************
	 *
	 * Overriden Methods
	 *
	 ****************************************************************/

	/*
	 * @Overriden public update
	 *
	 * 洹몃━�쒖뿉 �섑빐 �몄텧�섎뒗 硫붿냼�쒖씠硫� 鍮덈쾲�� �몄텧�⑸땲��.
	 * �� 硫붿냼�쒖뿉�� DOM 寃��됱씠��, jQuery 媛앹껜 �앹꽦 �깆� �먯젣�섏떗�쒖삤.
	 * DOM 寃��됱씠�� jQuery 媛앹껜�� initialize() 硫붿냼�쒖뿉�� �섏떗�쒖삤.
	 */
	update: function () {
		var data = this.data;

		if (!data) return;

		// 理쒖큹 1�뚮쭔 �ㅽ뻾�댁빞 �� 寃껊뱾.
		if (!this.initialized) {
			this.initialize();
		}

		// �ㅼ젣 echart  異쒕젰
		this.__drawChart();
	},

	/*
	 * @Overriden public destroy
	 *
	 * �ш린�� �댁젣�� 寃� 紐⑤몢 �댁젣 �섏떗�쒖삤.
	 * 硫붾え由� �꾩닔瑜� �좊컻�섎뒗 肄붾뱶�ㅼ쓣 紐⑤몢 �댁젣 �섏떗�쒖삤.
	 */
	destroy: function (unload) {
		// echart  �쒓굅
		this.__chart.clear();

		this.__chart = null;

		// �꾩닔 : 諛섎뱶�� �꾨옒 肄붾뱶�� 異붽� �댁빞 �⑸땲��.
		this.$super.destroy(unload);
	},

	/*
	 * @Overriden public initialize
	 *
	 * 理쒖큹 1踰덈쭔 �ㅽ뻾�섎�濡� �ㅼ젙�� �ы빆�� �덉쑝硫� �ш린�� �ㅼ젙�섏떗�쒖삤.
	 */
	initialize: function () {
		if (this.initialized) return;

		this.initialized = true;

		// echarts 珥덇린��
		this.__chart = echarts.init(this.element, '', {
			width: this.width,
			height: 100
		});
	},

	/****************************************************************
	 *
	 * Private Methods
	 *
	 * Rule : Private Methods �� 諛섎뱶�� __ 濡� �쒖옉�섏떗�쒖삤
	 * 利�, �ъ슜�먭� 異붽��섎뒗 �띿꽦, 硫붿냼�쒕뒗 __ 濡� �쒖옉�섏떗�쒖삤.
	 *
	 ****************************************************************/

	/* echart 異쒕젰�섍린 */
	__drawChart: function () {
		let option;
		const item = this.data;

		// �ㅼ쓬 李멸퀬�섏뿬 �묒꽦��.
		// https://echarts.apache.org/examples/en/editor.html?c=pie-simple
		option = {
			tooltip: {
				confine: true,
				trigger: 'item'
			},
			series: [
				{
					name: item.region,
					type: 'pie',
					radius: '50%',
					data: [
						{ value: item.q1, name: 'Q1' },
						{ value: item.q2, name: 'Q2' },
						{ value: item.q3, name: 'Q3' },
						{ value: item.q4, name: 'Q4' }
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};

		option && this.__chart.setOption(option);
	}
}).extend(window.AUIGrid.RendererBase);