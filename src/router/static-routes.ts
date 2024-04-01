import { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/home',
    component: () => import('@/layout/index.vue'),
    name: 'home',
    meta: {
      title: '首页',
      icon: 'icon-menu-shouye'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        name: 'homeIndex',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  }
]
export const noFoundRoute = {
  path: '/:catchAll(.*)',
  name: '404',
  component: () => import('@/views/404.vue'),
  meta: {
    hidden: true
  }
}
