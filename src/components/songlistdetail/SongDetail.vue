<template>
  <div>
    <el-card class="box-card">
        <div class="header">
            <div class="icon-wrap"><img :src="playlist.backgroundCoverUrl" alt="" ></div>
            <div class="context-wrap">
                <span>{{playlist.name}}</span>
                <div v-if="playlist.creator" class="creatorInfo">   <!--解决数据找不到报错：用v-if控制是否渲染-->
                    <img :src="playlist.creator.avatarUrl" alt="">
                    <span class="creatoor">{{playlist.creator.nickname}}</span>
                    <span class="createTime">{{playlist.createTime | dataFormat}} 创建</span>
                </div>
                <!--v-if让有数据了再统一显示-->
                <p v-if="playlist.tags"><span>标签：</span><el-tag v-for="(item,index) in playlist.tags" :key="index">{{item}}</el-tag></p>
                <p v-if="playlist.description"><span>简介：</span><span>{{playlist.description}}</span></p>
            </div>
        </div>
        <div></div>
    </el-card>
    <el-card class="box-card bottom-card">
        <el-tabs>
            <el-tab-pane label="歌单列表" >
                <el-table  :data="songs" :row-class-name="tableRowClassName" class="customer-table" @row-dblclick="getMusicUrl">
                    <el-table-column label="歌名" prop="name"></el-table-column>
                    <el-table-column label="歌手" prop="ar[0].name"></el-table-column>
                    <el-table-column label="专辑" >
                        <template slot-scope="scope" ><span class="singleStyle">《{{scope.row.al.name}}》</span></template><!--使用插槽个性化-->
                    </el-table-column>
                    <el-table-column label="时长" prop="dt">
                        <template slot-scope="scope"><span class="singleStyle">{{scope.row.dt | dataFormat1}}</span></template>  <!--使用插槽和全局过滤器-->
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论"></el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Pubsub from 'pubsub-js' //引入消息订阅与发布
export default {
    name:'SongDetail',
    data(){
        return{
            detailId:window.sessionStorage.getItem('songListId'),// 从sessionStorage中获取所点击的歌单id
            playlist:{
                // creator:{} <!--解决数据找不到报错-->
            }, //用于存放单个歌单数据的对象
            songs:[]  //对象数组，存放每一首的信息
        }
    },
    methods:{
        async getDetail(){                              //获取单个歌单的列表信息
            const {data:res}=await this.$http.get('/playlist/detail',{            //(解构赋值)获取具体id对应歌单列表信息
                params:{
                        id:this.detailId
                }
            })
            this.playlist=res.playlist
            const {data:res_1}=await this.$http.get('/playlist/track/all',{
                params:{
                    id:this.detailId
                }
            })
            this.songs=res_1.songs
            // console.log(this.songs)

            // console.log(this.playlist)
        },
        tableRowClassName({row, rowIndex}) {   //设置table的样式
            
        if (rowIndex%2 === 0) {
            // console.log(rowIndex)
          return 'warning-row';
        } else if (rowIndex%2 === 1) {
          return 'success-row';
        }
        return '';
        },
        // 双击歌曲触发事件
        getMusicUrl(row){
            
            this.getMusicUrlNext(row.id,row.dt)
            
        },
        async getMusicUrlNext(id,br){
            Pubsub.publish('stop') //先将middle图标设置为暂停
            const res= await this.getMuslicGlobal(id,br)
            if(res!=='ok'){  
                this.$message('sorry')   //无法播放的情况
            }
            
            Pubsub.publish('songDetail')  //能够播放，则设置图标为正在播放
            //将歌单所有歌曲信息传输给Footer组件
            this.$store.commit('xiugai',1)  //赋值标志为1
            Pubsub.publish('tranferSongs',[this.songs,id,br])  //数字1代表是从列表点击歌的
        }
    
    },
    created(){   //路由创建时候执行
        this.getDetail() 
        Pubsub.subscribe('lastornext',(msgName,data)=>{
            this.getMusicUrlNext(data[0],data[1])
        })
    },

}
</script>

<style scoped>
/* 歌单简介信息部分 */
.box-card{
        /* 设置大小 */
    width: 1200px;
    /* 设置居中 */
    margin: 0 auto; 
    background-color: rgb(43,43,43);
    /* 将自动生成的lineheight为0，让内容撑开 */
    line-height: 0;  
    color: rgb(208, 208, 208);
    border: 0;
}

.header{
        /* 设置为flex布局 */
    display: flex;
}
/* 左大img */
.icon-wrap>img{
    width: 4.7rem;
    height: 4.5rem;
    border-radius: .3rem;
    
}
/* 右区域 */
.context-wrap{
    /* header的右边设置为自上而下的flex布局 */
    display: flex;
    flex-direction: column;
}
.context-wrap>*{
    margin-left: .4rem;
}
.context-wrap>span{
/* 字体大小 */
    font-size: .5rem;
    /* 字体粗度 */
    font-weight: 700;
    /* 设置高度和居中 */
        height: 1rem;
    line-height: 1rem;
    /* 设置margin */
        margin-bottom: .4rem;
}
/* 作者信息 */
.creatorInfo{
    /* 设置高度和居中 */
    height: 1rem;
    line-height: 1rem;
    /* 设置为flex布局 */
        display: flex;
    align-items: center;
    flex-direction: row;

}
/* 给作者信息各加一个margin */
.creatorInfo>*{
    margin-left: .4rem;
}
.creatorInfo>img{
    width: 1rem;
    height: 1rem;
    border-radius: 1.1rem;
    /* 消除margin */
    margin-left: 0; 

}
.creatoor{
    font-size: .45rem;
    font-weight: 600;
}
.createTime{
    font-size: .3rem;
    font-weight: 600;
}
/* 标签部分+简介部分 */
.context-wrap>p{
    /* 设置字体大小 */
    font-size: .3rem;
    /* 设置高度和居中 */
    /* height: .5rem; */
    line-height: .5rem;
    /* 设置文字向左靠 */
    text-align: left;
    /* 设置粗度 */
    font-weight: 600;
}
/* 标签部分的标签 */
.el-tag{
    color: #626e8ae6;
    margin-left: .2rem;
    
}
/* 歌单简介信息部分 */


@import "../../assets/css/table_text.css";
/* bottom部分 */
.bottom-card{
    margin-top: 1rem;
}
</style>