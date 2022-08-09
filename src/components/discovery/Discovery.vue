<template>
    <div class="box"> 
        <!-- 轮播图 -->
        <!-- <el-header></el-header> -->
        <div class="carousel">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <!-- <h3 class="medium">{{ item }}</h3> -->
                    <img :src="item.imageUrl" alt="" class="banner_img">
                    </el-carousel-item>
                </el-carousel>
        </div>
        <!-- 推荐歌单 -->
        <div class="command">
                <el-row class="commandHead" >
                    <el-col :span="2.5"  ><span >推荐歌单</span></el-col>
                </el-row>
                <div class="commandBox">
                    <div v-for="item in CommandLists" :key="item.id" class="commandSingleBox">
                        <img :src="item.picUrl" alt="" class="command_img" @click="getSpecialLists(item.id,item)">
                        <span >{{item.name}}</span>
                    </div>
                </div>
        </div>
        <!-- 最新音乐 -->
        <div class="latestMusic">
                <el-row class="commandHead">
                    <el-col :span="2.5"><span>最新音乐</span></el-col>
                </el-row>
                <div class="latestMusicBox">
                    <div v-for="item in lateMusicLists" :key="item.id" class="latestSingleBox">
                        <img :src="item.picUrl" alt="" class="latest_img" >
                        <div class="latestText">
                            
                                    <h3>{{item.name}}</h3>
                                    <span>{{item.song.artists[0].name}}</span>
                            
                        </div>
                    </div>
                </div>
        </div>
        <!-- 最新MV -->
        <div  class="latestMV">
            <el-row class="commandHead">
                <el-col :span="2.5"><span>推荐MV</span></el-col>
            </el-row>
            <div>
                <div v-for="item in commandMV" :key="item.id" class="MV_SingleBox">
                    <img :src="item.picUrl" alt="" class="MV_img">
                    <div class="MV_text"><span>{{item.name}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'discovery',
    data(){
        return {
            banners:[],//轮播图照片
            CommandLists:[],//推荐歌单列表
            lateMusicLists:[], //最新音乐
            commandMV:[],//推荐音乐
        }
    },
    methods:{
        async getBanner(){ //获取轮播图照片
            const {data:res}=await this.$http.get('/banner',{
                params:{
                    type:0
                }
            })
            this.banners=res.banners
        },
        async getCommandLists(){  //获取推荐歌单
            const {data:res}=await this.$http.get('/personalized',{
                params:{
                    limit:12 //歌单数量
                }
            })
            // console.log(data)
            this.CommandLists=res.result
        },
        async getLatestMusic(){  //获取最新音乐
            const {data:res}=await this.$http.get('/personalized/newsong',{
                params:{
                    // limit:9  //取出的数量
                }
            })
            this.lateMusicLists=res.result
            // console.log(res)
        },
        async getCommandMV(){  //获取推荐MV
            const {data:res}=await this.$http.get('/personalized/mv')
            // console.log(data)
            this.commandMV=res.result
        }
    },
    created(){
        this.getBanner()
        this.getCommandLists()
        this.getLatestMusic()
        this.getCommandMV()
    }
}
</script>

<style scoped>
  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
    background-color: rgb(34, 34, 37);
  }
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
  /* 给所有小模块一个边框 */
  .box>div{
    border-radius: .5rem;
  }
  .el-carousel__item h3 {
    /* color: #475669; */
    color: rgb(208, 208, 208);
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /* 轮播图 */
  .carousel{
    height: 7rem;
  }
  .banner_img{
    /* width: ; */
    /* 设置轮播图图片大小 */
    width: 12rem;
    height: 4rem;
   
  }
 
/* 推荐菜单 */
.command{
    /* display: flex; */
    /* background-color: rgb(177, 194, 203); */
     background-color: rgb(43, 43, 43);
    /* 设置内边距 */
    padding: 1rem;
}

.commandHead{
    font-size: .5rem;
    font-weight: 700;
    text-align: left;
    /* 字体垂直居中 */
    height: 1rem;
    line-height: 1rem;
    /* 下外边距 */
    margin-bottom: .5rem;
} 
.commandBox{
    /* 设置为flex布局 */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;

}
.commandSingleBox{
    /* 设置每个小块的宽度 */
width: 5rem;
/* 行内块 */
/* display: inline-block; */
/* 设置外边距 */
margin-bottom:1rem;
/* height: 5rem; */
}
/* 文字叙述部分 */
.commandSingleBox>span{
    font-size: .3rem;
    /* 宽度设置和图片一样，方便省略，不出格，美观 */
    width: 4rem;  
    height: .5rem;
    line-height: .5rem;
    /* 省略超出宽度的字 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.command_img{
    /* 设置每张图片的大小 */
    width: 4rem;
    height: 4rem;
    /* 设置为块元素 */
    display: block;
    border-radius: .5rem;
}
.command_img:hover{
    cursor: pointer;
}

/* 最新 音乐 */
.latestMusic{
    /* display: flex; */
    /* background-color: rgb(177, 194, 203); */
     background-color: rgb(43, 43, 43);
    /* 设置内边距 */
    padding: 1rem;
    /* 设置上边距 */
    margin-top: 1rem;
    /* 清除子元素的浮动 */
    overflow: hidden;
}
.latestSingleBox{
    /* 设置为行内块 */
    /* display: inline-block; */
    /* 设置为左浮动 */
    float: left;
    /* 设置宽度 */
    width: 50%;
    /* background-color: ; */
    /* 设置子元素的对齐方式（根元素设置了为center） */
    text-align: left;
    /* 清除自带的line-height */
    line-height: 0;
    /*设置边距  */
    margin-top: .2rem;
    
}
.latest_img{
    width: 2rem;
    height: 2rem;
}
.latestText{
    font-size: .2rem;
    line-height: .2rem;
    /* width: 50%; */
    display: inline-block;
    /* text-align: top; */
    /* 设置为相对定位 （此处思路本想再用一个父盒子，但是height设置不出为父元素的100%）*/
    position: relative;
    top: -1.3rem;
    /*  */
    padding-left:.2rem ;
}


/* 推荐MV */
/* 大盒子 */
.latestMV{
        /* display: flex; */
    /* background-color: rgb(177, 194, 203); */
     background-color: rgb(43, 43, 43);
    /* 设置内边距 */
    padding: 1rem;
    /* 设置上边距 */
    margin-top: 1rem;
    /* 清除line-height */
    line-height: 0;
}
/* 大盒子 */
.latestMusicBox{
    margin-left: 1rem;
}
/* 每一个小盒子 */
.MV_SingleBox{
    /* 设置为行内块 */
    display: inline-block;
    /* 设置边距 */
    margin-right: .3rem;
}
.MV_img{
    width: 4.9rem;
    height: 3rem;
    border-radius: .4rem;
}
.MV_text{
        font-size: .2rem;
    line-height: .2rem;
    /* 设置边距 */
    margin-top: .21rem;
    
}
.MV_text span{
    width: 5rem;
        /* 省略超出宽度的字 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>