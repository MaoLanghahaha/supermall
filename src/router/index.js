import Vue from "vue";
import VueRouter from "vue-router";

// 1、安装插件
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const TabBarIndex = () => import('@/views/TabBarIndex');

// 2、创建路由对象
const routes = [
  {
    path: '',
    component: TabBarIndex,
    redirect: '/home'
  },
  {
    path: '/home',
    component: TabBarIndex,
    children: [{
      path: '',
      component: () => import('views/home/Home')
    }]
  },
  {
    path: '/category',
    component: TabBarIndex,
    children: [{
      path: '',
      component: () => import('views/category/Category')
    }]
  },
  {
    path: '/shopcart',
    component: TabBarIndex,
    children: [{
      path: '',
      component: () => import('views/shopcart/Shopcart')
    }]
  },
  {
    path: '/profile',
    component: TabBarIndex,
    children: [{
      path: '',
      component: () => import('views/profile/Profile')
    }]
  },
  {
    path: '/detail/:id',
    component: () => import('views/detail/Detail')
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3、导出router
export default router
