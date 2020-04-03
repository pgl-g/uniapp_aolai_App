<template>
	<view>
		<template v-if="list.length > 0">
			<!-- 自定义导航栏 -->
			<uni-nav-bar 
			title="购物车" 
			:rightText="isEdit ? '完成' : '编辑'" 
			fixed="true" 
			statusBar="true" 
			@clickRight=" isEdit = !isEdit  "/>
			
			<!-- 内容区域块 -->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index" >
					<label class="radio" @tap="selectItem(index)">
						<radio value="" color="#FF3333"  :checked="item.checked"/><text></text>
					</label>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-content">
						<view class="shop-text">
							<view class="shop-name">{{item.name}}</view>
							<view class="shop-color f-color">{{item.color}}</view>
						</view>
						<view class="shop-price">
							<view>￥{{item.pprice}}</view>
							<!-- 点击编辑进行判断 -->
							<template v-if="!isEdit">
								<view>×{{item.num}}</view>
							</template>
							<template v-else>
								<UniNumberBox
								:value="item.num"
								:min="1"
								@change="changeNav($event,index)"
								/>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="shop-foot">
				<label class="radio foot-radio" @tap="checkAllfn">
					<radio value="" color="#FF3333" :checked="checkAll"/><text>全选</text>
				</label>
				<view class="foot-total">
					<!-- 点击编辑进行判断 -->
					<template v-if="!isEdit">
						<view class="foot-count">
							合计：<text class="f-active-color">￥{{Totalcount.pprice}}</text>
						</view>
						<view class="foot-num" @tap="toConfirmpage">
							结算({{Totalcount.num}})
						</view>
					</template>
					<template v-else>
						<view class="foot-num" style="background-color: #000; color: #FFFFFF;">
							移入收藏夹
						</view>
						<view class="foot-num" style=" color: #FFFFFF;" @tap="delGoodsFn">
							移除
						</view>
					</template>
				</view>
			</view>
		</template>
		<template v-else>
			<uni-nav-bar
			title="购物车" 
			fixed="true" 
			statusBar="true" />
			<view class="shop-else">
				<text>
					购物车空了。。。
				</text>
			</view>
		</template>
		<TabBar currentPage="ShopCart"></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/common/TabBar.vue'
	import UniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	import { mapState , mapActions, mapGetters,mapMutations} from 'vuex'
	import UniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			UniNavBar,
			UniNumberBox,
			TabBar
		},
		data() {
			return {
				// 编辑显示完成的切换
				isEdit: false,
			}
		},
		computed:{
			...mapState({
				list: state => state.car.list
			}),
			...mapGetters(['checkAll','Totalcount'])
			
		},
		methods: {
			...mapActions(['checkAllfn','delGoodsFn']),
			...mapMutations(['selectItem']),
			// 监听编辑数量变多
			changeNav(value,index){
				this.list[index].num = value
			},
			// 点击进入确认订单页面
			toConfirmpage(){
				uni.navigateTo({
					url:"../confrim-order/confrim-order"
				})
			}
		}
	}
</script>

<style scoped>
	.shop-list{
		padding-bottom: 100rpx;
	}
.shop-item{
	display: flex;
	padding: 20rpx;
	align-items: center;
	background-color: #F7F7F7;
	margin-bottom: 10rpx;
}
.shop-else{
	position: absolute;
	top: 0;left: 0;bottom: 0;right: 0;
	background-color: #F7F7F7;
	display: flex;align-items: center;
	justify-content: center;
}
.shop-img{
	width: 200rpx;
	height: 200rpx;
}
.shop-text{
	flex: 1;
	padding-left: 20rpx;
}
.shop-color{
	font-size: 24rpx;
}
.shop-price{
	display: flex;
	justify-content: space-between;
}
.shop-foot{
	position: fixed;
	left: 0;bottom: 120rpx;
	background-color: #FFFFFF;
	border-top: 2rpx solid #F7F7F7;
	width: 100%;height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.foot-radio{
	padding-left: 20rpx;
}
.foot-total{
	display: flex;
}
.foot-count{
	line-height: 100rpx;
	padding-right: 20rpx;
	font-size: 32rpx;
}
.foot-num{
	background-color: #49bdfb;
	line-height: 100rpx;
	padding: 0 60rpx;
}
</style>
