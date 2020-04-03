
import store from "../../store/index.js"
export default {
 	commont: {
 		baseUrl: 'http://192.168.1.5:3000/api',
 		data: {},
 		header: {
 			'Content-Type': 'application/json',
 			'Content-Type': 'application/x-www-form-urlencoded'
 		},
 		method: 'GET',
 		dataType: 'json'
 	},
 	request(optation = {}) {
 		optation.url = this.commont.baseUrl + optation.url
 		optation.data = optation.data || this.commont.data
 		optation.header = optation.header || this.commont.header
 		optation.method = optation.method || this.commont.method
 		optation.dataType = optation.dataType || this.commont.dataType
		// 判断是否传入了header头的token进行用户是否登录的验证
		if(optation.header.token){
			 optation.header.token = store.state.user.token;
			 if(!optation.header.token){
				 uni.showToast({
				 	title:"请先登录",
					icon:"none"
				 })
				 return uni.navigateTo({
				 	url:"/pages/login/login"
				 })
			 }
		}
		
 		return new Promise((res, rej) => {
			
 			uni.request({
 				...optation,
 				success: (result) => {
 					if (result.statusCode !== 200) {
 						return rej()
 					}
 					let data = result.data.data;
 					res(data);
 				}
 			})
 		})
 	}
 }
