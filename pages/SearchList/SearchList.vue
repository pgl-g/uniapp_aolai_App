<template>
	<view>
		<ShopList :keyDown="keyDown"></ShopList>
	</view>
</template>

<script>
	import ShopList from '@/components/common/ShopList.vue';
	export default {
		components: {
			ShopList
		},
		data() {
			return {
				keyDown: ''
			};
		},
		onLoad(e) {
			this.keyDown = e.keyDown
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview();
			// 设置 searchInput的 text  
			webView.setTitleNViewSearchInputText(e.keyDown)  
			// #endif
		}
	}
</script>

<style lang="less">

</style>
