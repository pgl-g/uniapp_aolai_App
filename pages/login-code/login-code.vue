<template>
	<view>
		<Lines></Lines>
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>验证码</text>
						<input type="text" value="" placeholder="请输入验证码" v-model="userEmail" />
						<button type="default" size="mini" :plain="true" :disabled="disabled" @tap="sendCode">{{codemsg}}</button>
					</view>
				</view>
				<view class='tel' @tap="toBack">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import $http from '../../common/api/request.js'
	export default {
		data() {
			return {
				// 显示的文本
				codemsg: '',
				// 倒计时
				codeTime: 60,
				disabled: false,
				// 双向绑定邮箱
				userEmail: '',
				// 手机号
				phone: '',
				// 得到的验证码
				getCode:''
			}
		},
		components: {
			Lines
		},
		// 当页面渲染的时候调用
		onReady() {
			this.codemsg = `重新发送(${this.codeTime})`
			this.sendCode()
		},
		onLoad(e) {
			this.phone = e.phone
		},
		methods: {
			// 设置短信验证码倒计时
			sendCode() {
				// 请求接口返回验证码
				$http.request({
					url: "/code",
					method: "POST",
					data: {
						userName: this.phone
					}
				}).then((res) => {
						this.getCode = res.code
				}).catch(() => {
				uni.showToast({
					title: '请求失败',
					icon: 'none'
				})
			})



			this.disabled = true
			let time = setInterval(() => {
				--this.codeTime
				this.codemsg = `重新发送(${this.codeTime})`
			}, 1000)
			setTimeout(() => {
				clearInterval(time)
				this.codeTime = 60
				this.disabled = false
				this.codemsg = "重新发送"
			}, 60000)
		},
		// 点击下一步跳转到首页
		toBack() {
			if(this.getCode == this.userEmail) {
				// 请求接口 ==> 往数据库增加一条数据
				
				
				// 请求接口返回验证码
					$http.request({
						url: "/addUser",
						method: "POST",
						data: {
							userName: this.phone,
							code: this.userEmail
						}
					}).then((res) => {
						// 注册成功
						uni.showModal({
							title:"注册成功",
							icon:"none"
						})
							if(res.success){
								uni.redirectTo({
									url:"../index/index"
								})
							}
					}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
				
				
			}else {
				uni.showModal({
					title:"验证错误",
					icon:"none"
				})
			}
		}
	}
	}
</script>

<style scoped>
	.login-tel {
		width: 100vw;
		height: 100vh;
	}

	.tel-main {
		padding: 0 20rpx;
	}

	.login-from {
		padding: 30rpx 0;
	}

	.login-user {
		font-size: 32rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #f7f7f7;
	}

	.user-text {
		padding-right: 10rpx;
	}

	.tel {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #49BDFB;
		border-radius: 40rpx;
	}
</style>
