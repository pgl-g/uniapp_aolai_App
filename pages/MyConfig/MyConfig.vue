<template>
	<view class="my-config">
		  <view class="config-item" @tap="NavToPath">
		  	<view>地址管理</view>
			<view> > </view>
		  </view>
		  
		  <view class="config-item">
		  	<view>地址管理</view>
		  			<view> > </view>
		  </view>
		  <view class="config-item">
		  	<view>地址管理</view>
		  			<view> > </view>
		  </view>
		  <view class="config-item">
		  	<view>地址管理</view>
		  			<view> > </view>
		  </view>
		  <view class="config-item">
		  	<view>地址管理</view>
		  			<view> > </view>
		  </view>
		  <view class="config-item">
		  	<view>地址管理</view>
		  			<view> > </view>
		  </view>
		  <view class="my-exit" @tap="OutLogin">
		  	退出登录
		  </view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		methods: {
			// 监听进入地址管理
			NavToPath(){
				uni.navigateTo({
					url:'../MyPathConfig/MyPathConfig'
				})
			},
			// 点击退出登录
			OutLogin(){
				this.outLogin()
				uni.showToast({
					title:"退出成功"
				})
				uni.reLaunch({
					url:"../index/index"
				})
			},
			...mapMutations(['outLogin'])
		}
	}
</script>

<style scoped>
	.config-item{
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}
.my-exit{
	background-color: #49bdfb;
	width: 100%;
	line-height: 80rpx;
	color: #FFFFFF;
	text-align: center;
	font-size: 30rpx;
}
</style>
