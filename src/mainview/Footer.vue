<template>
  <div class="bigBox">
    <el-row>
        <el-col :span="8">1</el-col>
        <el-col :span="2" class="count"><span class="spanStyle">{{currentTime}}</span></el-col>
        <el-col :span="4" class="middleControls">
            <div class="middleBoxHead">
                <img :src="this.lastSong" alt="">
                <img :src="this.playMiddle" alt="" @click="playMusic"  v-if="!this.isplay">
                <img :src="this.stop" @click="playMusic" alt="" v-else>
                <img :src="this.nextSong" alt="">
            </div>
            <div class="middleBoxBottom">
                
                <el-slider v-model="progress"></el-slider>
               
            </div>
        </el-col>
        <el-col :span="2" class="count"> <span class="spanStyle">{{duration}}</span></el-col>
        <el-col :span="8"></el-col>
    </el-row>
    <audio :src="this.$store.state.musicUrl" class="musicAudio"  autoplay @timeupdate="percentageChange" ></audio>
  </div> 
</template>

<script>
import playMiddle from '../assets/img/播放2.png'
import lastSong from '../assets/img/上一首.png'
import nextSong from '../assets/img/下一首.png'
import stop from '../assets/img/暂停.png'
import Pubsub from 'pubsub-js' //引入消息订阅与发布
export default {
    name:'Footer',
    data(){
        return{
            
            playMiddle,
            lastSong,
            nextSong,
            stop,
            isplay:false,
            // musicURL:this.$store.state.musicUrl
            //拖拽条
            progress:0,
            customColor:'#409eff',
            currentTime:0,
            duration:0,
            
        }
    },
    methods:{
        // 控制暂停播放
         playMusic(){
            //  const audio = window.document.querySelector('.musicAudio') //获取audio元素
            //  console.log(audio)
             if(this.audio.paused==true){  //目前音频处于暂停状态，转为播放状态
                this.audio.play()
                
             }
             else this.audio.pause()  //目前音频处于播放状态，转为暂停状态
             this.isplay=!this.isplay  //图片切换
        },
        percentageChange(){  //拖拽条动态变化

                    var filters=this.$options.filters   //获取全局过滤器
                    this.duration=filters.dataFormat1(this.audio.duration*1000) //获取总时长
                    this.currentTime=filters.dataFormat1(this.audio.currentTime*1000)  //动态获取当前时间
                    if(this.audio.duration !== NaN)
                    this.progress=this.audio.currentTime/this.audio.duration*100 // 拖拽条随着timeupdate事件的发生而改变

            
            //  console.log(this.percentage)
        }

    },
    mounted(){
        // 暂停
        Pubsub.subscribe('stop',(msgName,data)=>{
            this.isplay=false
        })
        // 正在播放
        Pubsub.subscribe('songDetail',(msgName,data)=>{
            this.isplay=true
            
            // console.log(typeof(this.audio.currentTime/this.audio.duration))
 
           
           
            // console.log(this.percentage)
        })
    },
    computed:{
        audio(){ //动态获取audio标签
            return window.document.querySelector('.musicAudio')
        },


        
    }
}
</script>

<style scoped>

/* 中间按钮和拖拽条 */
.middleControls img{
    width: 1rem;
    height: 1rem;
}

.middleBoxHead{
    height: .8rem;
}
.middleBoxBottom{
    height: 1.2rem;
}
/* 两个计数 */
.count{
    position: relative;
    top: .8rem;
}
.spanStyle{
    font-size: .4rem;
    color: rgb(88, 88, 91);
    font-weight: 700;
}
</style>