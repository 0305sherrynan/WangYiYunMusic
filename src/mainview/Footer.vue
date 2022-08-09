<template>
  <div>
    <!-- <el-row>
        <el-col :span="2" class="middleControls">
            
            <img :src="this.lastSong" alt="">
            <img :src="this.playMiddle" alt="" @click="playmusic()"  v-if="!this.isplay">
            <img :src="this.stop" alt="" v-else>
            <img :src="this.nextSong" alt="">
        </el-col>
    </el-row> -->
    <audio :src="this.musicURL" class="musicAudio" controls autoplays muted></audio>
  </div> 
</template>

<script>
import playMiddle from '../assets/img/播放2.png'
import lastSong from '../assets/img/上一首.png'
import nextSong from '../assets/img/下一首.png'
import stop from '../assets/img/暂停.png'
export default {
    name:'Footer',
    data(){
        return{
            playMiddle,
            lastSong,
            nextSong,
            stop,
            isplay:false,
            //musicURL:this.$store.state.musicUrl
        }
    },
    methods:{
        // 控制暂停播放
        playMusic(){
             const audio = window.document.querySelector('.musicAudio')[0] //获取audio元素
             if(audio.paused==true){  //目前音频处于暂停状态，转为播放状态
                audio.play()
             }
             else audio.pause()
             this.isplay=!this.isplay
        }
    },
    computed:{
        musicURL(){
            return this.$store.state.musicUrl
        }
    },
    watch:{
         musicURL(){
              const audio =  window.document.querySelector('.musicAudio')[0] //获取audio元素
             audio.play()
        }
    }
}
</script>

<style scoped>
.middleControls>img{
    width: 1rem;
    height: 1rem;
}
</style>