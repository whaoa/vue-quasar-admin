<template>
  <div class="flex justify-center items-center column absolute" style="width: 100%; height: 100%;">
    <q-img
      transition="fade"
      :src="data.img"
      spinner-color="primary"
      style="width: 30%;"
    />
    <div class="text-center">
      <h2 class="text-weight-medium">{{ data.title }}</h2>
      <p class="text-subtitle1">{{ data.desc }}</p>
      <q-btn outline rounded color="primary" label="返回首页" @click="handleToHome" />
    </div>
  </div>
</template>

<script>
import config from '@/config'

const types = {
  403: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
    title: '404',
    desc: '抱歉，你访问的页面不存在或仍在开发中',
  },
  500: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
    title: '500',
    desc: '抱歉，服务器出错了',
  },
}
export default {
  name: 'error',
  props: {
    type: {
      type: String,
      default: '404',
    },
  },
  data () {
    return {
      data: {},
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ name: config.homePageName })
    },
  },
  created () {
    this.data = types[this.type]
  },
}
</script>
