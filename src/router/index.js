import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import HomePage from '../views/HomePage.vue'
import Mine from '../views/Mine.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Dynamic from '../views/Dynamic.vue'
import Discover from '../views/Discover.vue'
import MyCollection from '../views/MyCollection.vue'
import Fellowing from '../views/Fellowing.vue'
import AddChannel from '../views/AddChannel.vue'
import KnowledgeCompetition from '../views/KnowledgeCompetition.vue'
import Setting from '../views/Setting.vue'
import ModifyInformation from '../views/ModifyInformation.vue'
import MyPublish from '../views/MyPublish.vue'
import MyLike from '../views/MyLike.vue'
import MyBrowsingHistory from '../views/MyBrowsingHistory.vue'
import MyFans from '../views/MyFans.vue'
import MyMessage from '../views/MyMessage.vue'
import GoldSentence from '../views/GoldSentence.vue'
import GoodArticle from '../views/GoodArticle.vue'
import AncientPoetry from '../views/AncientPoetry.vue'
import DynamicPublish from '../views/DynamicPublish.vue'
import DynamicDetail from '../views/DynamicDetail.vue'
import Dictionary from '../views/Dictionary.vue'
import MomentJoke from '../views/MomentJoke.vue'
// 解决路由重复的问题
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/homepage',
    component: Index,
    name: 'Index',
    children: [
      {
        path: '',
        name: 'homepage',
        component: HomePage
      },
      {
        path: 'mine',
        name: 'Mine',
        component: Mine
      },
      {
        path: 'dynamic',
        name: 'Dynamic',
        component: Dynamic
      },
      {
        path: '/discover',
        component: Discover,
        name: 'Discover'
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/search',
    component: Search,
    name: 'Search'
  },
  {
    path: '/mycollection',
    component: MyCollection,
    name: 'MyCollection'
  },
  {
    path: '/fellowing',
    component: Fellowing,
    name: 'Fellowing'
  },
  {
    path: '/addchannel',
    component: AddChannel,
    name: 'AddChannel'
  },
  {
    path: '/knowledge-competition',
    component: KnowledgeCompetition,
    name: 'KnowledgeCompetition'
  },
  {
    path: '/setting',
    component: Setting,
    name: 'Setting'
  },
  {
    path: '/modify-information',
    component: ModifyInformation,
    name: 'ModifyInformation'
  },
  {
    path: '/my-publish',
    component: MyPublish,
    name: 'MyPublish'
  },
  {
    path: '/mylike',
    component: MyLike,
    name: 'MyLike'
  },
  {
    path: '/browser-history',
    component: MyBrowsingHistory,
    name: 'MyBrowsingHistory'
  },
  {
    path: '/myfans',
    component: MyFans,
    name: 'MyFans'
  },
  {
    path: '/mymessage',
    component: MyMessage,
    name: 'MyMessage'
  },
  {
    path: '/gold-sentence',
    component: GoldSentence,
    name: 'GoldSentence'
  },
  {
    path: '/good-article',
    component: GoodArticle,
    name: 'GoodArticle'
  },
  {
    path: '/ancient-poetry',
    component: AncientPoetry,
    name: 'AncientPoetry'
  },
  {
    path: '/dynamic-publish',
    component: DynamicPublish,
    name: 'DynamicPublish'
  },
  {
    path: '/dynamic-detail/:id',
    component: DynamicDetail,
    name: 'DynamicDetail'
  },
  {
    path: '/dictionary',
    component: Dictionary,
    name: 'Dictionary'
  },
  {
    path: '/joke',
    component: MomentJoke,
    name: 'joke'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
