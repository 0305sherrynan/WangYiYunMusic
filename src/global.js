import Vue from 'vue'
Vue.prototype.getSpecialLists=function(id,item){ //该函数在songlist模块中用于跳转到具体歌单内容
    window.sessionStorage.setItem('songListId',id)
    this.$router.push({
        name:'SongDetail'
    })
    // console.log(item)
}
Vue.prototype.getMuslicGlobal=async function(id,br){
    const {data:res}=await this.$http.get('/song/url',{
        params:{id,br}
    })
    // console.log(res)
    if(res.data[0].url!=null){
        const newURL=res.data[0].url
        this.$store.commit('getURL',newURL)  //将URL存在store中
        return 'ok'
    }
    else return 'no'
}