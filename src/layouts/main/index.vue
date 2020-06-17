<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <toolbar :side-menu-open.sync="sideMenuOpen" />
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
      <div style="overflow-y: hidden;">
        <transition appear mode="out-in" name="fade-transverse">
          <router-view />
        </transition>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from './components/Toolbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'MainLayout',
  components: {
    Toolbar,
    Sidebar,
  },
  data () {
    return {
      sideMenuOpen: true,
    }
  },
}
</script>
