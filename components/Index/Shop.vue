<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in dataList" :key="index">
			<view class="shop-big" >
				<image class="shop-big" :src="item.bigimgUrl" mode=""></image>
			</view>
			<scroll-view scroll-x="true" class="item">
				<view class="item-list" >
					<Commodity 
					wrap="nowrap" 
					hotWidth="220rpx" 
					hotHeight="180rpx" 
					:itemshop="item.data"
					namesize="20rpx"
					>
					</Commodity>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Commodity from '../common/Commodity.vue'
	export default {
		components: {
			Commodity
		},
	props:{
		dataList:Array
	}
	}
</script>

<style scoped>
	.shop-item {
		width: 100%;
	}

	.shop-big {
		width: 100%;
		height: 350rpx;
	}
	.item{
		width: 100%;
		display: inline-block;
	}
</style>
