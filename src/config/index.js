export default {
  appName: process.env.VUE_APP_NAME || 'QAdmin',
  // token 过期时间, 单位 ms
  tokenExpires: 1000 * 60 * 60 * 3,
  // 运行环境是否为开发环境
  envIsDev: process.env.NODE_ENV === 'development',
  // 默认首页
  homePageName: 'home',
  // 默认登录页
  loginPageName: 'login',
}
