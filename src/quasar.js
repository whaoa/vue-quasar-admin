import Vue from 'vue'

import {
  Quasar,
  // 组件
  QAjaxBar,
  QIcon,
  QList,
  QItem,
  QItemLabel,
  QItemSection,
  QSeparator,
  QExpansionItem,
  QIntersection,
  QScrollArea,
  QImg,
  QBtn,
  QSpace,
  QCard,
  QCardActions,
  QCardSection,
  QInnerLoading,
  // 插件
  LoadingBar,
  AppFullscreen,
  Notify,
  Dialog,
  LocalStorage,
  Loading,
  // 指令
  Ripple,
} from 'quasar'

import lang from 'quasar/lang/zh-hans'

Vue.use(Quasar, {
  lang,
  config: {
    loadingBar: {
      // color: 'blue-grey',
      size: '5px',
      position: 'top',
      skipHijack: true,
    },
    notify: {
      position: 'bottom-right',
      timeout: 2500,
      textColor: 'white',
      actions: [
        {
          icon: 'close',
          color: 'white',
        },
      ],
    },
  },
  components: {
    QAjaxBar,
    QList,
    QIcon,
    QItem,
    QItemLabel,
    QItemSection,
    QSeparator,
    QExpansionItem,
    QIntersection,
    QScrollArea,
    QImg,
    QBtn,
    QSpace,
    QCard,
    QCardActions,
    QCardSection,
    QInnerLoading,
  },
  plugins: {
    LoadingBar,
    AppFullscreen,
    Notify,
    Dialog,
    LocalStorage,
    Loading,
  },
  directives: {
    Ripple,
  },
})
