<template>
	<view class="my">
		<!-- 头部 -->
		<view class="my-header">
			<view class="header-main">
				<view class="header-config" @tap="toNavConfig">
					<image class="config-img" src="../../static/img/order2.png" mode=""></image>
				</view>
				<view class="header-logo">
					<image class="logo-img" :src="userStatus ? userInfo.imgUrl : '../../static/img/commodity1.jpg' "></image>
					<view class="logo-name">{{userStatus ? userInfo.nickName : '用户名称'}}</view>
					
				</view>
			</view>
		</view>
		<!-- 用户订单 -->
		<view class="order">
			<view class="order-title" @tap="tomyOrder">
				<view class="">我的订单</view>
				<view>全部订单 > </view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image class="order-img" src="../../static/img/order1.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order2.png" mode=""></image>
					<view>待发货</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order3.png" mode=""></image>
					<view>待收货</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order4.png" mode=""></image>
					<view>待评价</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order5.png" mode=""></image>
					<view>退款管理</view>
				</view>
			</view>
		</view>
		<!-- 内容列表 -->
		<view class="my-content">

			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的优惠券</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的积分</view>
				<view>></view>
			</view>

		</view>
		<TabBar currentPage="ProFile"></TabBar>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import TabBar from '@/components/common/TabBar.vue'
	export default {
		components:{
			TabBar
		},
		computed:{
			...mapState({
				userStatus:state => state.user.userStatus,
				userInfo:state => state.user.userInfo
			})
		},
		methods: {
			toNavConfig(){
				uni.navigateTo({
					url:"../MyConfig/MyConfig"
				})
			},
			// 监听进入我的订单
			tomyOrder() {
				uni.navigateTo({
					url:"../MyOrder/MyOrder"
				})
			}
		}
	}
</script>

<style scoped>
	.my-header {
		background: url(../../static/img/mybg.png) no-repeat;
		width: 100%;
		height: 400rpx;
	}

	.header-main {
		position: relative;
		top: 120rpx;
	}

	.header-config {
		position: absolute;
		left: 20rpx;
	}

	.header-logo {
		position: absolute;
		left: 50%;
		margin-left: -60rpx;
		width: 120rpx;
	}

	.config-img {
		width: 40rpx;
		height: 40rpx;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 50%;
		background-color: #F7F7F7;
	}

	.logo-name {
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
	}

	.order {}

	.order-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.order-list {
		display: flex;
		padding: 20rpx;
	}

	.order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.order-img {
		width: 64rpx;
		height: 64rpx;
	}

	.my-content {
		margin: 20rpx 0;
		padding: 0 20rpx;
	}

	.my-content-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #CCCCCC;
	}
</style>
