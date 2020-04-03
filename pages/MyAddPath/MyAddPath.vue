<template>
	<view class="my-add-path">
		
		<view class="path-item">
			<view>收 件 人</view>
			<input type="text" value="" placeholder="收件人姓名"  v-model="pathName.name"/>
		</view>
		
		<view class="path-item">
			<view>手 机 号</view>
			<input type="text" value="" placeholder="请输入手机号" v-model="pathName.modile"/>
		</view>
		
		<view class="path-item">
			<view>所 在 地 址</view>
			<view @tap="showCityPicker"> {{pathName.cityname}} > </view>
			<mpvue-city-picker 
			ref="mpvueCityPicker" 
			:pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		
		<view class="path-item">
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到50个字符"  v-model="pathName.addressname"/>
		</view>
		
		
		<view class="path-item">
			<view>设为默认地址</view>
			<radio-group name="" @change="Changeradio">
				<label class="radio">
					<radio value="" color="#FF3333" :checked="pathName.isdefault"/><text></text>
				</label>
			</radio-group>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import { mapActions } from 'vuex'
	export default {
		components:{
			mpvueCityPicker 
		},
		data() {
			return {
				 pickerValueDefault: [0, 0, 1],
				 pathName:{
					 name:'',
					 modile:'',
					 cityname:"请选择",
					 addressname:'',
					 address:'',
					 isdefault:false
				 },
				 i:-1,
				 // 是否修改的状态
				 isStatus:false
			}
		},
		onLoad(e) {
			if(e.data){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				let result = JSON.parse(e.data)
				this.i = result.item
				this.isStatus = true
			}
			
		},
		// 点击保存按钮
		onNavigationBarButtonTap() {
			if(this.isStatus) {
				// 修改
				this.updatePathFn({
					 index:this.i,
					 item:this.pathName
				})
			}else{
				// 新增的
				this.creatPathFn(this.pathName)
				uni.navigateBack({
					delta:1
				})
			}
			
		},
		methods: {
			...mapActions(['creatPathFn','updatePathFn']),
			 showCityPicker() {
			      this.$refs.mpvueCityPicker.show();
			    },
			    onConfirm(e) {
			      this.pathName.cityname = e.label
			    },
				// 改变按钮的默认选项
				Changeradio(){
					this.pathName.isdefault = !this.pathName.isdefault
				}
		}
	}
</script>

<style scoped>
.my-add-path{
	padding-left: 20rpx;
}
.path-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 0;
	width: 100%;
	border-bottom: 2rpx solid #CCCCCC;
}
.path-item input{
	flex: 1;
	text-align: left;
	padding-left: 20rpx;
}
</style>
