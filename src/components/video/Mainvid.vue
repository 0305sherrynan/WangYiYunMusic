<template>
  <div class="box_header">
    <div class="header">
      <span v-for="(item,index) in choicelist" :key="index" class="tagText" @click="handleClick(index)"> {{item}}</span>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
    name:'Mainvid',
    data(){
        return{
            choicelist:['视频','MV'],
            choiceindex:['Video','SongList'],
        }
    },
    methods:{
      handleClick(index){
        this.$router.push({name:this.choiceindex[index]})
      }
    }

}
</script>

<style scoped>
.box_header{
    width: 100%;
    /* position: fixed; */
    /* 消除父子盒子塌陷问题 */
    overflow: hidden;
}
/* 最顶的固定header */
.header{
    width: 100%;
    height: 1.6rem;
    position: fixed;
    /* margin-bottom: 3rem; */
    background-color: rgb(43, 43, 43);
    /* 设置显示优先级 */
    z-index: 3;
}
  .tagText{
    font-size: .4rem;
    /* height: 100%; */
    line-height: 2rem;
    color: rgb(175, 175, 175);
  }
  .tagText:active{
    font-size: .6rem;
    color: rgb(208, 208, 208);
  }
  /* 配置上边界 */
 .view{
    margin-top: 3rem !important;
  }
</style>