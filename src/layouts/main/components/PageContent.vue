<template>
  <q-page class="q-layout-padding" style="overflow: hidden;">
    <!-- 面包屑导航 -->
    <q-breadcrumbs>
      <q-breadcrumbs-el
        class="cursor-pointer"
        v-for="item in $route.matched"
        :key="item.name"
        :label="item.meta && item.meta.title || item.name"
      />
    </q-breadcrumbs>
    <!-- 路由 -->
    <transition appear mode="out-in" name="fade-transverse">
      <keep-alive :include="cache">
        <router-view />
      </keep-alive>
    </transition>
    <!-- 返回顶部 -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageContent',
  computed: {
    ...mapGetters('qadmin/page', ['cache']),
  },
}
</script>

<style scoped>

</style>
