<template>
	<view class="my-path-list">
		<view class="path-list">
			
			<view v-for="(item,index) in list" 
			:key="index"
			@tap="tonavPath(index)">
			<view class="path-item" 
			@tap="goConfirmOrder(item)"
			>
				<view class="item-main"> 
					<view class="item-name">{{item.name}}</view>
					<view class="">{{item.modile}}</view>
				</view>
				<view class="item-main">
					<view class="active" v-if="item.isdefault">默认</view>
					<view>{{item.addressname}} {{item.address}}</view>
				</view>
			</view>
			</view>
			
		</view>
		
		
		<view class="add-path">
			<view class="add-address" @tap="navtoNewPath">新增地址</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				isSelectPath:false
			}
		},
		onLoad(e) {
			if(e.type === "selectPath"){
				this.isSelectPath = true
			}
		},
		computed:{
			// 获取里面的数据
			...mapState({
				list:state => state.path.list
			})
		},
		methods: {
			// 跳转到新增的地址页面
			navtoNewPath(){
				uni.navigateTo({
					url:"../MyAddPath/MyAddPath"
				})
			},
			tonavPath(index){
				let pathObj = {
					index:index,
					item:this.list[index]
				}
				uni.navigateTo({
					url:`../MyAddPath/MyAddPath?data=${pathObj}`
				})
			},
			// 返回订单首页
			goConfirmOrder(item){
				
				// 如果是从确认订单过来的执行以下代码
				 if(this.isSelectPath){
					 // 自定义事件，页面通讯
					 uni.$emit('selectPathItem',item)
					 // 返回上一页
					 uni.navigateBack({
					 	delta:1
					 })
				 }
			}
		}
	}
</script>

<style scoped>
.add-path{
	padding: 20rpx 0;
	width: 100%;
	display: flex;
	justify-content: center;
}
.add-address{
	border: 2rpx solid #49BDFB;
	color: #49BDFB;
	border-radius: 30rpx;
	padding: 6rpx 60rpx;
}
.path-list{
	padding-left: 20rpx;
}
.path-item{
	padding: 10rpx;
	border-bottom: 2rpx solid #CCCCCC;
}
.item-main{
	display: flex;
	align-items: center;
}
.item-name{
	padding-right: 10rpx;
}
.active{
padding-right: 10rpx;
	background-color: #49BDFB;
	color: #fff;
	border-radius: 26rpx;
	font-size: 24rpx;
	text-align: center;
}
</style>
