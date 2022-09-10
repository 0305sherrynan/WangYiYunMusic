const actions={}
const state={
    musicUrl:null,
    choice:null //用于判断是从列表点击的歌还是轮播图
}
const mutations={
    getURL(state,value){
        state.musicUrl=value
        // console.log(state.musicUrl)
    },
    xiugai(state,value){  //修改此时的选择
        state.choice = value
    }
}
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    state,
    mutations
})