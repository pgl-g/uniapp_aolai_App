<template>
	<view class="index">
		<!-- 头部导航 -->
		<scroll-view scroll-x="true" class="item" :scroll-into-view="scrollIndex">
			<view :id="'top'+ index" class="item-list" v-for="(item,index) in topbar" :key="index" @tap="tabClick(index)">
				<text :class="topbarIndex === index ? 'f-active-color' : 'f-color'">{{item.name}}</text>
			</view>
		</scroll-view>

		<swiper @change="changeClick" :current="topbarIndex"  :style="'height:'+ clientHeight +'px;'">
			<swiper-item v-for="(item,index) in newtopbar" :key="index">
				
		
				<block v-if="item.data.length > 0">
					<scroll-view scroll-y="true"  :style="'height:'+ clientHeight +'px;'" @scrolltolower="uploadmore(index)">
						
						<view class="swiper_height">
							<block v-for="(k,i) in item.data" :key="i">
								<!-- 推荐的信息 -->
								<index-swiper v-if="k.type == 'swiperList'" :dataList="k.data" />
								<template v-if="k.type == 'recommendList'">
								
									<Recommend :dataList="k.data"></Recommend>
									<Card cardtitle="猜你喜欢"></Card>
								</template>
							
							
							
										<!-- 其他组件 -->
										<banners v-if="k.type === 'bannerList'" :dataList="k.bigUrl"></banners>
										<template v-if="k.type === 'iconsList'">
											<icons  :dataList="k.data"></icons>
											<Card cardtitle="热销爆品"></Card>
										</template>
										<template v-if="k.type === 'hotList'">
											<Hot :dataList="k.data"></Hot>
											<Card cardtitle="推荐店铺"></Card>
										</template>
										<template v-if="k.type === 'shopList'">
											<Shop :dataList="k.data"></Shop>
											<Card cardtitle="为您推荐"></Card>
										</template>
								<commodity-list v-if="k.type ==='commodityList'" :dataList="k.data"></commodity-list>
							</block>
						</view>
						<view class="text-inof f-color">
							{{item.loadMore}}
						</view>
					</scroll-view>
				</block>
				<view v-else>
					暂无数据.......
				</view>
			
			</swiper-item>
		</swiper>
		<TabBar currentPage="index"></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/common/TabBar.vue'
	// 推荐部分的组件展示
	import IndexSwiper from '@/components/Index/IndexSwiper.vue'
	import Recommend from '@/components/Index/Recommend.vue'
	import Card from '@/components/common/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	// 其他组建的部分展示
	import Banners from '@/components/Index/Banners.vue'
	import Icons from '@/components/Index/Icons.vue'
	import Hot from '@/components/Index/Hot.vue'
	import Shop from '@/components/Index/Shop.vue'
	
	// 请求数据接口
	import $http from '@/common/api/request.js'
	export default {
		components: {
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banners,
			Icons,
			Hot,
			Shop,
			TabBar
		},
		data() {
			return {
				// 索引
				topbarIndex: 0,
				// 跟随id跳转
				scrollIndex: 'top0',
				clientHeight: 0,
				topbar: [],
				newtopbar: []
			}
		},
		onLoad() {
			this.init()
			
		},
		// 监听头部标题栏的按钮点击跳转到搜索区
		onNavigationBarButtonTap(e){
			// console.log(e)
			if(e.index == 0){
				uni.navigateTo({
					url:`/pages/Search/Search`
				})
			}
		},
		onReady() {
			// 获取内容可视区域的高度 
			uni.getSystemInfo({
				success: (res) => {
					// this.clientHeight = res.windowHeight - uni.upx2px(80) - this.getsystmClientHeight()
					// this.clientHeight = 2000	
					this.clientHeight = res.windowHeight - uni.upx2px(80);
				}
			})
			
			
		},
		methods: {
			// 数据请求
			
			init() {
				// console.log($http.request)
				$http.request({
					url:'/index_list/data'
				}).then(res=>{
					this.topbar = res.topBar
					this.newtopbar = this.initData(res)
					// console.log(this.topbar)
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			// 将数据放入到其他数组储存起来
			initData(res) {
				let arr = []
				// console.log(res.data)
				for (let i = 0; i < this.topbar.length; i++) {
					let obj = {
						data: [],
						load:'first',
						loadMore:'上拉加载...'
					}
					// 获取首次的数据
					if (i == 0) {
						obj.data = res.data
					}
					arr.push(obj)
				}
				return arr
			},
			// 点击头部导航循环切换
			tabClick(index) {
				if (this.topbarIndex === index) return
				this.topbarIndex = index
				this.scrollIndex = "'top' + index"
				if(this.newtopbar[this.topbarIndex].load === 'first')
				{
					this.addData()
				}
				// console.log(this.newtopbar[this.topbarIndex].load)
			},
			// 切换轮播
			changeClick(e) {
				this.tabClick(e.detail.current)
			},
			// 获取手机不同设备的可视高度（ios，android）兼容(但是我这里有bug没有用)  这里的数据没有用
			// 获取到的手机状态栏上的信息不准确
			getsystmClientHeight(){
				const res = uni.getSystemInfoSync()
				// console.log(res)
				// console.log(res.platform,res.statusBarHeight)
				const systme = res.platform
				console.log(systme)
				if(systme === 'android'){
					return 48 + res.statusBarHeight
				}else if(systme === 'ios'){
					return 44 + res.statusBarHeight
				}else{
					return
				}
			},
			// 其他组件的请求信息
			addData(callback){
				let index = this.topbarIndex
				
				// 不同模块的id，来进行数据的刷新
				let id = this.topbar[index].id
				let page = Math.ceil(this.newtopbar[index].data.length / 5 ) + 1
				// console.log(page)
				// 请求数据
				$http.request({
					url:'/index_list/'+ id +'/data/' + page + ''
				}).then(res=>{
					this.newtopbar[index].data = [...this.newtopbar[index].data,...res]
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				// 当请求结束后，重新赋值
					this.newtopbar[index].load = 'last'
					
					if(typeof callback === "function"){
						callback()
					}
			},
			uploadmore(index){
				this.newtopbar[index].loadMore = "已加载..."
				this.addData(()=>{
					this.newtopbar[index].loadMore = "上拉加载更多..."
				})
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}

	.item-list {
		display: inline-block;
		padding: 10rpx 30rpx;
	}

	.f-active-color {
		padding: 10rpx 0;
		border-bottom: 4rpx solid #49bdfb;
	}
	.text-inof{
		border-top: 2rpx solid #626362;
		line-height: 80rpx;
		text-align: center;
	}
</style>
