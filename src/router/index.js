import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

import Layout from '../views/layout/Layout'

// 不用权限的公共页面 layout是一节路由，子路由根据左侧的标签进行变化
export const constantRouterMap = [

  {
    path: '/',
    component: _import('index/Index'),//整体架构
    // redirect: 'dashboard',
  },
  {
    path: '/create-project',
    component: Layout,
    // redirect: 'noredirect',
    meta: {
      title: '创建活动',
      icon: 'create-project'
    },
    children:[
       { path: 'index', component: _import('createProject/index'), name: 'create-project', meta: { title: '创建活动' }},
       { path: 'slyder', component: _import('components-demo/slyder/index'), name: 'slyder-demo', meta: { title: '大转盘' }},
       { path: 'envelope', component: _import('components-demo/envelope/index'), name: 'envelope-demo', meta: { title: '红包抽奖' }},
       { path: 'box', component: _import('components-demo/box'), name: 'box-demo', meta: { title: '开宝箱' }},
       { path: 'jigsaw', component: _import('components-demo/jigsaw'), name: 'jigsaw-demo', meta: { title: '欢乐拼图' }}
    ]
  },
  {
    path: '/management',
    component: Layout,
    redirect: '/management/index',
    // redirect: 'noredirect',
    meta: {
      title: '活动管理',
      icon: 'management'
    },
    children:[
       { path: 'index', component: _import('management/index'), name: 'management', meta: { title: '活动管理' }},
    ]
  },
  {
    path: '/client-verify',
    component: Layout,
    redirect: '/client-verify/index',
    // redirect: 'noredirect',
    meta: {
      title: '活动管理',
      icon: 'client-verify'
    },
    children:[
       { path: 'index', component: _import('clientVerify/index'), name: 'client-verify', meta: { title: '客户审核' }},
    ]
  },
  {
    path: '/project-verify',
    component: Layout,
    redirect: '/project-verify/index',
    // redirect: 'noredirect',
    meta: {
      title: '活动管理',
      icon: 'project-verify'
    },
    children:[
       { path: 'index', component: _import('projectVerify/index'), name: 'project-verify', meta: { title: '活动审核' }},
    ]
  }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
