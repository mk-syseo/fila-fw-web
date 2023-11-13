import { h, render } from 'vue';
import Loader from './Loader.vue';

/**
 *
 * @param {any} component
 * @param {any} props
 * @param {HTMLElement} parentContainer
 * @returns
 */
function createComponent(component, props, parentContainer) {
	const vnode = h(component, props);
	const container = document.createElement('div');
	parentContainer.appendChild(container);
	render(vnode, container);

	return vnode.component;
}

function removeElement(el) {
	if (typeof el.remove !== 'undefined') {
		el.remove();
	} else {
		el.parentNode?.removeChild(el);
	}
}

/**
 *
 * @param {object} globalProps
 * @param {object} globalSlots
 * @returns
 */
export function useLoading(globalProps, globalSlots) {
	let loaders = [];

	const loading = {
		show(props = globalProps, slots = globalSlots) {
			const forceProps = {
				programmatic: true,
				lockScroll: true,
				isFullPage: false,
			};
			const propsData = Object.assign({}, globalProps, props, forceProps);
			let container = propsData.container;

			if (!propsData.container) {
				container = document.body;
				propsData.isFullPage = true;
			}

			let instance = createComponent(Loader, propsData, container);
			const mergedSlots = Object.assign({}, globalSlots, slots);
			Object.keys(mergedSlots).map(name => {
				if (instance != null) {
					instance.slots[name] = mergedSlots[name];
				}
			});

			loaders.push(instance);
		},
		hide() {
			/**
			 * Loader가 중복생성되는 경우가 존재하여 아래와 같이 수정함
			 */
			while (loaders.length > 0) {
				let instance = loaders.pop();
				let root = instance.vnode.el;
				removeElement(root.parentElement);
			}
		},
	};
	return loading;
}
