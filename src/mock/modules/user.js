const users = [
  { uid: 1, username: 'admin', password: 'admin', role: 'admin' },
  { uid: 2, username: 'quasar', password: 'quasar', role: 'user' },
]

export default [
  {
    method: 'post',
    url: '/login',
    response: (request, header, result, faker) => {
      const { username, password } = request.data
      // 查询用户数据
      const user = users.find(u => u.username === username)
      // 账号不存在
      if (!user) {
        result.code = 401
        result.message = '登录账号不存在'
        return result
      }
      // 账号或密码错误
      if (user.password !== password) {
        result.code = 401
        result.message = '账号或密码错误'
        return result
      }
      // 验证通过
      result.data = {
        username,
        uid: user.uid,
        role: user.role,
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        phone: faker.phone.phoneNumber(),
        token: faker.random.uuid(),
      }
      return result
    },
  },
]
