<template>
	<view class="card">
		<view>--</view>
		<view class="cardname">{{cardtitle}}</view>
		<view>--</view>
	</view>
</template>

<script>
	export default {
		props: {
			cardtitle: {
				type: String,
				default () {
					return ""
				}
			}

		}
	}
</script>

<style scoped>
	.card{
		padding: 20rpx 0;
		display: flex;
		justify-content: center;
		font-weight: bold;

	}
	.cardname{
		padding: 0 20rpx;
		font-size: 32rpx;
	}
</style>
