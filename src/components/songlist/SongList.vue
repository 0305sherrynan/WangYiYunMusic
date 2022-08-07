<template>
  <el-card class="box-card" >
    <!-- 精品菜单区域 -->
    <div  class="OnePlayLists">
        <div class="icon-wrap">
            <img :src="OnePlayLists.coverImgUrl" alt="" class="bigImg">
        </div>
        <div class="content-wrap">
            <div class="tag">精品菜单</div>
            <p class="info">{{OnePlayLists.name}}</p>
            <p class="info_bottom"> {{OnePlayLists.copywriter}}</p>
        </div>

    </div>
    <!-- 歌单列表展示 -->
    <el-tabs  v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane v-for="(item,index) in MusicSortLists"   :key="item.id" :name="index.toString()" >
             <span slot="label" class="tagText"> {{item.name}}</span>
            <div v-for="(item) in MusicSingleList" :key="item.id" class="MusicSingleList_list" >
                  <img :src="item.coverImgUrl" alt="" class="MusicSingleList_img" @click="getSpecialLists(item.id,item)">  <!--getSpecialLists详情可见global.js-->
                  <span>{{item.name}}</span>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-pagination
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="12"
    layout="prev,pager,next"
    :total="total"
    >

    </el-pagination>
  </el-card>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'SongList',
    data(){
      return{
        activeName:0,  //用于标志被激活的tab
          OnePlayLists:{},//用于存储最上方的资源
          MusicSortLists:[], //存放歌单分类标签
          MusicSingleList:[]  , //存放标签所对应资源歌单
          total:0,              //单个歌单所存储的歌数目
          currentPage:1,        //当前页页号
      }
    },
    methods:{
        handleClick(){  //tab被点击时触发获取歌单事件
        this.OnePlayLists={}
        this.MusicSingleList=[] //清空上一次请求的资源存储
        this.getSingleMusic()
        this.getOnePlayLists()
        },
        async getOnePlayLists(){  //请求最上方资源
            const res=await this.$http.get('/top/playlist/highquality',{params:{
              limit:1,
              cat:this.MusicSortLists[0].name
            }})
            // console.log(res)
            this.OnePlayLists=res.data.playlists[0]  //获取资源
        },
        async getMusicSortLists(){  //获取歌单种类名
           const sortLists=await this.$http.get('/playlist/highquality/tags',{
            params:{
              limit:10,//取出的数量为10
            }

           })
           console.log(sortLists)
          //将标签放入array中
          let temp=[]
           sortLists.data.tags.forEach((element,index) => {
            if(index<=9){
                          this.MusicSortLists.push(
              {
                id:element.id,
                name:element.name
              }
            )
            }
           });
          //  this.MusicSortLists=temp
          //  console.log(this.MusicSortLists)
        },
        async getSingleMusic(){  //点击标签时获取对应资源
          const res=await this.$http.get('/top/playlist',{
                params:{
                  limit:12,//取出单页歌单数量
                  offset:(this.currentPage-1)*12,   //用于分页
                  cat:this.MusicSortLists[this.activeName].name //标签
                }
          })
          // console.log(res)
          //资源存储
          this.MusicSingleList=res.data.playlists 
          this.total=res.data.total
           
        },
        handleCurrentChange(val){ //当前页号赋值和再次请求资源和渲染页面
           this.currentPage=val  
           this.getSingleMusic()
        },
        async initLoad(){   //定义一个异步函数，放在created中
          await this.getMusicSortLists()
          this.getOnePlayLists()
          this.getSingleMusic()
        }
    },
    created(){     //刚创建路由时候就必须请求资源
        this.initLoad()
    },
    computed:{
      az:function(){
        return nanoid()
      }
    }
}
</script>

<style scoped>

  .OnePlayLists{
    /* 使用flex布局 */
    display: flex;  
  }
  .OnePlayLists:before,
  .OnePlayLists:after {
    display: table;
    content: "";
  }
  .OnePlayLists:after {
    clear: both
  }

  .box-card {
    /* 设置大小 */
    width: 1200px;
    /* 设置居中 */
    margin: 0 auto; 
    background-color: rgb(43, 43, 43);
    /* 将总体的line-height关闭 */
    line-height: 0;
    border: 0px solid red;
  }

  /* 上方大相片 */
  .bigImg{
    width: 3.2rem;
    height: 3.2rem;
  }
  .icon-wrap{
    /* 清除默认line-height */
    line-height: 0;
  }
 /* 精品菜单 */
 .tag{
    /* 文字大小 */
    font-size: .32rem;
    /* 文字颜色 */
    color: rgb(201, 153, 93);
    /* 宽度 */
    width: 2rem;
    /* 高度 */
    height: .6rem;
    /* 保证垂直居中 */
    line-height: .6rem;
        /* 文本水平居中 */
    text-align: center;
    /* 边框 */
    border: 1px solid rgb(231, 170, 90);
    border-radius: 40px;
 }
  /* 上方文字 */
  .info{
    /*文字大小  */
   font-size: 0.35rem;
   /* 文字颜色 */
   color: white;
   /* 高度和保持垂直居中 */
    height: .2rem;
    line-height: .2rem;
    /* 文本水平居中 */
    text-align: center;
  }
  /* 文字 */
  .info_bottom{
        /*文字大小  */
   font-size: 0.22rem;
   /* 文字颜色 */
   color: rgb(166, 166, 168);
   /* 设置高度和垂直居中 */
    height: .3rem;
    line-height: .3rem;
    /* 文字左对齐 */
    text-align: left;
  }

  .content-wrap{
    margin-left: .2rem;
  }



/* 歌单资源区 */
.tagText{
  color: rgb(135, 135, 135);
}
.MusicSingleList_img{
  border-radius: .2rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
}

.MusicSingleList_list{
  display: inline-block;
  margin-left: 1rem;
  width: 4rem;
  height: 4rem;
  /* 设置上边距 */
  margin-top: 1rem;
}
.MusicSingleList_list>span{
  color: rgb(208, 208, 208);
width: 4rem;
    font-size: .001rem;
    height: 1rem;
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>