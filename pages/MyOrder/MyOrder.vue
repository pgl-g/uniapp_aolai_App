<template>
	<view class="my-order">
		<lines></lines>
		<!-- 头部导航区域 -->
		<view class="order-header">
			<view class="header-item" :class="currentIndex === index ? 'active': ''" v-for="(item,index) in tablist" :key="index"
			 @tap="changeTab(index)">{{item.name}}</view>
		</view>
		<block v-for="(tabItem,tabI) in tablist" :key="tabI">
			<view v-show="tabI === currentIndex">
				<!-- 内容块区域 -->
				<view class="order-main">
					<!-- 商品 -->
					<view v-for="(k,i) in tabItem.list" :key="i">
						<view class="order-goods">
							<view class="goods-status f-active-color">
								待买家支付
							</view>


							<view class="goods-item" v-for="(item,index) in k.goods_item" :key="index">
								<OrderList :item="item" :index="index"></OrderList>
							</view>


						</view>
						<lines></lines>
						<!-- 总价 -->
						<view class="total-price">
							订单金额：<text class="f-active-color">￥{{k.totalPrice}}</text>(包含运费￥0.00)
						</view>
						<lines></lines>
						<!-- 支付 -->
						<view class="payment">
							<view class="payment-text">
								支付
							</view>
						</view>
					</view>
				</view>

				<!-- 没有数据的样式 -->
				<view class="no-order">
					<view>您还没有相关的订单</view>
					<view class="no-order-home">去首页逛逛</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import OrderList from '@/components/common/order-list.vue'
	export default {
		components: {
			Lines,
			OrderList
		},
		data() {
			return {
				currentIndex: 0,
				tablist: [{
						name: '全部',
						list: [{
								status: '待付款',
								totalPrice: '3999.00',
								goods_item: [{
										imgUrl: '../../static/img/Children3.jpg',
										name: '四点hi大hi的和啊是电脑你都i按时打卡',
										attrs: '黑色',
										pprice: '299.00',
										num: '1'
									},
									{
										imgUrl: '../../static/img/Children3.jpg',
										name: '四点hi大hi的和啊是电脑你都i按时打卡',
										attrs: '黑色',
										pprice: '299.00',
										num: '1'
									},
								],
							}

						]
					},
					{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价'
					}
				]
			}
		},
		methods: {
			changeTab(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
	.order-header {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.header-item {
		text-align: center;
		flex: 1;
		line-height: 120rpx;
	}

	.active {
		border-bottom: 4rpx solid #49BDFB;
	}

	.goods-status {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding: 20rpx;
	}


	.total-price {
		padding: 20rpx;
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
	}

	.payment {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.payment-text {
		border: 2rpx solid #49BDFB;
		padding: 6rpx 40rpx;
		border-radius: 30rpx;

	}

	.no-order {
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #FFFFFF;
		justify-content: center;
	}

	.no-order-home {
		padding: 6rpx 40rpx;
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 40rpx;
	}
</style>
