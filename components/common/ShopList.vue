<template>
	<view class="content">
		<view class="shoplist">
			<view class="shop-item" 
			v-for="(item,index) in shoplist.data" 
			:key="index"
			@tap="changeIndex(index)"
			>
				<view
				:class="shoplist.currentIndex === index ? 'f-active-color': ''"
				>{{item.name}}</view>
				<view class="shop-icon">
					<view class="iconfont icon-jiantou-bottom up" :class="item.status === 1 ? 'f-active-color':''"></view>
					<view class="iconfont icon-arrow-left down" :class="item.status === 2 ? 'f-active-color':''"></view>
				</view>
			</view>
		</view>
		<Lines/>
		<commodity-list :dataList="shopListData"></commodity-list>
	</view>
</template>

<script>
	import Lines from './Lines.vue'
	import CommodityList from './CommodityList.vue'
	// 请求数据接口
	import $http from '@/common/api/request.js'
	export default {
		props:{
			keyDown:String
		},
		components:{
			Lines,
			CommodityList
		},
		data(){
			return {
				shoplist:{
					currentIndex:0,
					data:[
						{name:'价格',status:1,key:"pprice"},
						{name:'折扣',status:0,key:"discount"},
						{name:'品牌',status:0}
					]
				},
				shopListData:[]
			}
		},
		mounted() {
			// 数据源
			this.getShopData()
		},
		computed:{
			orderBy(){
				let obj = this.shoplist.data[this.shoplist.currentIndex]
				let val = obj.status === "1" ? "desc" : "asc"
				return {
					[obj.key] : val
				}
			}
		},
		methods:{
			// 点击导航栏进行跳转
			changeIndex(index){
				// 点击时刷新数据，点击排序 ===》 重新获取数据
				this.getShopData()
				// 获取他的索引值
				let idx = this.shoplist.currentIndex
				// 获取的具体是哪一个
				let item = this.shoplist.data[idx]
				if( idx == index ){
					return item.status = item.status === 1 ? 2 : 1; 
				}
				let newItem = this.shoplist.data[index]
				item.status = 0
				this.shoplist.currentIndex = index
				newItem.status = 1
				
			},
			getShopData(){
				$http.request({
					url:'/goods/search',
					data:{
						name:this.keyDown,
						...this.orderBy
					}
				}).then((res)=>{
					this.shopListData = res
				}).catch(()=>{
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
			}
		}
		
	}
</script>

<style scoped>
	.shoplist {
		display: flex;
	}

	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}
	.shop-icon{
		position: relative;
		margin-left: 10rpx;
		
	}
	.iconfont{
		position: absolute;
		left: 0;
		width: 16rpx;
		height: 8rpx;
	}
	.up{
		top: -34rpx;
	}
	.down{
		top: -24rpx;
	}
</style>
