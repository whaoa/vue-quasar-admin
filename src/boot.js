import { ls } from '@/utils'

export default function created () {
  const userInfo = ls.get('user_info')
  const { token, timeStamp, expires } = ls.get('token') || {}
  // 如果本地缓存 token 无效
  if (!token || timeStamp + expires < Date.now()) {
    this.$store.dispatch('QA/user/clearLoginStatus')
  } else {
    this.$store.dispatch('QA/user/initLoginStatus', {
      userInfo,
      token: { token, timeStamp, expires },
    })
  }
}
