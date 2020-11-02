import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决路由重复的问题,获取原型对象上的push函数
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
    component: () => import('../views/Index.vue'),
    name: 'Index',
    children: [
      {
        path: '',
        name: 'homepage',
        component: () => import('../views/HomePage.vue')
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue')
      },
      {
        path: 'dynamic',
        name: 'Dynamic',
        component: () => import('../views/Dynamic.vue')
      },
      {
        path: '/discover',
        component: () => import('../views/Discover.vue'),
        name: 'Discover'
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    name: 'Login'
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue'),
    name: 'Search'
  },
  {
    path: '/mycollection',
    component: () => import('../views/MyCollection.vue'),
    name: 'MyCollection'
  },
  {
    path: '/fellowing',
    component: () => import('../views/Fellowing.vue'),
    name: 'Fellowing'
  },
  {
    path: '/addchannel',
    component: () => import('../views/AddChannel.vue'),
    name: 'AddChannel'
  },
  {
    path: '/knowledge-competition',
    component: () => import('../views/KnowledgeCompetition.vue'),
    name: 'KnowledgeCompetition'
  },
  {
    path: '/setting',
    component: () => import('../views/Setting.vue'),
    name: 'Setting'
  },
  {
    path: '/modify-information',
    component: () => import('../views/ModifyInformation.vue'),
    name: 'ModifyInformation'
  },
  {
    path: '/my-publish',
    component: () => import('../views/MyPublish.vue'),
    name: 'MyPublish'
  },
  {
    path: '/mylike',
    component: () => import('../views/MyLike.vue'),
    name: 'MyLike'
  },
  {
    path: '/browser-history',
    component: () => import('../views/MyBrowsingHistory.vue'),
    name: 'MyBrowsingHistory'
  },
  {
    path: '/myfans',
    component: () => import('../views/MyFans.vue'),
    name: 'MyFans'
  },
  {
    path: '/mymessage',
    component: () => import('../views/MyMessage.vue'),
    name: 'MyMessage'
  },
  {
    path: '/gold-sentence',
    component: () => import('../views/GoldSentence.vue'),
    name: 'GoldSentence'
  },
  {
    path: '/good-article',
    component: () => import('../views/GoodArticle.vue'),
    name: 'GoodArticle'
  },
  {
    path: '/ancient-poetry',
    component: () => import('../views/AncientPoetry.vue'),
    name: 'AncientPoetry'
  },
  {
    path: '/dynamic-publish',
    component: () => import('../views/DynamicPublish.vue'),
    name: 'DynamicPublish'
  },
  {
    path: '/dynamic-detail/:id',
    component: () => import('../views/DynamicDetail.vue'),
    name: 'DynamicDetail'
  },
  {
    path: '/dictionary',
    component: () => import('../views/Dictionary.vue'),
    name: 'Dictionary'
  },
  {
    path: '/joke',
    component: () => import('../views/MomentJoke.vue'),
    name: 'joke'
  },
  {
    path: '/forget-password',
    component: () => import('../views/ForgetPassword.vue'),
    name: 'ForgetPassword'
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue'),
    name: 'Register'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
