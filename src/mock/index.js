import MockAdapter from 'axios-mock-adapter'
import faker from 'faker/locale/zh_CN'
import axios from '@/plugins/axios'
import { error, isDev } from '@/utils'

// 创建 Mock 实例，参数为 Axios 实例，Mock 配置对象
// delayResponse 单位为 ms
const mock = new MockAdapter(axios, { delayResponse: 500 })

// 导入配置文件中的数据
const files = require.context('./modules', false, /\.js$/)
const modules = []

files.keys().forEach(key => {
  const configArray = files(key).default
  // 判断数据类型是否为数组
  const configType = Object.prototype.toString.call(configArray).slice(8, -1)
  if (configType !== 'Array') {
    error.create(`Axios Mock 配置文件数据类型错误: [${key}] 期望导入一个Array, 但是得到了一个 ${configType}`)
    return
  }
  modules.push(...configArray)
})

// 循环处理 Mock 配置对象
modules.forEach(item => {
  // 如果缺少参数
  if (!item.method || !item.url || !item.response) {
    error.create(`Axios Mock 配置文件参数错误: ${Object.keys(item).join()}`)
    return
  }
  const { url, response } = item
  // 首字母转大写
  const method = item.method
    .toLowerCase()
    .replace(/^([a-z])([a-z]+)/g, (str, p1, p2) => `${p1.toUpperCase()}${p2}`)
  // 注册 Mock 配置
  mock[`on${method}`](url).reply(config => {
    // 解析 request 中的 body 参数
    if (config.data) config.data = JSON.parse(config.data)
    // 设置默认响应数据结构
    const responseHeader = {}
    const responseData = { code: 200, message: '', timeStamp: null, data: null }
    // 执行响应方法
    try {
      response(config, responseHeader, responseData, faker)
    } catch (e) {
      responseData.code = 500
      responseData.message = `服务端错误: ${e.toString()}`
    }
    // 设置响应时间
    responseData.timeStamp = Date.now()
    if (isDev) console.log('[Axios Mock] :', config, responseData)
    // 返回数组的格式 [status, data, headers]
    return [responseData.code, responseData]
  })
})

export default mock
