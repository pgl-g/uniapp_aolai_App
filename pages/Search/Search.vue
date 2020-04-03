<template>
	<view class="search">
		<Lines />
		<view class="search-item">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-lajitong" @tap="clearHistory"></view>
			</view>
			<view v-if="searchData.length > 0">
				<view class="search-name f-color" @tap="navToSearch(item)" v-for="(item,index) in searchData" :key="index">{{item}}</view>
			</view>
			<view v-else class="search-none">暂无数据...</view>
		</view>

		<view class="search-item">
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			<view>
				<view class="search-name f-color">四件套</view>
				<view class="search-name f-color">面膜</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		components: {
			Lines
		},
		data() {
			return {
				// 输入的关键词
				keyDown: '',
				searchData: []
			};
		},
		onLoad() {
			// 在onload页面加载的时候取出所保存的记录
			uni.getStorage({
				key: "searchData",
				success: (res) => {
					this.searchData = JSON.parse(res.data)
				}
			})
		},
		// 标题栏生命周期，监听点击跳转到搜索列表
		onNavigationBarButtonTap(e) {
			this.search()
		},
		// 监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(e) {
			this.keyDown = e.text
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		methods: {
			// 封装一个搜索的search方法
			search() {
				if (this.keyDown === "") {
					return uni.showToast({
						title: "关键字不能空",
						icon: "none"
					})
				} else {
					this.navToSearch(this.keyDown)
				}
				uni.hideKeyboard()
				this.searchSave()
			},
			// 保存最近搜索记录
			searchSave() {
				let idx = this.searchData.indexOf(this.keyDown)
				if (idx < 0) {
					// 往前面添加数据
					this.searchData.unshift(this.keyDown)
				} else {
					// 先删除在添加
					this.searchData.unshift(this.searchData.splice(idx, 1)[0])
				}
				// 先把搜索记录保存起来
				uni.setStorage({
					key: "searchData",
					data: JSON.stringify(this.searchData)
				})
			},
			// 清除搜索记录
			clearHistory() {
				// 显示模态弹窗，类似于标准 html 的消息框：alert、confirm。
				uni.showModal({
					title: '重要提示',
					content: '是否清除历史记录',
					cancelText: '取消',
					confirmText: '确认',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: "searchData"
							})
							this.searchData = []
						}
					}
				})
			},
			// 点击最近搜搜记录进入搜索页面
			navToSearch(item) {
				uni.navigateTo({
					url: `/pages/SearchList/SearchList?keyDown=${item}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search-item {
		padding: 20rpx;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
	}

	.search-name {
		padding: 4rpx 24rpx;
		background-color: #e1e1e1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}

	.search-none {
		text-align: center;
	}
</style>
