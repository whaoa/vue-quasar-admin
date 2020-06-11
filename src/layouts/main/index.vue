<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" height="34" alt="logo">
          <span class="q-ml-sm">Quasar Admin</span>
        </q-toolbar-title>

        <q-space/>

        <!-- 搜索栏 -->
        <header-search />

        <q-space/>

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
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="avatar">
            </q-avatar>
            <q-tooltip>用户中心</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <side-bar-menu :menus="menus" />
        <div class="q-px-md text-grey-9">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons1"
              :key="button.text"
              class="drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div class="q-py-md q-px-md text-grey-9">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons2"
              :key="button.text"
              class="drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition appear mode="out-in" name="fade-transverse">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import menus from '@/router/routes'
import HeaderSearch from './components/HeaderSearch'
import SideBarMenu from './components/SideBarMenu'

export default {
  name: 'MainLayout',
  components: {
    HeaderSearch,
    SideBarMenu,
  },
  data () {
    return {
      menus,
      leftDrawerOpen: false,
      search: '',
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' },
      ],
    }
  },
}
</script>

<style lang="scss">
  .toolbar {
    height: 64px;
  }

  .drawer-item {
    line-height: 24px;

    .q-item__section--avatar {
      .q-icon {
        color: #5f6368;
      }
    }

    .q-item__label {
      color: #3c4043;
      letter-spacing: .01785714em;
      font-size: .875rem;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }


  .drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: .75rem;

    &:hover {
      color: #000;
    }
  }
</style>
