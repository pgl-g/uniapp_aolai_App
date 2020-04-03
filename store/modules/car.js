export default({
	state:{
		// 数据源
		list:[],
		// 定义一个空数组
		selectList:[]
	},
	getters:{
		// 这里直接判断数组是否有数据
		checkAll(state){
			return state.list.length === state.selectList.length
		},
		// 合计
		Totalcount(state) {
			let total = {
				pprice: 0,
				num:0
			}
			state.list.forEach(item=>{
			// 判断selectList中是否有id
				if(state.selectList.indexOf(item.id) > -1){
						total.pprice += item.pprice*item.num
						total.num = state.selectList.length
				}
				
				
			})
			return total
		}
	},
	mutations:{
		// 全选时的状态
		checkAll(state){
			state.selectList = state.list.map(v=>{
				v.checked = true;
				return v.id;
			})
		},
		// 全不选时的状态
		uncheckAll(state){
			state.list.forEach(item=>{
				item.checked = false
			})
			state.selectList = []
		},
		// 单选
		selectItem(state,index){
			let id = state.list[index].id
			let i = state.selectList.indexOf(id)
			// 如果selectList 已经存在就代表他之前时选中状态，checked false
			if(i > -1){
				state.list[index].checked = false
				return state.selectList.splice(i,1)
			}
			// 如果之前没有选中，checked=true, 把当前的id添加到selectList
			state.list[index].checked = true
			state.selectList.push(id)
		},
		// 删除
		delGoods(state){
			state.list = state.list.filter(item=>{
				return state.selectList.indexOf(item.id) === -1
			})
		},
		// 加入到购物车, 将goods  push到  list中
		addcar(state,goods){
			state.list.push(goods)
		}
	},
	actions:{
		checkAllfn({commit,getters}){
			getters.checkAll ? commit('uncheckAll') : commit('checkAll')
			commit('selectItem')
		},
		delGoodsFn({commit}){
			commit('delGoods')
			commit('uncheckAll')
			uni.showToast({
				title:"删除成功",
				icon:"none"
			})
		}
	}
})