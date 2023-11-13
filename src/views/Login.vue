<template>
	<div
		class="login-page"
		:style="{
			backgroundImage: `url(${commonUtils.getImageUrl('img-login-bg.png')}`,
		}"
	>
		<div class="login-content-left">
			<img alt="FILA" :src="FilaCi" width="110" />
			<div class="login-desc">
				<h1>FILA Fashion ERP <br />Supplier Portal System</h1>
				<h2>휠라코리아 패션ERP Supplier Portal System에 로그인하세요!</h2>
			</div>
			<div class="login-help">
				<div class="login-help-info">
					<h3>Help Desk</h3>
					<dl>
						<dt>시스템문의 :</dt>
						<dd>02)3470-9528</dd>
					</dl>
				</div>
				<div class="login-help-button">
					<div class="login-help-item">
						<FButton text icon="ico-32-help" class="size60" />
						<div>원격지원요청방법</div>
					</div>
					<div class="login-help-item">
						<FButton text icon="ico-32-remote" class="size60" />
						<div>원격지원요청</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="login-content-right"
			:style="{
				backgroundImage: `url(${commonUtils.getImageUrl(
					'img-login-bg-shape.png',
				)}`,
			}"
		>
			<div class="login-form-wrap">
				<div class="login-form-top">
					<h1>Login</h1>
					<div class="login-lang">
						<h5>Language</h5>
						<div class="user-items">
							<label class="kr">
								<input type="radio" name="lang" checked />
							</label>
							<label class="us">
								<input type="radio" name="lang" />
							</label>
							<label class="cn">
								<input type="radio" name="lang" />
							</label>
						</div>
					</div>
				</div>
				<div class="login-form-bottom">
					<form @submit.prevent="fnLogin">
						<div class="login-form-item">
							<FInput
								id="username"
								ref="refUsername"
								v-model="loginParam.username"
								type="text"
								placeholder="아이디를 입력하세요"
								label="아이디"
								@keyup.enter="onClickLogin"
							/>
						</div>
						<div class="login-form-item">
							<FInput
								id="password"
								ref="refPassword"
								v-model="loginParam.password"
								type="password"
								placeholder="비밀번호를 입력하세요"
								label="비밀번호"
								@keyup.enter="onClickLogin"
							/>
						</div>
						<div class="login-form-check">
							<div class="login-form-check-item">
								<FCheckbox
									id="multipleValue"
									v-model="multipleValue"
									:options="options"
									class="login-main"
								/>
							</div>
							<FButton text>비밀번호 재설정</FButton>
						</div>
						<FButton primary type="submit" @click="onClickLogin">
							로그인
						</FButton>
					</form>
				</div>
			</div>
			<div class="login-policy-wrap">
				<FButton text>개인정보 취급정책</FButton>
				<div class="login-policy-desc">
					본 시스템은 Fila Holdings Corp. 의 인가된 사용자에 한하여 접근
					가능하며, 비인가자 및 불법적인 접근을 시도하는 경우 관련 법규에 의해
					처벌될 수 있습니다.
				</div>
				<div class="login-policy-copy">
					ⓒ 2024 Fila Holdings Corp. All rights reserved.
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import hex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';

import apiCall from '@/plugins/apiCall';
import { useMessage } from '@/plugins/message/message';

import FilaCi from '/images/img-fila-ci-w.png';
import commonUtils from '@/utils/commonUtils';
import { MENU_INFO } from '@/utils/constCommon';

import useMenuStore from '@/stores/menuStore';
import useUserStore from '@/stores/userStore';

import { v4 as uuidv4 } from 'uuid';

import FButton from '@/components/FButton.vue';
import FInput from '@/components/FInput.vue';
import FCheckbox from '@/components/FCheckbox.vue';

// import VueCookies from 'vue-cookies';

const loginParam = ref({ username: '', password: '' });

const refUsername = ref(null);
const refPassword = ref(null);
const message = useMessage();

onMounted(() => {
	// 포커스
	// refUsername.value.focus();
	// if (!loginParam.value.username) {
	// 	refUsername.value?.focus();
	// } else {
	// 	refPassword.value?.focus();
	// }
});

/**
 * #################### 로그인 ####################
 */
const router = useRouter();

function onClickLogin() {
	let param = { ...loginParam.value };
	param.password = hex.stringify(sha256(param.password));

	apiCall.post('/common/auth/login', param).then(async res => {
		switch (res.data.statusCode) {
			case 10:
				await message.showConfirm({ message: res.data.statusMessage });
				return;
			case 60:
				await message.showConfirm({
					message: '사용자 임시 비밀번호는\n 입니다 need18',
				});
				return;
			default:
				break;
		}

		const token = res.data.data;

		await useUserStore().login(token.accessToken, token.refreshToken);
		await useUserStore().load();
		await useMenuStore().load();

		nextTick(() => {
			router.push({ path: MENU_INFO.HOME_PATH, hash: '#' + uuidv4() });
		});
	});
}

const multipleValue = ref([]);
const options = [
	{
		label: '아이디 저장',
		value: '001',
	},
];
</script>

<style lang="scss" scoped>
.login-page {
	display: flex;
	height: 100vh;
	background-repeat: no-repeat;
	.login-content-right {
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		background-repeat: no-repeat;
		background-position: 0;
		flex-grow: 1;
		justify-content: space-between;
		align-items: flex-end;
		padding: 160px 100px 64px 0;
		.login-form-wrap {
			min-width: 500px;
			max-width: 500px;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.login-form-top {
				color: #000;
				font-weight: 800;
				margin-bottom: 5em;
				display: flex;
				justify-content: space-between;
				h1 {
					font-size: 48px !important;
				}
				.login-lang {
					display: flex;
					align-items: center;
					gap: 24px;
					.user-items {
						display: flex;
						align-items: center;
						gap: 24px;
						label {
							position: relative;
							display: block;
							width: 24px;
							height: 24px;
							cursor: pointer;
							input {
								width: 24px;
								height: 24px;
								opacity: 0;
							}
							&::after {
								content: '';
								display: block;
								width: 24px;
								height: 24px;
								position: absolute;
								top: 0;
								left: 0;
								border-radius: 24px;
							}
							&:has(:checked) {
								&::after {
									background-position:
										right bottom,
										right bottom;
								}
							}
							&::after {
								background-repeat: no-repeat;
								background-position:
									-24px bottom,
									right bottom;
							}
							&.kr {
								&::after {
									background-image: url(/images/ico-24-user-mode-check.svg),
										url(/images/img-flag-kr.png);
								}
							}
							&.us {
								&::after {
									background-image: url(/images/ico-24-user-mode-check.svg),
										url(/images/img-flag-us.png);
								}
							}
							&.cn {
								&::after {
									background-image: url(/images/ico-24-user-mode-check.svg),
										url(/images/img-flag-cn.png);
								}
							}
						}
					}
				}
			}
			.login-form-bottom {
				form {
					display: flex;
					flex-direction: column;
					gap: 24px;
					.login-form-check {
						display: flex;
						justify-content: space-between;
						.login-form-check-item {
							display: flex;
							label {
								font-size: 14px;
							}
						}
					}
					button {
						&.primary {
							height: 80px;
							font-size: 24px;
							font-weight: bold;
							border-radius: 40px;
						}
						&.text-only {
							text-decoration-line: underline;
						}
					}
				}
			}
		}
		.login-policy-wrap {
			min-width: 500px;
			max-width: 500px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 14px;
			gap: 24px;
			.login-policy-desc,
			.login-policy-copy {
				color: #777777;
			}
			button {
				&.text-only {
					text-decoration-line: underline;
					margin-right: auto;
				}
			}
		}
	}
	.login-content-left {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 80px;
		.login-desc {
			h1 {
				font-size: 64px !important;
				line-height: 1;
				color: #fff;
			}
			h2 {
				font-size: 20px !important;
				font-weight: normal !important;
				margin-top: 24px;
				color: #fff;
			}
		}
		.login-help {
			display: flex;
			justify-content: space-between;
			.login-help-info {
				h3 {
					font-size: 24px !important;
					color: #fff;
				}
				dl {
					display: flex;
					dt,
					dd {
						font-size: 16px;
						color: #fff;
					}
				}
			}
			.login-help-button {
				display: flex;
				gap: 27px;
				.login-help-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16px;
					color: #fff;
					button {
						border-radius: 50%;
					}
				}
			}
		}
	}
}
</style>
