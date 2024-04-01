import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题、
    icon?: string // 阿里云图标
    permissions?: Array<string> // 菜单对应的权限
    hidden?: boolean // 是否需要隐藏
    noTagRecord?: boolean // 是否不需要记录页签
    alwaysShow?: boolean // 当只有一个子节点时，是否仍需要展示父节点
    noShowingChildren?: boolean // 不展示子节点
  }
}
