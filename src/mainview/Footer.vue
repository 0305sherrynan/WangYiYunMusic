<template>
  <div class="bigBox">
    <el-row>
        <el-col :span="8" class="leftBox">
            <div v-if="picURL!=''" class="leftImg">
                 <img  :src="picURL" alt="">
            </div>
            <div class="leftText">
                <span class="leftText_first">{{songName}}</span>
                <span class="leftText_seconed">{{songAuthor}}</span>
            </div>
        </el-col>
        <el-col :span="2" class="count"><span class="spanStyle">{{currentTime}}</span></el-col>
        <el-col :span="4" class="middleControls">
            <div class="middleBoxHead">
                <img :src="this.lastSong" alt="" @click="lastSongStart">
                <img :src="this.playMiddle" alt="" @click="playMusic"  v-if="!this.isplay">
                <img :src="this.stop" @click="playMusic" alt="" v-else>
                <img :src="this.nextSong" alt="" @click="nextSongStart ">
            </div>
            <div class="middleBoxBottom">
                <el-slider v-model="progress"></el-slider>
            </div>
        </el-col>
        <el-col :span="2" class="count"> <span class="spanStyle">{{duration}}</span></el-col>
        <el-col :span="8" class="rightbox">
            <div class="rightdiv">
                <img :src="volume" alt="">
                <el-slider vertical height="2rem" class="verticalSilder" v-model="volumeSize" @input="volumeChange"></el-slider>
            </div>
        </el-col>
    </el-row>
    <audio :src="this.$store.state.musicUrl" class="musicAudio"  autoplay @timeupdate="percentageChange" ></audio>
  </div> 
</template>

<script>
import playMiddle from '../assets/img/播放2.png'
import lastSong from '../assets/img/上一首.png'
import nextSong from '../assets/img/下一首.png'
import stop from '../assets/img/暂停.png'
import volume from '../assets/img/音量.png'
import Pubsub from 'pubsub-js' //引入消息订阅与发布
export default {
    name:'Footer',
    data(){
        return{
            //图片
            playMiddle,
            lastSong,
            nextSong,
            stop,
            volume,
            // 暂停和播放图片的控制
            isplay:false,
            // musicURL:this.$store.state.musicUrl
            //拖拽条
            progress:0,
            customColor:'#409eff',
            currentTime:0,
            duration:0,
            //订阅与发布传输过来的所有歌曲信息--对象数组
            songs:[],
            //订阅与发布传输过来的所有歌曲信息--当前播放歌曲的ID
            songsID:0,
            // 订阅与发布传输过来的所有歌曲信息--当前播放歌曲的br
            songsBr:0,
            // 当前播放歌曲的下标序列
            currentIDIndex:0,
            // 左侧图片的url
            picURL:'',
            // 歌曲名字
            songName:'',
            // 歌曲作者
            songAuthor:'',
            // 音量大小,并设置默认为20
            volumeSize:20
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
        },
        async lastSongStart(){  //播放上一歌曲

            // this.getMuslicGlobal(this.songs[currentIDIndex-1].id,this.songs[currentIDIndex-1].dt)
            Pubsub.publish('lastornext',[this.songs[this.currentIDIndex-1].id,this.songs[this.currentIDIndex-1].dt])
        },
        async nextSongStart(){  //播放下一歌曲
            // this.getMuslicGlobal(this.songs[currentIDIndex-1].id,this.songs[currentIDIndex-1].dt)
            Pubsub.publish('lastornext',[this.songs[this.currentIDIndex+1].id,this.songs[this.currentIDIndex+1].dt])
        },
        volumeChange(currentValue){  //滑动音量时改变（隐藏事件：一开始刷新时居然会执行一次）
            // console.log(1)
            this.audio.volume=currentValue/100
            this.volumeSize=this.audio.volume*100

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
        //传送歌单所有歌曲的信息，用于循环播放、上、下播放
        Pubsub.subscribe('tranferSongs',async (msgName,data)=>{
            this.songs=data[0]
            // console.log(this.songs[])
            this.songsID=data[1]
            this.songsBr=data[2]
            this.currentIDIndex = await this.songs.findIndex((currentValue)=>{
                return currentValue.id==this.songsID
            })
            // console.log(this.songs[this.currentIDIndex])
            this.picURL = this.songs[this.currentIDIndex].al.picUrl
            this.songName=this.songs[this.currentIDIndex].name
             this.songAuthor=this.songs[this.currentIDIndex].ar[0].name
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
/* 左侧 */
.leftBox{
    text-align: left;
}
.leftImg{
    display: inline-block;
    width: 1.5rem;
    height:1.5rem;
    /* text-align: left; */
}
.leftImg>img{
    /* display: inline-block; */
    width:1.5rem;
    height: 1.5rem;
    position: relative;
    top: 0.2rem;
}
.leftText{
    display: inline-block;
    margin-left: .2rem;
}
.leftText>span{
    display: block;
}
.leftText_first{
    font-size: .6rem;
    color: rgb(206, 206, 207);
}
.leftText_seconed{
    font-size: .4rem;
    color: rgb(206, 206, 207);
}
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
/* 右侧 */
.rightbox{
    text-align: right;
}
.rightdiv{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;

}
.rightdiv>img{
    width: 1.5rem;
    height: 1.5rem;
}
.rightdiv:hover .verticalSilder{
    display: block ;
}
.verticalSilder{
    position: absolute;
    top: -4.0rem;
    right: -0.4rem;
    /* display: none; */
    width: 0.6rem;
    background-color: rgb(37, 37, 37);
}
</style>