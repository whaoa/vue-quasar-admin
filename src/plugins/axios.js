import axios from 'axios'
// import store from '@/store'
import { ls, error } from '@/utils'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = ls.get('token')
    // 让每个请求携带token-- ['authorization']为 JWT 默认验证位置 请根据实际情况自行修改
    config.headers.authorization = `Bearer ${token}`
    return config
  },
  e => {
    // 发送失败
    console.log(e)
    return Promise.reject(e)
  },
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // code表示请求状态(后端定义，非 HTTP Code)，message为描述信息, data为响应数据
    const { code, message, data } = response.data
    // 判断 接口返回状态
    // 如果没有 code 可能不是项目后端开发的接口，直接返回
    if (code === undefined) return response.data
    // 如果 code 为 0 或 200 (后端定义，非 HTTP Code) 表示请求
    // 直接返回数据 (data 为接口响应数据字段，请根据实际情况自行修改)
    // 否则 处理错误信息
    if (code !== 0 && code !== 200) {
      error.create(`[ code: ${code} ] ${response.config.url}: ${message}`)
    }
    return data
  },
  e => {
    // HTTP 错误处理
    if (e && e.response) {
      switch (e.response.status) {
        case 400:
          e.message = '请求错误'
          break
        case 401:
          e.message = '未授权，请登录后重试'
          break
        case 403:
          e.message = '服务器拒绝访问'
          break
        case 404:
          e.message = '请求地址不存在'
          break
        case 408:
          e.message = '数据请求超时'
          break
        case 500:
          e.message = '服务器内部错误'
          break
        case 501:
          e.message = '服务未实现'
          break
        case 502:
          e.message = '网关错误'
          break
        case 503:
          e.message = '服务不可用'
          break
        case 504:
          e.message = '网关超时'
          break
        case 505:
          e.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    e.message = `[错误码: ${e.response.status}] ${e.response.config.url}: ${e.message}`
    error.create((e.response && e.response.data && e.response.data.message) || e.message)
    return Promise.reject((e.response && e.response.data) || e)
  },
)

export default service
