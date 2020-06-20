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
      <page-content />
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'
import PageTabbar from './components/Toolbar/PageTabbar'
import PageContent from './components/PageContent'

export default {
  name: 'MainLayout',
  components: {
    PageTabbar,
    Toolbar,
    Sidebar,
    PageContent,
  },
  data () {
    return {
      sideMenuOpen: !this.$q.screen.lt.md,
    }
  },
}
</script>
