<template>
	<view class="sort">
		<Lines />
		<view class="content">
			<!-- 左边盒子 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+ clientHeight +'px;'">
				<view v-for="(item,index) in leftData" :key="index" class="left-item">
					<view class="left-name" :class="currentIndex === index ? 'left-name-active':''" @tap="ChangeIndex(index,item.id)">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<!-- 右边盒子 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+ clientHeight +'px;'">
				<view class="right-list" 
				v-for="(item,index) in rightData" 
				:key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(j,idx) in k.list" :key="idx">
								<image class="right-img" :src="j.imgUrl" mode=""></image>
								<view class="right-name">{{j.name}}</view>
							</view>
						</view>
					</block>

				</view>

			</scroll-view>
		</view>
		<TabBar currentPage="sort"></TabBar>
	</view>
</template>

<script>
	import TabBar from '@/components/common/TabBar.vue'
	import Lines from '@/components/common/Lines.vue'
	import $http from '@/common/api/request.js'
	export default {
		components: {
			Lines,
			TabBar
		},
		data() {
			return {
				clientHeight: 0,
				currentIndex: 0,
				// 左侧的数据源
				leftData: [],
				// 右侧的数据源
				rightData: []
			}
		},
		onReady() {
			// 获取内容可视区域的高度 
			uni.getSystemInfo({
				success: (res) => {
					this.clientHeight = res.windowHeight - this.getsystmClientHeight()
					// this.clientHeight = 2000	
					// this.clientHeight = res.windowHeight - uni.upx2px(80)
				}
			})
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: `/pages/Search/Search`
			})
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 请求数据
			getData(id) {
				if (id === (this.currentIndex + 1)) {
					return;
				}
				// 请求数据源
				$http.request({
					url: '/goods/list'
				}).then(res => {
					let leftData = []
					let rightData = []
					let that = this
					res.forEach(item => {
						leftData.push({
							id: item.id,
							name: item.name
						})
						// 如果id相同就加载右侧的数据  为什么我这边的的数据判断有问题
						let idx = that.currentIndex + 1
						
							that.rightData = item.data
					})
					this.leftData = leftData
					
				}).catch(() => {
					uni.showToast({
						title: "请求失败",
						icon: "none"
					})
				})
			},

			// 获取手机不同设备的可视高度（ios，android）兼容(但是我这里有bug没有用)  这里的数据没有用
			// 获取到的手机状态栏上的信息不准确
			getsystmClientHeight() {
				const res = uni.getSystemInfoSync()
				// console.log(res)
				// console.log(res.platform,res.statusBarHeight)
				const systme = res.platform
				if (systme === 'android') {
					return -28 + res.statusBarHeight
				} else if (systme === 'ios') {
					return 44 + res.statusBarHeight
				} else {
					return
				}
			},
			// 监听左侧点击事件
			ChangeIndex(index, id) {
				this.getData(id)
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
	}

	/* 左边样式 */
	.list-left {
		width: 200rpx;
	}

	.left-item {
		border: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		background-color: #F7F7F7;
	}

	.left-name {
		padding: 30rpx 6rpx;
		text-align: center;
	}

	.left-name-active {
		border-left: 8rpx solid #49bdfb;
		background-color: #FFFFFF;
	}

	/* 右边样式 */
	.list-right {
		flex: 1;
		padding-left: 30rpx;
	}

	.list-title {
		font-weight: bold;
		padding: 30rpx 0;
	}

	.right-content {
		display: flex;
		flex-wrap: wrap;
	}

	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}

	.right-name {
		padding: 16rpx 0;
	}

	.right-img {
		width: 150rpx;
		height: 150rpx;
	}
</style>
