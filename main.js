import Vue from 'vue'
import App from './App'
import store from 'store'


Vue.config.productionTip = false
Vue.prototype.$store = store



// 权限问题

Vue.prototype.navigateTo = (options) => {

	if (!store.state.user.userStatus) {
		uni.showModal({
			title: "请先登录",
			icon: "none"
			
		})
		return uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	uni.navigateTo(options)

}






App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
