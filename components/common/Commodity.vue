<template>
	<view class="commodity" :style="'flex-flow:'+ wrap +';'">
		<view 
		class="commodity-item"  
		:style="'width:'+ hotWidth +';'"
		v-for="(item,index) in itemshop"
		:key="index"
		>
			<image 
			class="commodity-img" 
			:style="'height:'+ hotHeight +';'"
			:src="item.imgUrl" 
			@tap="navToDetails(item.id)"
			mode="">
			</image>
			<view class="commodity-content">
				<text class="commodity-name" :style="'font-size:'+ namesize +';'">{{item.title}}</text>
				<view class="">
					<text class="new-price">￥{{item.pprice}}</text>
					<text class="old-price">￥{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
</view>
</template>

<script>
	export default{
		props:{
			itemshop:{
				type:Array,
				default(){
					return []
				}
			},
			hotWidth:{
				type:String,
				default:'375rpx'
			},
			hotHeight:{
				type:String,
				default:'375rpx'
			},
			wrap:{
				type:String,
				default:'wrap'
			},
			namesize:{
				type:String,
				default:'26rpx'
			}
		},
		methods:{
			navToDetails(id){
				uni.navigateTo({
					url:`/pages/details/details?id=${id}`
				})
			}
		}
	}
</script>

<style scoped>
.commodity{
	display: flex;
}
.commodity-item{
	padding-bottom: 20rpx;
}
.commodity-img{
	width: 100%;
}
.commodity-content{
	text-align: center;
}
.commodity-name{
	overflow: hidden;
	text-overflow: ellipsis;
	/* white-space: nowrap; */
	display: -webkit-box;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical;
	color: #333333;
	word-break: break-all;
	padding: 0rpx 20rpx;
}
.old-price{
	text-decoration: line-through;
	font-size: 24rpx;
	color: #999999;
}
.discount{
	border-radius: 4rpx;
	border: 1px solid #FF3333;
	padding: 2rpx 10rpx;
	font-size: 20rpx;
	color: #FF3333;
}
</style>
