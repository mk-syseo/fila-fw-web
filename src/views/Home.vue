<template>
	<div class="home-wrap">
		<div class="home-title">
			<div class="title">
				{{ t('sample.hello') }}, {{ useUserStore().user.userNm }}님
			</div>
			<div class="desc">
				여기는 {{ useLocalStorage('user', 'locale') }} 입니다.
			</div>
		</div>

		<FGridRow is-grid-cols="3" class="grow">
			<FGridCol>
				<FWidget name="쪽지">
					<FTabs class="ver-third">
						<FTab title="받은쪽지" class="py-[16px]">
							<ul class="home-list">
								<li>거래처 등록 요청 승인 빨리해주세요<span>1시간전</span></li>
								<li>A/S 건 확인 가능한가요<span>11.10</span></li>
								<li>SS 프로모션 기간 , 할인율 확인 요청<span>11.10</span></li>
								<li>안성점 재고 확인하고 보내주세요<span>11.10</span></li>
								<li>거래처 등록 요청 승인 빨리해주세요<span>11.10</span></li>
							</ul>
						</FTab>
						<FTab title="보낸쪽지"> 22 </FTab>
					</FTabs>
				</FWidget>
			</FGridCol>
			<FGridCol>
				<FWidget name="브랜드 매출현황">
					<AUIGrid ref="refGrid01" :data="list01" :column-layout="columns01" />
				</FWidget>
			</FGridCol>
			<FGridCol>
				<FWidget name="내 스타일 현황">
					<FSelect
						v-model="selectValue"
						:options="options"
						placeholder="스타일 코드 선택"
						class="h32"
					/>
					<ul class="home-list mt-[16px] font-bold">
						<li>자재입고현황</li>
						<li>매출현황</li>
						<li>재고현황</li>
						<li>지점별 판매 현황</li>
						<li>수선 현황</li>
					</ul>
				</FWidget>
			</FGridCol>
			<FGridCol>
				<FWidget add />
			</FGridCol>
		</FGridRow>

		<div class="home-footer">
			<dl>
				<dd>© 2024 FILA Holdings Corp. ALL RIGHTS RESERVED</dd>
				<dd>
					<FIcon icon="ico-16-time" />최근접속 : 2023 07 31 17:03:17
					<FButton>IT지원</FButton>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script setup>
import FGridRow from '@/components/FGridRow.vue';
import FGridCol from '@/components/FGridCol.vue';
import FButton from '@/components/FButton.vue';
import FIcon from '@/components/FIcon.vue';
import AUIGrid from '@/components/AUIGrid.vue';

import FWidget from '@/components/FWidget.vue';
import FSelect from '@/components/FSelect.vue';

import FTabs from '@/components/tab/FTabs.vue';
import FTab from '@/components/tab/FTab.vue';

const selectValue = ref('');

const options = [
	{
		label: '첫번째',
		value: 'first',
	},
	{
		label: '두번째',
		value: 'second',
	},
	{
		label: '세번째',
		value: 'third',
	},
];

import useUserStore from '@/stores/userStore';
import { useLocalStorage } from '@/utils/useLocalStorage';

const { t } = useI18n();
const refGrid01 = ref(null);

const columns01 = [
	{
		headerText: '브랜드',
		dataField: 'col001',
	},
	{
		headerText: 'Daily',
		dataField: 'col002',
	},
	{
		headerText: 'MTD',
		dataField: 'col003',
	},
	{
		headerText: 'Target',
		dataField: 'col004',
	},
	{
		headerText: '진도율',
		dataField: 'col005',
	},
];
const list01 = ref([
	{
		col001: 'Fila',
		col002: '12',
		col003: '30',
		col004: '7,021',
		col005: '30%',
	},
	{
		col001: 'Golf',
		col002: '889',
		col003: '54',
		col004: '4,112',
		col005: '45%',
	},
	{
		col001: 'Intimo',
		col002: '889',
		col003: '54',
		col004: '4,112',
		col005: '45%',
	},
	{
		col001: 'Kids',
		col002: '889',
		col003: '54',
		col004: '4,112',
		col005: '45%',
	},
	{
		col001: 'Outlet',
		col002: '889',
		col003: '54',
		col004: '4,112',
		col005: '45%',
	},
]);

onMounted(() => {
	refGrid01.value.setGridData(list01.value);
});
</script>

<style lang="scss" scoped>
.home-wrap {
	display: flex;
	flex-direction: column;
	gap: 24px;
	// height: 100%;
	.home-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		li {
			font-size: 14px;
			color: var(--basic-text);
			list-style: inside;
			span {
				margin-left: 5px;
				color: #999;
			}
		}
	}
	.home-title {
		.title {
			font-size: 24px;
			color: var(--heading-text);
			margin-bottom: 12px;
			font-weight: bold;
		}
		.desc {
			font-size: 14px;
			color: var(--bread-crumb-color);
		}
	}
	.home-footer {
		border-top: 1px solid var(--border-color);
		padding-top: 20px;
		dl {
			display: flex;
			align-items: center;
			gap: 80px;
			dd {
				display: flex;
				align-items: center;
				font-size: 14px;
				color: var(--desc-color);
				img {
					margin-right: 8px;
				}
				button {
					padding: 0 8px;
					height: 24px;
					margin-left: 32px;
				}
			}
		}
	}
}
</style>
