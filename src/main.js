import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' //引入路由(插件)
import router from './router' //路由文件引入
import element from './plugins/elementUI' //引入部分UI
import axios from 'axios'
import '../src/assets/css/global.css' //引入全局样式
import  './global.js'
import store from './store/index.js'
const dayjs = require('dayjs')
Vue.use(element) //使用UI插件
Vue.use(VueRouter) //插件使用
//设置默认根目录
axios.defaults.baseURL='https://netease-cloud-music-api-five-delta-84.vercel.app/'
Vue.prototype.$http=axios //根据原型配置全局的axios
// 使用rem布局，设置好html尺寸
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
      htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
      htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 15}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();

Vue.config.productionTip = false
Vue.filter('dataFormat',function(time){
    return dayjs(time).format('YYYY-MM-DD')
})
Vue.filter('dataFormat1',function(time){
  // console.log(time)
  // console.log(dayjs(time).format('mm:ss'))
    return  dayjs(time).format('mm:ss')
})
const vm = new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
// console.log(vm)
