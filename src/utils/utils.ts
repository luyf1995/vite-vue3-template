import { AxiosResponse } from 'axios'

/**
 * 是否是空值
 * @param {any} value
 * @return {Boolean}
 */
export const isInvalidValue = (value: any) => {
  return value === '' || value === null || value === undefined
}

/**
 * 通过value获取list中的项
 * @param {string} value 值
 * @param {any[]} list 数据list
 */
export const getItemByValue = (value: string | number, list: any[]) => {
  return list.find(item => item.value === value) || {}
}
/**
 * 简易版本的深拷贝
 * @param {Object} source
 * @return {Object}
 */
export const deepClone = (source: any) => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 获取url上的参数
 * @param {string} url
 * @returns {Object}
 */
export const param2Obj = (url: string) => {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj: Record<string | number, any> = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
/**
 * 时间格式化
 * @param {Date} date
 * @param {string} format
 * @param {boolean} immediate
 * @return {string}
 */
export const formatDate = (date: Date | string, format: string) => {
  if (!date) return
  if (!format) format = 'yyyy-MM-dd'
  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/, '/'))
      break
    case 'number':
      date = new Date(date)
      break
  }
  if (!(date instanceof Date)) return
  let dict = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: ('' + (date.getMonth() + 101)).substr(1),
    dd: ('' + (date.getDate() + 100)).substr(1),
    HH: ('' + (date.getHours() + 100)).substr(1),
    mm: ('' + (date.getMinutes() + 100)).substr(1),
    ss: ('' + (date.getSeconds() + 100)).substr(1)
  }
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]]
  })
}

/**
 * 将分钟格式转化为小时
 * @param {number} minutes
 * @return {string}
 */
export const formatMinutesToHours = (minutes: number) => {
  if (minutes < 60) {
    return minutes + '分钟'
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}小时${remainingMinutes}分钟`
  }
}

/**
 * await 包装函数
 * @param promise {Promise} promise对象
 * */
export const awaitTo = (promise: any) => {
  return promise.then((result: any) => [null, result]).catch((error: any) => [error, null])
}

/**
 * 下载文件
 * @param {AxiosResponse} response
 * @returns
 */
export const downloadFile = (response: AxiosResponse) => {
  return new Promise<void>(resolve => {
    let url = window.URL.createObjectURL(new Blob([response.data]))
    const disposition = response.headers['content-disposition']

    // 尝试解析 RFC 5987 编码形式的文件名
    const matches = disposition.match(/filename\*=UTF-8''(.+)/)
    let filename
    if (matches && matches.length > 1) {
      // RFC 5987 编码形式的文件名
      filename = decodeURIComponent(matches[1])
    } else {
      // 尝试解析 ASCII 编码形式的文件名
      const [, asciiFilename] = disposition.match(/filename="(.+)"/) || []
      filename = asciiFilename
    }
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
    // resolve(response.data)
  })
}

/**
 * 复制文本至剪切板
 * @param {string} text
 */
export const copyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

/**
 * 将一维数组转化成树状解构
 * @param {any[]} data list数据
 * @param {string} id 主键ID
 * @param {string} parentId 上级ID
 * @param {string} childrenKey 子list数据的key
 */

export const arrayToTree = (data: any[], id = 'id', parentId = 'parentId', childrenKey = 'children') => {
  let res: any[] = []
  let temp: any = {}
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][parentId]] && data[k][id] !== data[k][parentId]) {
      if (!temp[data[k][parentId]][childrenKey]) {
        temp[data[k][parentId]][childrenKey] = []
      }
      if (!temp[data[k][parentId]]['_level']) {
        temp[data[k][parentId]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][parentId]]._level + 1
      temp[data[k][parentId]][childrenKey].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}
