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
    <transition-group appear mode="out-in" name="fade-transverse">
      <keep-alive key="cache">
        <router-view v-if="($route.meta || {}).cache" />
      </keep-alive>
      <router-view key="reload" v-if="!($route.meta || {}).cache" />
    </transition-group>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageContent',
  computed: {
    ...mapState('QA/page', ['cache']),
  },
}
</script>

<style scoped>

</style>
