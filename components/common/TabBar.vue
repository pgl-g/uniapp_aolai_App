<template>
	<view class="tabbar">
		<view class="tab" 
		v-for="(item,index) in tabbarList" 
		:key="index"
		@tap="navigatorTo(item.pagePath)"
		>
			<image v-if="item.pagePath === currentPage " :src="item.selectedIconPath" mode=""></image>
			<image v-else :src="item.iconPath" mode=""></image>
			<view class="text">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentPage:{
				type:String,
				default:'index'
			}
		},
		data(){
			return {
				// 底部导航的选项
				tabbarList:[
							{
						        "pagePath": "index",
						        "iconPath": "/static/tabbar/index.png",
						        "selectedIconPath": "/static/tabbar/index-active.png",
						        "text": "首页"
						    }, 
							{
						        "pagePath": "sort",
						        "iconPath": "/static/tabbar/sort.png",
						        "selectedIconPath": "/static/tabbar/sort-active.png",
						        "text": "分类"
						    },
							{
								"pagePath": "ShopCart",
								"iconPath": "/static/tabbar/shop.png",
								"selectedIconPath": "/static/tabbar/shop-active.png",
								"text": "购物车"
							},
							{
								"pagePath": "ProFile",
								"iconPath": "/static/tabbar/profile.png",
								"selectedIconPath": "/static/tabbar/profile-active.png",
								"text": "我的"
							}
				]
			}
		},
		methods:{
			// 监听跳转到页面
			navigatorTo(e){
				if( e==='ShopCart' || e==='ProFile' ){
					this.navigateTo({
						url:`../../pages/${e}/${e}`,
						animationDuration:300,
						animationType:'fade-in'
					})
				}else {
					uni.reLaunch({
						url:`../../pages/${e}/${e}` 
					})
				}
			}
		}
	}
</script>

<style scoped>
	.tabbar{
		background-color: #FFFFFF;
		z-index: 9999;
		border: 2rpx solid #636263;
		position: fixed;
		bottom: 0;left: 0;
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.tab{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	image{
		width: 40rpx;
		height: 40rpx;
	}
	.text{
		padding: 10rpx 0;
		font-size: 24rpx;
	}
</style>
