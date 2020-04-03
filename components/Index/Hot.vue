<template>
<view class="hot">
	<Commodity :itemshop="dataList" hotWidth="250rpx" hotHeight="220rpx"></Commodity>
</view>
</template>

<script>
	import Commodity from '../common/Commodity.vue'
	export default{
		components:{
			Commodity
		},
	props:{
		dataList:Array
	}
	}
</script>

<style>
</style>
