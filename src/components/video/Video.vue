<template>
  <div class="box">
    <div class="latestMV">  <!--最新MV-->
        <div class="latestHead">
            <span>最新MV</span>
            <div class="latestHeadSort">
                <span v-for="(item,index) in latestMvList" @click="Switch(index)" :key="index"  :class="{'spanClick':index == currentIndex}">{{item}}</span>
            </div>
        </div>
        <div class="lateMVlist">
            <div v-for="item in latestMvDetail" :key="item.id">
                <img :src="item.cover" alt="" class="lateMV_img" @click="sendURLID(item.id)">
                <div class="img_desciption">
                    <h3>{{item.name}}</h3>
                    <span>{{item.artistName}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="latestMV">   <!--网易云出品-->
        <div class="latestHead">
            <span>网易云出品</span>
        </div>
        <div class="lateMVlist">
            <div v-for="item in hotMvDetail" :key="item.id">
                <img :src="item.cover" alt="" class="lateMV_img" @click="sendURLID(item.id)">
                <div class="img_desciption">
                    <h3>{{item.name}}</h3>
                    <span>{{item.artistName}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="latestMV">   <!--热播MV-->
            <div class="latestHead">
                <span>热播MV</span>

            </div>
            <div class="lateMVlist">
                <div v-for="item in WYMvDetail" :key="item.id">
                    <img :src="item.picUrl" alt="" class="lateMV_img">
                    <div class="img_desciption">
                        <span class="wymVText">{{item.name}}</span>
                        <span>{{item.artistName}}</span>
                    </div>
                </div>
            </div>
    </div>
    <div>  <!--MV排行榜-->
        <div class="latestHead ">
            <span>MV排行榜</span>
            <div class="latestHeadSort">
                <span v-for="(item,index) in MVRankList" @click="SwitchRank(index)" :key="index"  :class="{'spanClick':RankCurrentIndex == index}">{{item}}</span>
            </div>
        </div>
        <div class="lateMVlist ">
                <div v-for="item in MVRankDetail" :key="item.id" class="MVRankList">
                    <img :src="item.cover" alt="" class="lateMV_img Rank_img">
                    <div class="img_desciption">
                        <h3>{{item.name}}</h3>
                        <span>{{item.artistName}}</span>
                    </div>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
import Pubsub from 'pubsub-js'
export default {
    name:'Video',
    data(){
        return {
            latestMvList:['内地','港台','欧美','日本','韩国'],
            currentIndex:-1,  //当前最新MV点击的选项索引
            // isClick:,
            latestMvDetail:[],   //用于存储资源
            hotMvDetail:[],  //热播MV资源
            WYMvDetail:[], //网易云出品MV资源
            MVRankList:['内地','港台','欧美','日本','韩国'],//MV排行榜分类
            MVRankDetail:[],  //MV排行榜
            RankCurrentIndex:-1,  //当前MV排行榜点击的选项索引
        }
    },
    methods:{
        async getVideoList(index){   //获取最新MV列表和资源
            const {data:res}=await this.$http.get('/mv/first',{
                params:{
                    area:this.latestMvList[index],
                    limit:8
                }
            })
            this.latestMvDetail = res.data
            // console.log(this.latestMvDetail)
        },
        Switch(index){   //最新MV切换
        this.currentIndex = index  //更改当前点击选项
            this.getVideoList(index)
        },
        async getHotList(){  //获得网易出品资源
            const {data} = await this.$http.get('/mv/exclusive/rcmd',{
                params:{
                    limit:8
                }
            })
            this.hotMvDetail = data.data 
            // console.log(this.hotMvDetail)
        },
        async getWYList(){
            const {data} = await this.$http.get('/personalized/mv',{
                // params:{limit:8}
            })
             this.WYMvDetail = data.result
            // console.log(data)
        },
        async getMVRank(index){   //获取MV排行榜
            const {data:res} = await this.$http.get('/top/mv',{
                params:{
                    limit:10,
                    area:this.MVRankList[index]
                }
            })
            this.MVRankDetail = res.data
            // console.log(this.MVRankDetail)
        },
        SwitchRank(index){  //MV排行榜切换
            this.RankCurrentIndex = index
            this.getMVRank(index)
        },
        sendURLID(id){  //向BroadCast组件发送video的id进而获取URL
            this.$router.push({
                name:'BroadCast'
            })
            Pubsub.publish('getURL',id)
        }

    },
    created(){
        this.getVideoList(0)
        this.getHotList()
        this.getWYList()
        this.getMVRank(0)
    }
}
</script>

<style scoped>
/* 总体大盒子 */
  .box {
    /* 设置大小 */
    width: 1200px;
    /* 设置居中 */
    margin: 0 auto; 
    /* background-color: rgb(177, 194, 203); */
    /* 关闭自带的line-height */
    line-height: 0;
    /* height: 100%; */
    /* margin-top: 3rem; */
  }
  .box>div{
    margin-top: 1rem;
    padding: 50px;
  }
  /* 最新MV部分 */
  .latestHead{
    display: flex;
    /* justify-content: space-around; */
    /* height: 500px; */
  }
  .latestHead>span{
    font-size: .6rem;
    
  }
  .latestHeadSort{
    font-size: .4rem;
    color: rgb(96, 102, 96);
  }
  .latestHeadSort span{
     padding:0 .2rem 0 .2rem ;
     border-right: solid .01rem rgb(53, 53, 53);
  }
    /* 点击时绑定的样式 */
    .spanClick{
        /* cursor: pointer; */
        /* 加入优先级，不然hover会生效 */
        color: rgb(236, 65, 65) !important;  
        background-color: rgb(63, 45, 45);
        border-radius: .2rem;
  }
    .latestHeadSort>span:hover{
        cursor: pointer;
        color: rgb(208, 208, 208);
  }
  .lateMV_img{
    /* 设置每张图片的大小 */
    width: 5rem;
    height: 4rem;
    /* 设置为块元素 */
    display: block;
    border-radius: .5rem;
}
.lateMVlist{
    display: flex;
    /* width: 1200px; */
    flex-direction: row;
    /* align-content: stretch; */
        justify-content: center;
    flex-wrap: wrap;
}
.lateMVlist>div{
    margin-right: .3rem;
    margin-top: 1rem;
}

.img_desciption{
    width:250px;
    height: 70px;
            /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical; */
}
.img_desciption>h3{
    font-size: .3rem;
    line-height: .3rem;
}
.img_desciption>span{
    font-size: .3rem;
}
/* MV排行榜附加 */

.MVRankList{
    display: flex;
    width: 10rem;
    height: 4rem;
    border-bottom:solid 1px rgb(53, 53, 53);
    border-right: solid 1px rgb(53, 53, 53);
}
.Rank_img{
    height: 2.4rem;
}
</style>