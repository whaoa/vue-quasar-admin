<template>
  <q-toolbar>
    <q-tabs inline-label align="left" shrink stretch>
      <q-route-tab :to="{ name: home }" label="首页" />
      <q-route-tab
        v-for="(r, i) in tabs"
        :key="r.name"
        :to="r.fullPath"
        :label="r.meta && r.meta.title || '未命名标签页'"
      >
        <q-icon name="clear" size="xs" class="q-ml-sm" @click.stop="closeOne(i)"/>
      </q-route-tab>
    </q-tabs>
    <q-space />
    <div>
      <q-btn-dropdown split flat rounded icon="highlight_off" @click="closeAll">
        <q-list>
          <q-item clickable v-close-popup @click="closeSide('left')">
            <q-item-section>关闭左侧</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="closeSide('right')">
            <q-item-section>关闭右侧</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="closeOthers">
            <q-item-section>关闭其他</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-tooltip>关闭全部</q-tooltip>
    </div>
  </q-toolbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import config from '@/config'

export default {
  name: 'PageTabbar',
  data () {
    return {
      home: config.homePageName,
    }
  },
  computed: {
    ...mapState('qadmin/page', ['tabs']),
    ...mapGetters('qadmin/page', ['active']),
  },
  methods: {
    ...mapMutations('qadmin/page', ['closeOne', 'closeSide', 'closeOthers', 'closeAll']),
  },
}
</script>
