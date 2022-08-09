const actions={}
const state={
    musicUrl:null
}
const mutations={
    getURL(state,value){
        state.musicUrl=value
        console.log(1)
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