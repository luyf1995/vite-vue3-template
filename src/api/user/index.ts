import { request } from '@/utils/request'
import { AxiosPromise } from 'axios'
import { LoginParams, LoginResult, UserInfo, UserDetail } from './types'

/**
 * 登录
 * @param {Object} data
 */
export const login = (data: LoginParams): AxiosPromise<LoginResult> => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 登出
 */
export const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}
/**
 * 获取用户信息
 */
export const getUserInfo = (): AxiosPromise<UserInfo> => {
  return request({
    url: '/system/user/info',
    method: 'get'
  })
}

/**
 * 通过id获取详情
 * @param {number} id
 */
export const getDetailById = (id: number): AxiosPromise<UserDetail> =>
  request({
    method: 'get',
    url: `/system/user/${id}`
  })
