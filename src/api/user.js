import request from '@/plugins/axios'

/**
 * 用户登录
 * @param data {Object} - 参数对象
 * @param data.username {String} - 用户名
 * @param data.password {String} - 密码
 * @returns {Promise<Object>}
 */
export const Login = data => request({
  url: '/login',
  method: 'post',
  data,
})
