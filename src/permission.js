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
let flag = true
const whiteList = ['/login']// no redirect whitelist
router.beforeEach((to, from, next) => {

  NProgress.start() // start progress bar
  next()
  NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it

  if (getToken()) {
    // has token 如果已经登录,去login页面，即是本项目的首页，导向创建活动页面
    if (to.path === '/login') {
        next({ path: '/create-project' });
    }
    else {
        if(flag) {
          flag = false
          let roles = ['admin']
          // let roles = store.getters.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            console.log('rute', store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          })
        }
          if(to.name === 'template'){
            // 判断是否具有资格创建活动
            if(store.getters.code ==='1'){
              next()
            }else{
              next({ path: '/create-project' });
            }
          }
          // 活动审核和客户审核 权限
          if (hasPermission(store.getters.roles, to.meta.roles)) {
            next()//
          } else {
             next({ path: '/create-project' });
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
