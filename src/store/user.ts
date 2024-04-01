import { defineStore } from 'pinia'
import { Session } from '@/utils/storage'
import { ADMIN_USER_ID } from '@/api/common'
import { LoginParams, UserInfo } from '@/api/user/types'
import { getUserInfo, login, logout } from '@/api/user'

interface IUserState {
  token: string
  userInfo: UserInfo | null
}

const userStore = defineStore('user', {
  state: (): IUserState => {
    return {
      token: Session.get('token'),
      userInfo: null
    }
  },
  actions: {
    /**
     * 设置Token
     * @param {string} token
     */
    setToken(token: string) {
      this.token = token
      Session.set('token', token)
    },
    /**
     * 获取用户信息
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        // getUserInfo()
        //   .then(({ data }) => {
        //     this.setUserInfo(data)
        //     resolve(data)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
        const data = {
          id: ADMIN_USER_ID,
          username: 'test',
          nickname: 'test',
          permission: []
        }
        this.setUserInfo(data)
        resolve(data)
      })
    },
    /**
     * 设置用户信息
     * @param {UserInfo} userInfo
     */
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
      Session.set('userInfo', userInfo)
    },
    /**
     * 登录
     * @param {LoginParams} loginForm
     */
    login(loginForm: LoginParams) {
      return new Promise((resolve, reject) => {
        // login(loginForm).then(({ data }) => {
        //   const token = data.token
        //   this.setToken(token)
        //   resolve(token)
        // })
        const token = 'test'
        this.setToken(token)
        resolve(token)
      })
    },
    /**
     * 登出
     */
    logout() {
      return new Promise((resolve, reject) => {
        // logout()
        //   .then(() => {
        //     this.removeToken()
        //     this.removeUserInfo()
        //     resolve(null)
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
        this.removeToken()
        this.removeUserInfo()
        resolve(null)
      })
    },
    /**
     * 前端登出
     * @param {Boolean} needClear 是否需要清空sessionStorage中的信息
     */
    logoutByFrontEnd(needClear = true) {
      if (needClear) {
        this.removeToken()
        this.removeUserInfo()
      }
    },
    /**
     * 移除Token
     * @return {Promise}
     */
    removeToken() {
      this.setToken('')
      Session.remove('token')
    },
    /**
     * 移除用户信息
     * @return {Promise}
     */
    removeUserInfo() {
      this.setUserInfo(null)
    }
  }
})

export default userStore
