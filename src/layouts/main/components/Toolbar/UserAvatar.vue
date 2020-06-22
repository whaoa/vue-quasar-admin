<template>
  <q-btn round flat>
    <q-avatar v-if="uid !== undefined" size="26px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="avatar">
    </q-avatar>
    <span v-else v-ripple>{{ name || '未登录' }}</span>
    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list style="min-width: 100px">
        <template v-if="uid !== undefined">
          <q-item clickable>
            <q-item-section>{{ name }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="$store.dispatch('qadmin/user/logout')">
            <q-item-section>退出登录</q-item-section>
          </q-item>
        </template>
        <q-item v-else clickable @click="toLogin">
          <q-item-section>立即登录</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-tooltip>{{ uid !== undefined ? '用户中心' : '点击登录' }}</q-tooltip>
  </q-btn>
</template>

<script>
import { mapState } from 'vuex'
import config from '@/config'

export default {
  name: 'UserAvatar',
  computed: {
    ...mapState('qadmin/user', {
      uid: state => state.userInfo.uid,
      name: state => state.userInfo.name,
    }),
  },
  methods: {
    toLogin () {
      this.$router.push({ name: config.loginPageName })
    },
  },
}
</script>

<style scoped>

</style>
