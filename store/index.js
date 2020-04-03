import Vue from 'vue'
import Vuex from 'vuex'
// 购物车的状态管理
import car from './modules/car.js'
// 新增地址
import path from './modules/path.js'
// 登入信息
import user from './modules/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		car,
		path,
		user
	}
})