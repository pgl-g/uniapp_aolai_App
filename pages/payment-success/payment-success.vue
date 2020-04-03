<template>
	<view>
		<view class="success">
			<view class="f-active-color" style="font-size: 52rpx;">支付成功</view>
			<view @tap="goIndex" class="return-index f-active-color">去首页再买点吧</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goIndex() {
				uni.switchTab({
					url: "../index/index"
				})
			}
		}
	}
</script>

<style scoped>
	.success {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.return-index {
		padding: 10rpx 60rpx;
		border: 2rpx solid #49BDFB;
		border-radius: 40rpx;
	}
</style>
