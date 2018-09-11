import * as types from './mutations-type'

const mutations = {
	[types.SET_NICKNAME](state,name){
		state.nickName = name
	},
	[types.SET_CARTCOUNT](state,count){
		state.cartCount += count
	},
	[types.INIT_CARTCOUNT](state,count){
		state.cartCount = count
	}
}

export default mutations