<template>
	<div class="search-section">
		<div>
			<input
				ref="refInput"
				type="text"
				placeholder="메뉴를 검색하세요"
				@keyup.up="onMoveList('up')"
				@keyup.down="onMoveList('down')"
				@keyup.enter="onSelect"
				@focus="onDropdownStatus(true)"
				@blur="onDropdownStatus(false)"
				@click="!disabled && onDropdownStatus(true)"
			/>
		</div>

		<!-- Dropdown -->
		<ul class="dropdown" :class="{ open: openDropdown }">
			<li
				v-for="(menu, index) in menuList"
				:key="menu.menuId"
				:class="{ active: index === focusIndex }"
				@mousedown="onSelect($event, menu)"
			>
				<FIcon icon="ico-20-pin" @click="onPin(menu)" />
				<div>
					<p>
						{{ menu.menuNm }}
					</p>
					<p>대메뉴 > 중메뉴 > 소메뉴</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import FIcon from '@/components/FIcon.vue';
import useMenuStore from '@/stores/menuStore';

const menuStore = useMenuStore();

// 가옵션...
const menuList = [...menuStore.leafMenuList];

const focusIndex = ref(-1);

const refInput = ref(null);

/**
 *
 * @param {string} direction
 */
function onMoveList(direction) {
	switch (direction) {
		case 'up':
			if (focusIndex.value > -1) {
				focusIndex.value -= 1;
			}
			break;
		case 'down':
			if (focusIndex.value + 1 < menuList.length) {
				focusIndex.value += 1;
			}
			break;
	}
}

/**
 * Select Value
 * @param {event} event
 * @param {object} selectValue
 */
function onSelect(event, selectValue) {
	console.log('onSelect selectValue', selectValue);

	switch (event.type) {
		case 'keyup':
			if (focusIndex.value >= 0) {
				// emit(
				// 	'update:modelValue',
				// 	filter.value[focusIndex.value][props.valueField],
				// );
				// word.value = filter.value[focusIndex.value][props.labelField];
				console.log('select menu', selectValue);
			} else {
				// emit('update:modelValue', filter.value[0][props.valueField]);
				// word.value = filter.value[0][props.labelField];
				console.log('select menu', selectValue);
			}
			break;
		default:
			// click
			console.log('select menu', selectValue);
			// emit('update:modelValue', selectValue[props.valueField]);
			// word.value = selectValue[props.labelField];
			break;
	}

	onDropdownStatus(false);
	refInput.value.blur();
	focusIndex.value = -1;
}

/**
 * Dropdown
 */
const openDropdown = ref(false);

/**
 * Focus Event
 */
function onDropdownStatus(value) {
	openDropdown.value = value;
}
</script>

<style lang="scss" scoped>
.search-section {
	position: relative;
	width: 240px;
	height: 32px;
	padding: 2px 16px;
	border-radius: 16px;
	background-color: var(--search-section-bg);
	border: 1px solid var(--search-section-bg);
	input {
		padding: 0 24px 0 0;
		border: 0;
		background-position: right center;
		background-repeat: no-repeat;
		background-size: 24px 24px;
		background-color: transparent;
		background-image: url(/images/ico-header-search-zoom.svg);
	}
	&:has(.open) {
		background-color: var(--search-section-bg);
		border-color: var(--search-section-border);
	}
}
:root:has(.darkMode) {
	.search-section {
		input {
			background-image: url(/images/ico-header-search-zoom-dark.svg);
		}
	}
}
.dropdown {
	position: absolute;
	display: none;
	border: 1px solid var(--search-dropdown-border);
	border-radius: 4px;
	margin-top: 4px;
	animation: fadeIn 0.3s linear;
	transform-origin: 0 0;
	background-color: var(--search-dropdown-bg);
	width: 100%;
	z-index: 2;
	left: 0;
	max-height: 240px;
	overflow-y: auto;
	&.open {
		display: block;
	}
	li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13px;
		padding: 8px;
		border-radius: 0;
		color: var(--basic-text);
		> img {
			transform: scale(0.8);
		}
		&:first-child {
			border-radius: 4px 4px 0 0;
		}
		&:last-child {
			border-radius: 0 0 4px 4px;
		}
		&:hover,
		&.active {
			background-color: rgb(196, 220, 255, 0.2);
		}
	}
}
</style>
