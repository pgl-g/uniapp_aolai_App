export default {
	state:{
		
		// 保存用户的状态
		userStatus:false,
		// token
		token:null,
		// 用户信息(昵称，头像)
		userInfo:{}
	},
	getters:{
		
	},
	mutations:{
		// 一旦进入了app，就需要执行这个方法，把用户信息读出来
		initUser(state){
			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				userInfo = JSON.parse(userInfo)
				state.userInfo = userInfo
				state.userStatus = true
				state.token = userInfo.token
			}
		},
		// 保存用户的登入信息
		login(state, userInfo){
			state.userInfo = userInfo
			state.userStatus = true
			state.token = userInfo.token
			// 持久化存储 ===> 把对象转换成字符串
			uni.setStorageSync('userInfo',JSON.stringify(userInfo))
		},
		// 退出登入
		outLogin(state){
			state.userInfo = {}
			state.userStatus = false
			state.token = null
			uni.removeStorageSync('userInfo')
		}
	},
	actions:{
		
	}
	
}