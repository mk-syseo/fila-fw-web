<!-- 
	*************************************************************
	파일명	: CustomPagination.vue
	설명		: [공통] Custom 페이징
	메뉴		: 공통 컴포넌트
	비고		: 버튼 비활성화를 원할 시에는
				<li :class="[{ 'prev-end': true }, { disabled: isHidden('prev-end') }]">
					<FButton :disabled="currentPage - pageSize < 1" />
					<FButton :disabled="currentPage === 1" />
					<FButton :disabled="currentPage === totalPage || totalPage === 0" />
					<FButton :disabled="currentPage >= totalPage - pageSize" />
				</li>
				버튼 숨김을 원할 시에는
				v-if="isHidden('prev-end')"
	*************************************************************
-->
<template>
	<ul class="pagination">
		<!-- prev -->
		<li v-if="isHidden('prev-end')" :class="[{ 'prev-end': true }]">
			<FButton
				text
				icon="ico-page-first"
				@click="onClickPageMove('prev-end')"
			/>
		</li>
		<li v-if="isHidden('prev')" :class="[{ prev: true }]">
			<FButton text icon="ico-page-prev" @click="onClickPageMove('prev-one')" />
		</li>

		<!-- Page 버튼 -->
		<li
			v-for="page in pageList"
			:key="page"
			:class="[currentPage === page ? 'active' : '']"
			@click="onClickPageButton(page)"
		>
			<a>{{ page }}</a>
		</li>

		<!-- next -->
		<li v-if="isHidden('next')" :class="[{ next: true }]">
			<FButton text icon="ico-page-next" @click="onClickPageMove('next-one')">
			</FButton>
		</li>
		<li v-if="isHidden('next-end')" :class="[{ 'next-end': true }]">
			<FButton text icon="ico-page-last" @click="onClickPageMove('next-end')" />
		</li>
	</ul>
</template>

<script setup>
import FButton from '@/components/FButton.vue';

const props = defineProps({
	modelValue: {
		type: Number,
		required: true,
	},
	current: {
		type: Number,
	},
	size: {
		type: Number,
	},
	total: {
		type: Number,
	},
	perPage: {
		type: Boolean,
	},
});

const emit = defineEmits(['update:modelValue', 'change:page']);

const currentPage = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

onMounted(() => {
	chageTotalPage(totalPage.value);
});

const pageSize = computed(() => props.size);
const totalPage = computed(() => props.total);
const pageList = ref([]);

watch(totalPage, value => {
	chageTotalPage(value);
});

/**
 * 현재 페이지에 초기화 기능이 있는 경우 주석 해제하여 사용
 */
// watch(currentPage, value => {
// 	if (value === 1) {
// 		currentPage.value = value;
// 		pageList.value = loadPageList('prev', value);
// 	}
// });

/**
 * 버튼 숨김처리
 * @param {*} type
 * @return {boolean} 숨김여부(true - 숨김)
 */
function isHidden(type) {
	if (type === 'prev-end' || type === 'prev') {
		return pageList.value[0] === 1 ? false : true;
	} else {
		return pageList.value[pageList.value.length - 1] >= totalPage.value
			? false
			: true;
	}
}

/**
 * TotalPage 변경 event
 * 부모 화면에서 재조회 한 경우
 * @param {*} value
 */
function chageTotalPage(value) {
	let cnt = 0;
	if (value != 0) {
		if (value > pageSize.value) {
			cnt = pageSize.value;
		} else {
			cnt = value;
		}
	} else {
		// 조회 데이터 없는 경우 1 버튼 활성화 (default)
		cnt = 1;
	}
	pageList.value = makeContinuousArray(cnt);
}

/**
 * 버튼 클릭 이벤트 (페이징 버튼)
 * @param {*} page
 */
function onClickPageButton(page) {
	currentPage.value = page;
	emit('change:page');
}

/**
 * 페이지 이동 버튼 클릭 이벤트(prev, next)
 * @param {*} interval
 */
function onClickPageMove(interval) {
	switch (interval) {
		case 'prev-end':
			if (props.perPage) {
				// 한 페이지씩만 이동하는 경우
				pageList.value = loadPageList('prev', pageList.value[0]);
			} else {
				// pageSize만큼 이동하는 경우, 가장 앞으로 이동
				pageList.value = loadPageList('prev', 1);
			}
			currentPage.value = pageList.value[0];
			break;
		case 'prev-one':
			if (props.perPage) {
				if (currentPage.value % pageSize.value === 1) {
					pageList.value = loadPageList('prev');
				}
				currentPage.value -= 1;
			} else {
				pageList.value = loadPageList('prev', pageList.value[0]);
				currentPage.value = pageList.value[0];
			}
			break;
		case 'next-one':
			if (props.perPage) {
				// 한 페이지씩만 이동하는 경우
				if (currentPage.value % pageSize.value === 0) {
					pageList.value = loadPageList('next');
				}
				currentPage.value += 1;
			} else {
				// pageSize만큼 이동하는 경우
				pageList.value = loadPageList(
					'next',
					pageList.value[pageSize.value - 1] + 1,
				);
				currentPage.value = pageList.value[0];
			}
			break;
		case 'next-end':
			if (props.perPage) {
				// 한 페이지씩만 이동하는 경우
				pageList.value = loadPageList(
					'next',
					pageList.value[pageSize.value - 1] + 1,
				);
			} else {
				// pageSize만큼 이동하는 경우, 가장 끝으로 이동
				pageList.value = loadPageList(
					'next',
					totalPage.value - pageSize.value + 1,
				);
			}
			currentPage.value = pageList.value[0];
			break;
	}
	emit('change:page');
}

/**
 * 연속된 배열을 생성하는 함수
 * @param {Number} length 배열의 길이
 * @param {Number} start 배열의 시작 숫자(생략 시 1부터 시작)
 */
function makeContinuousArray(length, start = 1) {
	return Array(length)
		.fill()
		.map((_, i) => {
			return start + i;
		});
}

/**
 * PageList 로딩
 * @param {*} direction
 * @param {*} page
 */
function loadPageList(direction, page = currentPage.value) {
	switch (direction) {
		case 'prev':
			// 첫번째 페이지일 때
			if (page - pageSize.value <= 0) {
				return makeContinuousArray(pageSize.value);
			}
			// 첫번째 페이지가 아닐때
			return makeContinuousArray(pageSize.value, page - pageSize.value);
		case 'next':
			if (page + pageSize.value >= totalPage.value) {
				// 마지막 페이지일 때
				let length =
					totalPage.value % pageSize.value === 0
						? pageSize.value
						: totalPage.value % pageSize.value;
				return makeContinuousArray(length, totalPage.value - length + 1);
			}
			// 마지막 페이지가 아닐 때
			return makeContinuousArray(
				pageSize.value,
				pageList.value[pageSize.value - 1] + 1,
			);
	}
}
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;
	gap: 0;
	justify-content: center;
	align-items: center;
	li {
		position: relative;
		font-size: 13px;
		color: #999;
		cursor: pointer;
		width: 28px;
		line-height: 28px;
		text-align: center;
		&:before {
			content: '';
			display: block;
			position: absolute;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background-color: var(--color-primary);
			bottom: 0;
			left: calc(50% - 2px);
			transform: scale(0);
			transition: all 0.3s;
		}
		&.active {
			color: var(--color-primary);
			font-weight: 600;
			&:before {
				transform: scale(1);
			}
		}
		&.prev-end {
		}
		&.prev {
			margin-right: 5px;
		}
		&.next {
			margin-left: 5px;
		}
		&.next-end {
		}
	}
}
</style>
