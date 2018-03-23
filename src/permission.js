import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from 'utils/auth' // getToken from cookie
import axios from 'axios'


NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
  NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  console.log('get',getToken() )
  //
  if (getToken()) { // determine if there has token
    // has token 如果已经登录,去login页面，即是本项目的首页，导向创建活动页面
    if (to.path === '/login') {
        next({ path: '/create-project' });
        // NProgress.done()
    } else {
      if (store.getters.flag) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('setFlag', false)
          let roles = ['admin']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表

            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next()
            // NProgress.done()
          })
        // store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        //   // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
        //   // const roles = ['admin']
        //   store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表

        //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //     // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //     next()
        //   })
        // }).catch(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error('Verification failed, please login again')
        //     next({ path: '/login' })
        //   })
        // })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()//
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
