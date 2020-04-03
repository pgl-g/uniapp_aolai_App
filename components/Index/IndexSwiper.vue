<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in dataList" :key="index">
				<view class="swiper-item" >
					<image class="img-index" :src="item.imgUrl" mode=""></image>
					</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			dataList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
swiper{
	width: 100%;
	height: 300rpx;
}
.img-index{
	width: 100%;
	height: 300rpx;
}
</style>
