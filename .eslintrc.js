const isProduct = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  rules: {
    semi: ['error', 'never'], // 禁止使用分号
    'arrow-parens': ['error', 'as-needed'], // 允许箭头函数只有一个参数时省略括号
    'space-before-function-paren': ['error', 'always'], // 函数名后必须使用空格
    'object-curly-newline': 'off', // 对象换行
    'no-param-reassign': 'off', // 允许赋值给函数参数
    'import/extensions': ['error', 'always', { js: 'never', vue: 'never' }], // import .vue 允许省略扩展名
    'no-console': isProduct ? 'warn' : 'off',
    'no-debugger': isProduct ? 'warn' : 'off',
  },
}
