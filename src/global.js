import Vue from 'vue'
Vue.prototype.getSpecialLists=function(id,item){ //该函数在songlist模块中用于跳转到具体歌单内容
    window.sessionStorage.setItem('songListId',id)
    this.$router.push({
        name:'SongDetail'
    })
    console.log(item)
}