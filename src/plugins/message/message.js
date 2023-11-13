import { h, render } from 'vue';
import Message from './Message.vue';

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
 * @param {object} globalSlots
 * @returns
 */
export function useMessage() {
	let messageBox = [];

	const loading = {
		show(props) {
			const propsData = Object.assign({}, props);

			let instance = createComponent(Message, propsData, document.body);
			messageBox.push(instance);
		},
		showAlert(props) {
			const propsData = Object.assign(
				{
					type: 'alert',
					onConfirm: async () => {
						if (props.onConfirm) {
							await props.onConfirm();
						}
						this.hide();
					},
					onCancel: async () => {
						if (props.onCancel) {
							await props.onCancel();
						}
						this.hide();
					},
				},
				props,
			);

			let instance = createComponent(Message, propsData, document.body);
			messageBox.push(instance);
		},
		showConfirm(props) {
			const propsData = Object.assign(
				{
					type: 'confirm',
					onConfirm: async () => {
						if (props.onConfirm) {
							await props.onConfirm();
						}
						this.hide();
					},
					onCancel: async () => {
						if (props.onCancel) {
							await props.onCancel();
						}
						this.hide();
					},
				},
				props,
			);

			let instance = createComponent(Message, propsData, document.body);
			messageBox.push(instance);
		},
		hide() {
			/**
			 * Message가 중복생성되는 경우가 존재하여 아래와 같이 수정함
			 */
			while (messageBox.length > 0) {
				let instance = messageBox.pop();
				let root = instance.vnode.el;
				removeElement(root.parentElement);
			}
		},
	};
	return loading;
}
