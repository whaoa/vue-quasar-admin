const isProduct = process.env.NODE_ENV === 'production'

module.exports = [
  // Vue Framework
  { name: 'vue', library: 'Vue', js: `https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue${isProduct ? '.min' : ''}.js` },
  { name: 'vue-router', library: 'VueRouter', js: `https://cdn.jsdelivr.net/npm/vue-router@3.3.2/dist/vue-router${isProduct ? '.min' : ''}.js` },
  { name: 'vuex', library: 'Vuex', js: `https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex${isProduct ? '.min' : ''}.js` },
  // Utils
  { name: 'axios', library: 'axios', js: 'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js' },
  { name: 'axios-mock-adapter', library: 'AxiosMockAdapter', js: 'https://cdn.jsdelivr.net/npm/axios-mock-adapter@1.18.1/dist/axios-mock-adapter.min.js' },
  { name: 'dayjs', library: 'dayjs', js: 'https://cdn.jsdelivr.net/npm/dayjs@1.8.28/dayjs.min.js' },
  { name: 'echarts', library: 'echarts', js: 'https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js' },
  { name: 'v-charts', library: 'VCharts', js: 'https://cdn.jsdelivr.net/npm/v-charts@1.19.0/lib/index.min.js', css: 'https://cdn.jsdelivr.net/npm/v-charts@1.19.0/lib/style.min.css' },
  // Quasar Frameword
  /* Quasar 使用 UMD 方式引入时，无法使用自闭合标签，且配置需在引入 Quasar 相关文件之前设置 */
  { name: 'animate.css', library: 'animate.css', css: 'https://cdn.jsdelivr.net/npm/animate.css@4.1.0/animate.min.css' },
  { name: 'material-icons', library: 'material-icons', css: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp' },
  { name: 'fontawesome', library: 'fontawesome', css: 'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css' },
  { name: 'mdi', library: 'mdi', css: 'https://cdn.jsdelivr.net/npm/@quasar/extras@1.8.1/mdi-v5/mdi-v5.css' },
  { name: 'q', library: 'q', css: 'https://cdn.jsdelivr.net/npm/quasar@1.12.2/dist/quasar.min.css' },
]
