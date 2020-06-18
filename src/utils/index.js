import dayjs from 'dayjs'
import { LocalStorage, Notify } from 'quasar'
import log from './log'

// 项目名称
const APP_NAME = process.env.VUE_APP_NAME || 'QAdmin'

// 运行环境是否为生产环境
export const isDev = process.env.NODE_ENV === 'development'

// 日志打印
export { default as log } from './log'

/**
 * 错误统一处理
 * @type {{log: error.log, create: error.create}}
 */
export const error = {
  // 错误提示
  log: e => {
    // 打印到控制台
    if (isDev) {
      log.danger('>>>>>> Error >>>>>>')
      console.log(e)
    }
    // 显示提示
    Notify.create({
      message: e.message,
      icon: 'error',
      color: 'red-5',
    })
  },
  // 创建一个错误
  create: msg => {
    const e = new Error(msg)
    error.log(e)
    throw e
  },
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
export const setTitle = (title = '') => {
  const processTitle = process.env.VUE_APP_TITLE || APP_NAME
  window.document.title = `${processTitle}${title ? ` | ${title}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
export const openPage = url => {
  if (!url) {
    error.create('打开新标签页时URL为空')
    return
  }
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', `${APP_NAME}-new-tab-link`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById(`${APP_NAME}-new-tab-link`))
}

/**
 * 日期格式化
 * @param date {String | Date | Number} Date 构造器的合法参数
 * @returns {string}
 */
export function dateFormat (date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * LocalStorage 数据操纵封装
 * @type {{set: Function, getAll: Function, get: Function, clear: Function, remove: Function}}
 */
export const ls = {
  LS: LocalStorage,
  get: (key = '') => LocalStorage.getItem(`${APP_NAME}__${key.toUpperCase()}`),
  set: (key = '', value) => LocalStorage.set(`${APP_NAME}__${key.toUpperCase()}`, value),
  remove: (key = '') => LocalStorage.remove(`${APP_NAME}__${key.toUpperCase()}`),
  getAll: () => LocalStorage.getAll(),
  clear: () => LocalStorage.clear(),
}
