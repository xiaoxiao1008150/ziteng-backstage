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
    path: '/login',
    // redirect: '/login',
    component: _import('index/Index'),//整体架构
    // redirect: 'dashboard',
  },
  {
    path: '/create-project',
    component: Layout,
    redirect: '/create-project/index',
    meta: {
      title: '创建活动',
      icon: 'order-add'
    },
    children:[
       { path: 'index', component: _import('createProject/index'),  meta: { type: '创建活动'}},
       { path: 'slyder', component: _import('components-demo/slyder/index'),  meta: { type: 'slyder',title:'超级大转盘' }},
       { path: 'envelope', component: _import('components-demo/envelope/index'),  meta: { type: 'envelope' ,title:'抽红包'}},
       { path: 'box', component: _import('components-demo/box/index'), name: 'box-demo', meta: { type: 'box',title:'开宝箱' }},
       { path: 'jigsaw', component: _import('components-demo/jigsaw/index'), meta: { type: 'jigsaw',title:'欢乐拼图' }}
    ]
  },
  {
    path: '/management',
    component: Layout,
    redirect: '/management/index',
    // redirect: 'noredirect',
    meta: {
      title: '活动管理',
      icon: 'huodongguanli'
    },
    children:[
       { path: 'index', component: _import('management/index'), name: 'management', meta: { title: '活动管理' }},
       { path: 'info/:id', component: _import('management/Info'), name: 'management', meta: { title: '用户参与详情' }},
    ]
  },
  {
    path: '/center',
    component: Layout,
    redirect: '/center/index',
    // redirect: 'noredirect',
    meta: {
      title: '个人中心',
      icon: 'user'
    },
    children:[
       { path: 'index', component: _import('center/index'),meta: { title: '个人中心' }}
    ]
  },
  {
    path: '/client-verify',
    component: Layout,
    redirect: '/client-verify/index',
    // redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: '客户审核',
      icon: 'kehu'
    },
    children:[
       { path: 'index', component: _import('clientVerify/index'),
         name: 'client-verify',
         meta: {
          title: '客户审核',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/project-verify',
    component: Layout,
    redirect: '/project-verify/index',
    // redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: '活动审核',
      icon: 'plus-activity'
    },
    children:[
       {  path: 'index', component: _import('projectVerify/index'),
          name: 'project-verify',
          meta: { 
            title: '活动审核',
            roles: ['admin']
          }
      }
    ]
  }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
    {
    path: '/client-verify',
    component: Layout,
    redirect: '/client-verify/index',
    // redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: '客户审核',
      icon: 'kehu'
    },
    children:[
       { path: 'index', component: _import('clientVerify/index'),
         name: 'client-verify',
         meta: {
          title: '客户审核',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/project-verify',
    component: Layout,
    redirect: '/project-verify/index',
    // redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: '活动审核',
      icon: 'plus-activity'
    },
    children:[
       {  path: 'index', component: _import('projectVerify/index'),
          name: 'project-verify',
          meta: { 
            title: '活动审核',
            roles: ['admin']
          }
      }
    ]
  }
]
