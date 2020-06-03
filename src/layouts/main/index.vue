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

        <q-input class="toolbar-input" outlined dense v-model="search"
                 color="bg-grey-7" placeholder="Search for topics, locations & sources">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
          </template>
        </q-input>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="avatar">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
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
        <q-list padding>
          <q-item class="drawer-item" v-for="link in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md"/>

          <q-item class="drawer-item" v-for="link in links2" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs"/>

          <q-item-label header class="text-weight-bold text-uppercase">
            More from Youtube
          </q-item-label>

          <q-item class="drawer-item" v-for="link in links3" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md"/>

          <q-item class="drawer-item" v-for="link in links4" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg"/>

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
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      showAdvanced: false,
      showDateOptions: false,
      exactPhrase: '',
      hasWords: '',
      excludeWords: '',
      byWebsite: '',
      byDate: 'Any time',
      links1: [
        {
          icon: 'home',
          text: 'Home',
        },
        {
          icon: 'whatshot',
          text: 'Trending',
        },
        {
          icon: 'subscriptions',
          text: 'Subscriptions',
        },
      ],
      links2: [
        {
          icon: 'folder',
          text: 'Library',
        },
        {
          icon: 'restore',
          text: 'History',
        },
        {
          icon: 'watch_later',
          text: 'Watch later',
        },
        {
          icon: 'thumb_up_alt',
          text: 'Liked videos',
        },
      ],
      links3: [
        {
          icon: 'fabYoutube',
          text: 'YouTube Premium',
        },
        {
          icon: 'local_movies',
          text: 'Movies & Shows',
        },
        {
          icon: 'videogame_asset',
          text: 'Gaming',
        },
        {
          icon: 'live_tv',
          text: 'Live',
        },
      ],
      links4: [
        {
          icon: 'settings',
          text: 'Settings',
        },
        {
          icon: 'flag',
          text: 'Report history',
        },
        {
          icon: 'help',
          text: 'Help',
        },
        {
          icon: 'feedback',
          text: 'Send feedback',
        },
      ],
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

    &-input {
      width: 55%;
    }
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
