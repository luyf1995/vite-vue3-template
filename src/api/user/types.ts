// 登录
export interface LoginParams {
  username: string
  password: string
}
// 登录响应参数
export interface LoginResult {
  token: string
}

export interface UserInfo {
  id: number
  username: string // 用户名
  nickname: string // 姓名
  permission: string[] // 权限
}
// 详情
export type UserDetail = UserInfo
