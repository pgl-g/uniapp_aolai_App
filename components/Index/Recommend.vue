<template>
	<view class="recommend bg-color">
		<view class="recommend-pic" v-for="(item,index) in dataList" :key="index">
			<image class="pic" :src="item.bigUrl" mode=""></image>
			<view class="recommend-small">
				<block v-for="(k,i) in item.data" :key="i">
					<image class="small" :src="k.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.recommend {
		padding: 20rpx;
	}

	.recommend-pic {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border: 2rpx solid #CCCCCC;
		overflow: hidden;
		margin: 20rpx 0;
	}

	.pic {
		width: 100%;
		height: 300rpx;
	}

	.recommend-small {
		width: 100%;
		height: 240rpx;
	}

	.small {
		width: 33.3333%;
		height: 240rpx;
	}
</style>
