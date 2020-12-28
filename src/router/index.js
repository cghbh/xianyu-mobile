import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'

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
    component: () => import(/* webpackChunkName: "group-index" */ '../views/Index.vue'),
    name: 'Index',
    meta: { requiresAuth: false, keepAlive: true },
    children: [
      {
        path: 'dynamic',
        name: 'Dynamic',
        component: () => import(/* webpackChunkName: "group-index" */ '../views/Dynamic.vue'),
        meta: { requiresAuth: false, keepAlive: true }
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "group-index-other" */ '../views/Mine.vue'),
        meta: { requiresAuth: false, keepAlive: false }
      },
      {
        path: '/mymessage',
        component: () => import(/* webpackChunkName: "group-index-other" */ '../views/MyMessage.vue'),
        name: 'MyMessage',
        meta: { requiresAuth: true, keepAlive: false }
      },
      {
        path: '',
        component: () => import(/* webpackChunkName: "group-index-other" */ '../views/Discover.vue'),
        name: 'Discover',
        meta: { requiresAuth: false, keepAlive: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "group-user" */'../views/Login.vue'),
    name: 'Login',
    meta: { requiresAuth: false }
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue'),
    name: 'Search',
    meta: { requiresAuth: false, keepAlive: true }
  },
  {
    path: '/mycollection',
    component: () => import('../views/MyCollection.vue'),
    name: 'MyCollection',
    meta: { requiresAuth: true, keepAlive: true }
  },
  {
    path: '/fellowing',
    component: () => import('../views/Fellowing.vue'),
    name: 'Fellowing',
    meta: { requiresAuth: true, keepAlive: true }
  },
  {
    path: '/knowledge-competition',
    component: () => import('../views/KnowledgeCompetition.vue'),
    name: 'KnowledgeCompetition',
    meta: { requiresAuth: true }
  },
  {
    path: '/modify-information',
    component: () => import('../views/ModifyInformation.vue'),
    name: 'ModifyInformation',
    meta: { requiresAuth: true }
  },
  {
    path: '/my-publish',
    component: () => import('../views/MyPublish.vue'),
    name: 'MyPublish',
    meta: { requiresAuth: true }
  },
  {
    path: '/myfans',
    component: () => import('../views/MyFans.vue'),
    name: 'MyFans',
    meta: { requiresAuth: true, keepAlive: true }
  },
  {
    path: '/article-detail/:artId',
    component: () => import('../views/ArticleDetail.vue'),
    name: 'ArticleDetail',
    meta: { requiresAuth: false }
  },
  {
    path: '/article-list',
    component: () => import('../views/ArticleList.vue'),
    name: 'ArticleList',
    meta: { requiresAuth: false, keepAlive: true }
  },
  {
    path: '/ancient-poetry/:poemId',
    component: () => import('../views/AncientPoetry.vue'),
    name: 'AncientPoetry',
    meta: { requiresAuth: false, keepAlive: false }
  },
  {
    path: '/ancient-poetrylist',
    component: () => import('../views/AncientPoetryList.vue'),
    name: 'AncientPoetryList',
    meta: { requiresAuth: false, keepAlive: true }
  },
  {
    path: '/dynamic-publish',
    component: () => import('../views/DynamicPublish.vue'),
    name: 'DynamicPublish',
    meta: { requiresAuth: true }
  },
  {
    path: '/dynamic-detail/:id',
    component: () => import('../views/DynamicDetail.vue'),
    name: 'DynamicDetail',
    meta: { requiresAuth: false }
  },
  {
    path: '/dictionary-list',
    component: () => import('../views/DictionaryList.vue'),
    name: 'DictionaryList',
    meta: { requiresAuth: false, keepAlive: true }
  },
  {
    path: '/dictionary-detail/:dicId',
    component: () => import('../views/DictionaryDetail.vue'),
    name: 'DictionaryDetail',
    meta: { requiresAuth: false }
  },
  {
    path: '/joke',
    component: () => import('../views/MomentJoke.vue'),
    name: 'joke',
    meta: { requiresAuth: false }
  },
  {
    path: '/forget-password',
    component: () => import('../views/ForgetPassword.vue'),
    name: 'ForgetPassword',
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "group-user" */ '../views/Register.vue'),
    name: 'Register',
    meta: { requiresAuth: false }
  },
  {
    path: '/my-detail',
    component: () => import('../views/MyDetail.vue'),
    name: 'MyDetail',
    meta: { requiresAuth: true }
  },
  {
    path: '/feedback',
    component: () => import(/* webpackChunkName: "group-user" */ '../views/Feedback.vue'),
    name: 'Feedback',
    meta: { requiresAuth: false }
  },
  {
    path: '/userinfo-edit',
    component: () => import('../views/UserInfoEdit.vue'),
    name: 'UserInfoEdit',
    meta: { requiresAuth: false }
  },
  {
    path: '/bind-telephone',
    component: () => import('../views/BindTelephone.vue'),
    name: 'BindTelephone',
    meta: { requiresAuth: true }
  },
  {
    path: '/setting',
    component: () => import('../views/Setting.vue'),
    name: 'Setting',
    meta: { requiresAuth: true }
  },
  {
    path: '/replace-telephone',
    component: () => import('../views/ReplaceTelephone.vue'),
    name: 'ReplaceTelephone',
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 已登录的情况下非login页面直接放行
    if (store.state.token.token) {
      next()
    } else {
      Dialog.confirm({
        message: '<p style="font-size: 16px;line-height: 25px">此操作需要登录，\n是否跳转到登录页面？</p>',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        confirmButtonColor: '#409fea',
        cancelButtonText: '取消',
        cancelButtonColor: '#666'
      }).then(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: to.path
          }
        })
      })
        .catch(() => {
          next(false)
        })
    }
  } else {
    if (store.state.token.token && to.path === '/login') {
      next('/mine')
    } else {
      next()
    }
  }
})

export default router
