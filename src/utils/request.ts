import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { API_BASE } from '@/api/common/index'
import { downloadFile } from './utils'
import { useUserStore } from '@/store'
import router from '@/router'

// 业务状态码
export enum Code {
  SUCCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401 // token 失效
}

export interface IResponse<T = any> {
  code: number
  message: string
  data: T
}

let userStore: any
let loadingInstance: any
// 请求队列
let queue = new Map()

/**
 * 移除队列中的url并且关闭loading
 * @param {string} url
 */
const removeQueueAndCancelLoading = (url?: string) => {
  if (!url) return
  queue.delete(url)
  if (queue.size === 0) {
    loadingInstance && loadingInstance.close()
  }
}

export const request = axios.create({
  baseURL: API_BASE + '/api',
  // withCredentials: true,
  timeout: 50000
})

/**
 * 显示el-message
 * @param {string} message
 * @param {string} type
 */
const showElMessage = (message = '网络连接失败，请联系管理员', type = 'error') => {
  let option: any = {
    message: message,
    type,
    grouping: true,
    showClose: true
  }
  ElMessage(option)
}

// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    !userStore && (userStore = useUserStore())

    // 请求头携带token
    config!.headers!.Authorization = 'Bearer ' + userStore.token

    const url = config.url
    if (queue.size === 0) {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    queue.set(url, true)

    return config
  },
  error => {
    removeQueueAndCancelLoading(error.config.url)
    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    removeQueueAndCancelLoading(response.config.url)

    const { code, message }: IResponse = response.data
    // 文件流
    if (response.data instanceof Blob) {
      if (response.data.type === 'application/json') {
        // 处理失败的情况
        const reader = new FileReader()
        reader.readAsText(response.data)
        reader.onload = event => {
          const str = event.target!.result as string
          const json = JSON.parse(str)
          showElMessage(json.message)
          return Promise.reject(response.data)
        }
      } else {
        return downloadFile(response)
      }
    } else {
      if (code === Code.SUCCCESS) {
        return response.data
      } else if (code === Code.UNAUTHORIZED) {
        ElMessage({
          message: '用户登录失效，请重新登录！',
          type: 'error',
          duration: 5 * 1000
        })
        userStore.logoutByFrontEnd()
        router.push('/login')
      } else {
        showElMessage(message)
        return Promise.reject(response.data)
      }
    }
  },
  error => {
    !userStore && (userStore = useUserStore())

    const { status, data } = error.response || {}
    removeQueueAndCancelLoading(error.config.url)

    if (!status) {
      showElMessage()
    } else {
      // 非取消请求的报错需要弹框展示
      if (!(error instanceof axios.Cancel)) {
        showElMessage(data.message)
      }
    }
    return Promise.reject(error)
  }
)

export default request
