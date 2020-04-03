<template>
	<view class="confirm-box">
		<Lines></Lines>

		<!-- 地址 -->
		<view class="order-map" @tap="goPathList">
			<template v-if="path">
				<view class="map-title">
					<view class="map-name">收货人：{{path.name}}</view>
					<view>{{path.modile}}</view>
				</view>
				<view class="map-city">收货地址:{{path.addressname}}{{path.address}}</view>
			</template>
			<template v-else>
				<view class="map-title">
					<view class="map-name">请选择地址</view>
				</view>
			</template>
		</view>
		<!-- 商品 -->
		<view class="goods-list">
			<view class="goods-content">
				<image class="goods-img" src="../../static/img/Children2.jpg" mode=""></image>
				<view class="goods-text">
					<view class="goods-name">商品名称</view>
					<view class="goods-size f-color">颜色分类：hies</view>
					<view class="f-active-color" style="font-size: 24rpx;">七天无理由</view>
				</view>
				<view class="">
					<view>$299.00</view>
					<view class="f-color">×1</view>
				</view>
			</view>
		</view>
		<!-- 底部（提交订单） -->
		<view class="order-foot">
			<view class="totalPrice">合计：<text class="f-active-color">￥3999.00</text></view>
			<view class="confirm" @tap="goPayment">提交订单</view>
		</view>
		
		
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			Lines
		},
		data() {
			return {
			path:false
			}
		},
		computed:{
			...mapGetters(['defaultPath'])
		},
		onLoad() {
			// 如果有默认地址的一个赋值
			if(this.defaultPath.length > 0) {	
				this.path = this.defaultPath[0];
			}
			// 如果触发自定义事件
			uni.$on('selectPathItem',(res)=>{
				this.path = res
			})
		},
		onUnload() {
			uni.$off('selectPathItem',()=>{
				console.log("selectItem")
			})
		},
		methods: {
			// 跳转到地址管理页面
			goPathList(){
				uni.navigateTo({
					url:"../MyPathConfig/MyPathConfig?type=selectPath"
				});
			},
			// 跳转到支付页面
			goPayment(){
				uni.navigateTo({
					url:'../payment/payment'
				})
			}
		}
	}
</script>

<style scoped>
	.confirm-box {
		background-color: #F7F7F7;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.order-map {
		padding: 20rpx;
		background-color: #FFFFFF;
		line-height: 40rpx;
	}

	.map-title {
		display: flex;
		justify-content: space-between;
	}

	.map-name {
		font-weight: bold;
	}

	.goods-list {
		background-color: #FFFFFF;
		padding: 20rpx 0;
		margin-top: 20rpx;
	}

	.goods-content {
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		display: flex;
		justify-content: space-between;
		background-color: #F7F7F7;
	}

	.goods-text {
		width: 360rpx;
		padding: 0 10rpx;
		font-size: 26rpx;
	}

	.goods-img {
		width: 160rpx;
		height: 160rpx;
	}

	.goods-name {
		font-size: 26rpx;
	}

	.goods-size {
		font-size: 24rpx;
	}
	.order-foot{
		width: 100%;
		height: 80rpx;
		position: fixed;
		left: 0;bottom: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.confirm{
		color: #FFFFFF;
		background-color: #49BDFB;
		padding: 10rpx 30rpx;
	}
	.totalPrice{
		padding: 0 20rpx;
	}
</style>
