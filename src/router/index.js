//  引入VueRouter
import VueRouter from 'vue-router' //引入路由
//具体路由引入
import LeftHome from '../mainview/LeftHome.vue'
import SongList from '../components/songlist/SongList.vue'
import SongDetail from '../components/songlistdetail/SongDetail.vue'
import Maindis from "../components/discovery/Maindis.vue"
import discovery from '../components/discovery/Discovery.vue'
import Mainvid from '../components/video/Mainvid.vue'
import Video from '../components/video/Video.vue'
import BroadCast from '../components/videoplay/BroadCast.vue'
const router=new VueRouter({
    routes:[
        {
            name:'LeftHome',
            path:'/',
            component:LeftHome,
            children:[
                {name:'SongDetail',path:'SongDetail',component:SongDetail},
                {name:'BroadCast',path:'BroadCast',component:BroadCast},
                {   name:'Maindis',
                    path:'Maindis',
                    component:Maindis,
                    children:[
                        {name:'Discovery',path:'Discovery',component:discovery},
                        {name:'SongList',path:'SongList',component:SongList},
                    ]
                },
                {
                    name:'Mainvid',
                    path:'Mainvid',
                    component:Mainvid,
                    children:[
                        {name:'Video',path:'Video',component:Video}
                    ]
                }
            ]
        }
    ]
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router //暴露