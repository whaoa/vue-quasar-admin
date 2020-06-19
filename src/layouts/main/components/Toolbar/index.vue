<template>
  <q-toolbar class="toolbar">
    <q-btn
      flat
      dense
      round
      @click="$emit('update:sideMenuOpen', !sideMenuOpen)"
      aria-label="Menu"
      icon="menu"
      class="q-mr-sm"
    />

    <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
      <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" height="34" alt="logo">
      <span class="q-ml-sm">Quasar Admin</span>
    </q-toolbar-title>

    <q-space/>

    <template v-if="$q.screen.gt.sm">
      <!-- 搜索栏 -->
      <page-search/>
      <q-space/>
    </template>

    <div class="q-gutter-sm row items-center no-wrap">
      <q-btn
        v-if="$q.screen.gt.sm"
        round
        dense
        flat
        color="text-grey-7"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="$q.fullscreen.toggle()"
      >
        <q-tooltip>全屏显示</q-tooltip>
      </q-btn>
      <q-btn round dense flat color="grey-8" icon="notifications">
        <q-badge color="red" text-color="white" floating>2</q-badge>
        <q-tooltip>消息通知</q-tooltip>
      </q-btn>
      <user-avatar />
    </div>
  </q-toolbar>
</template>

<script>
import PageSearch from './PageSearch'
import UserAvatar from './UserAvatar'

export default {
  name: 'Toolbar',
  components: { UserAvatar, PageSearch },
  props: {
    sideMenuOpen: Boolean,
  },
}
</script>

<style scoped>
  .toolbar {
    height: 64px;
  }
</style>
