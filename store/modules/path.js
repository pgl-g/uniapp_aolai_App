export default {
	state: {
		list: [{
				name: '李四',
				modile: "155555555",
				addressname: "江西省上饶市玉山县",
				address: "5号",
				isdefault: false // 默认地址
			},
			{
				name: '五五',
				modile: "155555555",
				addressname: "江西省上饶市玉山县",
				address: "5号",
				isdefault: true // 默认地址
			}
		]
	},
	getters: {
		defaultPath(state) {
			return state.list.filter(item => item.isdefault)
		}
	},
	mutations: {
		// 新增地址
		creatPath(state, obj) {
			state.list.unshift(obj)
		},
		// 更新地址（编辑地址）
		updatePath(state, {
			index,
			item
		}) {
			for (let i in item) {
				state.list[index][Key] = item[Key]
			}
		},
		// 移除默认按钮
		removePath(state) {
			state.list.forEach(item => {
				if (item.isdefault) {
					item.isdefault = false
				}
			})
		}
	},
	actions: {
		creatPathFn({
			commit
		}, obj) {

			if (obj.isdefault) {
				commit('removePath')
			}

			commit('creatPath', obj)
		},
		updatePathFn({
			commit
		}, obj) {
			if (obj.item.isdefault) {
				commit('removePath')
			}

			commit('updatePath', obj)
		}
	}
}
