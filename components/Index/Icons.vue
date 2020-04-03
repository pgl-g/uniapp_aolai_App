<template>
	<view class="icons">
		<view class="icons-item" v-for="(item,index) in dataList" :key="index">
			<image class="icons-img" :src="item.icons" mode=""></image>
			<text class="icons-name">{{item.name}}</text>
		</view>

	</view>
</template>

<script>
	export default {
		
		props:{
			dataList:Array
		}
	}
</script>

<style scoped>
	.icons {
		display: flex;
		flex-wrap: wrap;
	}

	.icons-item {
		width: 25%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
	}

	.icons-img {
		width: 110rpx;
		height: 110rpx;
	}

	.icons-name {}
</style>
