<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-1">
    <q-header reveal elevated class="bg-white text-grey-8" height-hint="64">
      <toolbar :side-menu-open.sync="sideMenuOpen" />
      <page-tabbar v-if="$q.screen.gt.sm" />
    </q-header>

    <q-drawer
      :width="280"
      bordered
      show-if-above
      content-class="bg-white"
      v-model="sideMenuOpen"
    >
      <sidebar />
    </q-drawer>

    <q-page-container>
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
        <transition appear mode="out-in" name="fade-transverse">
          <router-view :key="$route.name" />
        </transition>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'
import PageTabbar from './components/Toolbar/PageTabbar'

export default {
  name: 'MainLayout',
  components: {
    PageTabbar,
    Toolbar,
    Sidebar,
  },
  data () {
    return {
      sideMenuOpen: !this.$q.screen.lt.md,
    }
  },
}
</script>
