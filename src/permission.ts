import { RouteRecordRaw } from 'vue-router'
import router from './router/index'
import NProgress from 'nprogress' // 进度跳
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import pinia, { useUserStore, usePermissionStore } from './store'
import { awaitTo } from './utils/utils'
import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

// 不需要登录就可以访问的白名单页面
const whiteList: string[] = ['/login']

const userStore = useUserStore(pinia)
const permissionStore = usePermissionStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {
  // debugger
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 用户token
  if (userStore.token) {
    if (to.path === '/login') {
      userStore.logoutByFrontEnd()
      next()
      NProgress.done()
    } else {
      if (userStore.userInfo) {
        next()
      } else {
        const [error, userInfo] = await awaitTo(userStore.getUserInfo())
        if (error) {
          ElMessage.error(error)
        } else {
          permissionStore.setPermissions(userInfo.permissions || {})
          const accessRoutes = permissionStore.generateRoutes()
          accessRoutes.forEach(item => {
            router.addRoute(item)
          })
          if (to.path === '/') {
            next(redirectToFirstRoute(accessRoutes))
          } else {
            next({ ...to, replace: true })
          }
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 白名单
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * 重定向到可访问的第一个路由
 * @return {*}
 */
const redirectToFirstRoute = (accessRoutes: RouteRecordRaw[]) => {
  let redirectTo: RouteRecordRaw | string = '/'
  for (let item of accessRoutes) {
    if (!item.meta?.hidden) {
      // 暂时最多只考虑二层级的路由
      if (item.children && item.children.length > 0) {
        redirectTo = item.path + '/' + item.children[0].path
      } else {
        redirectTo = item.path
      }
      break
    }
  }

  return redirectTo
}
