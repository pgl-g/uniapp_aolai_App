<template>
	<view class="commodity-list">
	<Commodity :itemshop="dataList"></Commodity>
	</view>
</template>

<script>
import Commodity from './Commodity.vue'
export default {
	components:{
		Commodity
	},
	props:{
		dataList:{
			type:Array,
			default() {
				return []
			}
		},
		
	}
	}
</script>

<style>
</style>
