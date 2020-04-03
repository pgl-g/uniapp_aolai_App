<template>
	<view class="content">
		<!-- 商品图 -->
		<swiper :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-img" :src="detailsData.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 价格和名称 -->
		<view class="details-goods">
			<view class="goods-pprice">
				￥{{detailsData.pprice}}
			</view>
			<view class="goods-oprice">
				￥{{detailsData.oprice}}
			</view>
			<view class="goods-name">
				{{detailsData.name}}
			</view>
		</view>

		<!-- 商品详情图 -->
		<view>
			<view>
				<image class="details-img" src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view>
				<image class="details-img" src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<Card cardtitle="看了又看"></Card>
		<commodity-list :dataList="commodData"></commodity-list>
		<!-- 底部 -->

		<view class="details-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche" @tap="toShopCart"></view>
			<view class="add-shopcar" @tap="toShow">加入购物车</view>
			<view class="purchase" @tap="toShow">立即购买</view>
		</view>

		<!-- 底部弹出层   @touchmove.stop.prevent="" 取消默认行为，让蒙层内的内容不能动-->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent="">
			<!-- 蒙层 -->
			<view class="pop-mask" @tap="hideShow"></view>
			<!-- 内容快 -->
			<view class="pop-box" :animation="animationData">
				<view>
					<image class="pop-img" :src="detailsData.imgUrl" mode=""></image>
				</view>
				<view class="pop-num">
					<view>购买数量</view>
					<uni-number-box 
					:min="1"
					:value="num"
					@change="changeIndex"
					 />
				</view>
				<view class="pop-sub" @tap="addShopcar">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '../../common/api/request.js'
	import Card from '@/components/common/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import UniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	import {mapMutations} from 'vuex'
	export default {
		components: {
			Card,
			CommodityList,
			UniNumberBox
		},
		data() {
			return {
				// 设置默认的数量
				num:1,
				// 数据库中获取的数据
				detailsData: {},
				isShow: false,
				// 定义弹框的时间对象
				animationData: {},
				// 详情轮播区域
				swiperList: [{
						imgUrl: '../../static/img/details1.jpeg'
					},
					{
						imgUrl: '../../static/img/details2.jpeg'
					},
					{
						imgUrl: '../../static/img/details3.jpeg'
					}
				],
				// 商品展示的区域
				commodData: [{
						id: '1',
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '2',
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '3',
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '4',
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			};
		},
		// 监听头部返回首页的默认行为
		onBackPress() {
			if (this.isShow) {
				this.hideShow()
				return true
			}
		},
		onLoad(e) {
			this.getDetailsData(e.id)
		},
		// 分享功能实现
		onNavigationBarButtonTap(e) {
			if(e.type === "share") {
				uni.share({
					"provider":"weixin",
					"type":0,
					"title":this.detailsData.name,
					"scene":"WXSceneSession",
					"href":`http://192.168.1.5:8080/#/pages/details/details?id=${this.detailsData.id}`,
					imageUrl:this.detailsData.imgUrl,
					success(res) {
						uni.showTabBar({
							title:'分享成功'
						})
					},
					fail(err) {
						console.log("fail" + JSON.stringify(err))
					}
				})
			}
		},
		methods: {
			// 请求数据
			getDetailsData(id) {
				$http.request({
					url: "/goods/id",
					data: {
						id: id
					}
				}).then(res => {
					this.detailsData = res[0]
				}).catch(() => {
					uni.showToast({
						title: "请求出错",
						icon: "none"
					})
				})
			},
			// 显示蒙层
			toShow() {

				var animation = uni.createAnimation({
					duration: 200
				})

				animation.translateY(600).step()
				this.animationData = animation.export()

				this.isShow = true

				setTimeout(() => {
					animation.translateY(0).step()
					this.animationData = animation.export()
				}, 200)
			},
			// 隐藏蒙层
			hideShow() {
				var animation = uni.createAnimation({
					duration: 200
				})

				animation.translateY(600).step()
				this.animationData = animation.export()

				this.isShow = true

				setTimeout(() => {
					animation.translateY(0).step()
					this.isShow = false
				}, 200)

			},
			// 监听数量的变化
			changeIndex(value){
				this.num = value
			},
			// 点击进入购物车页面
			toShopCart(){
				uni.navigateTo({
					url:'../ShopCart/ShopCart'
				})
		
			},
			// 加入购物车
			addShopcar(){
				let goods = this.detailsData
				this.detailsData['checked'] = false
				this.detailsData['num'] = this.num
				// 加入购物车
				this.addcar(goods)
				// 隐藏底部蒙层
				this.hideShow()
				uni.showToast({
					title:"加入购物车成功",
					icon:"none"
				})
			},
			...mapMutations(['addcar'])
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding-bottom: 90rpx;
	}

	swiper {
		width: 100%;
		height: 700rpx;
	}

	.swiper-img {
		width: 100%;
		height: 700rpx;
	}

	.details-goods {
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx 0;
	}

	.details-img {
		width: 100%;
	}

	.details-foot {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		width: 100%;
		height: 90rpx;

		.iconfont {
			width: 60rpx;
			height: 60rpx;
			border-radius: 100%;
			background-color: #000;
			color: #FFFFFF;
			text-align: center;
			margin: 0 10rpx;
		}

		.add-shopcar {
			margin: 0 40rpx;
			padding: 6rpx 30rpx;
			background-color: #000;
			color: #fff;
			border-radius: 40rpx;
		}

		.purchase {
			margin: 0 40rpx;
			padding: 6rpx 30rpx;
			background-color: #49bdfb;
			color: #fff;
			border-radius: 40rpx;
		}
	}

	.pop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.pop-mask {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
		width: 100%;
		height: 100%;
	}

	.pop-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;

		.pop-img {
			width: 260rpx;
			height: 260rpx;
		}

		.pop-sub {
			line-height: 80rpx;
			background-color: #49BDFB;
			color: #fff;
			text-align: center;
		}

		.pop-num {
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
