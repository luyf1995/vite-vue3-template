/**
 * 校验是否是外部链接
 * @param {string} path
 * @return {boolean}
 */
export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// mac地址校验正则
const MAC_ADDRESS_REG = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
/**
 * 校验Mac
 * @param {string} mac
 * @return {boolean}
 */
export const validateMacAddress = (mac: string) => {
  return MAC_ADDRESS_REG.test(mac)
}
