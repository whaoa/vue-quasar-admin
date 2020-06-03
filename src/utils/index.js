import dayjs from 'dayjs'

import log from './util.log'

/**
 * @description 更新标题
 * @param {String} title 标题
 */
export function setTitle (title) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${title ? ` | ${title}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
export function openPage (url) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'qa-new-tab-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('qa-new-tab-link'))
}

export function dateFormat (date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

const utils = {
  setTitle,
  openPage,
  dateFormat,
  log,
}

export default utils
