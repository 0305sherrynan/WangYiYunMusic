<template>
    <div class="box">
        <div class="leftbox">
            <span>视频详情</span>
            <video :src="videoUrl" width="600px" height="360px" controls autoplay></video>
            <div>
                <img :src="videoDetail.__ob__.value.cover" alt="" width="100px" height="100px">
                <span></span>
            </div>
        </div>
        <div class="rightbox">
            <span>相关推荐</span>
            <div v-for="(item,index) in relatedResource" :key="index" class="relatedBox">
                <img :src="item.coverUrl" alt="" @click="switchVideo(item.vid)">
                <div class="rightText">
                    <span class="headText">{{item.title}}</span>
                    <span class="lastText">{{item.creator[0].userName}}</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import Pubsub from 'pubsub-js' //引入消息订阅与发布
export default { 
    name:'BroadCast',
    data(){
        return {
            videoUrl:null,  //视频url
            videoDetail:{}, // 视频细节
            relatedResource:[],//相关视频url

            // relatedUrl:null, 
        }
    },
    methods:{ 
        async getVideoUrl(id){   //获取视频URL
            const {data:res} = await this.$http.get('/mv/url',{
                params:{
                    id
                }
            })
            this.videoUrl = res.data.url
            const {data:res1} = await this.$http.get('/related/allvideo',{   //获取相关视频URL
                params:{
                    id
                }
            })
            this.relatedResource = res1.data
            // console.log(this.relatedResource)
        },
        async getVideoDetail(id){        //获取视频细节
            const {data:res} = await this.$http.get('/mv/detail',{
                params:{
                    mvid:id
                }
            })
            this.videoDetail = res.data
            console.log(this.videoDetail)
        },
        switchVideo(id){   //点击相关视频切换视频
            this.getVideoUrl(id)
        }
    },
    created(){
        Pubsub.subscribe('getURL',(msgName,data)=>{
            this.getVideoUrl(data)
            this.getVideoDetail(data)
        })
    }
}
</script>

<style scoped>
.box{
       /* 设置大小 */
    width: 1200px;
    /* 设置居中 */
    margin: 0 auto; 
    display: flex;
}
.leftbox{
    width: 600px;
}
.leftbox>span{
    display: block;
    /* height: 5rem; */
    font-size: .5rem;
    line-height: 1rem;
}
.rightbox{
    /* width: 300px; */
    margin-left: .9rem;
}
.rightbox>span{
    display: block;
    /* height: 5rem; */
    font-size: .5rem;
    line-height: 1rem;
}
.relatedBox{
    display: flex;
    margin-top: .19rem;
}
.relatedBox>img{
     width: 3.6rem;
    height: 2.3rem;
}
.rightText{
    /* width: 5rem; */
}
.rightText>span{
    display: block;
    width: 5rem;
    font-size: .2rem;
    line-height: .3rem;
}
.headText{
                overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.lastText{
    color:rgb(102, 102, 102);
}
</style>