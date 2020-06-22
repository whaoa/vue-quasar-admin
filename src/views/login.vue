<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <vue-particles class="bg"/>
        <q-ajax-bar
          position="bottom"
          color="accent"
          size="10px"
          skip-hijack
        />
        <q-card class="card" bordered>
          <q-img
            style="height: 140px;"
            transition="fade"
            src="https://images.unsplash.com/photo-1534680554819-83f7124bcfc5?w=350"
          />

          <q-card-section class="q-pb-none">
            <div class="text-h6">系统登录</div>
            <div class="text-caption text-grey">欢迎使用 Quasar-Admin</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form ref="loginForm" @submit="onSubmit" @reset="onReset">
              <q-input
                v-model="form.username"
                label="请输入您的账号"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || '请输入账号']"
              />

              <q-input
                v-model="form.password"
                :type="isPwd ? 'password' : 'text'"
                label="请输入您的登陆密码"
                :lazy-rules="true"
                :rules="[ val => val && val.length > 0 || '请输入密码']"
              >
                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="flex">
                <q-space/>
                <q-btn flat label="重置" type="reset" color="dark"/>
                <q-btn flat label="登录" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
          <q-inner-loading :showing="loading" />
        </q-card>
      </q-page>
    </q-page-container>

    <q-footer class="q-py-md text-center text-grey" style="background-color: transparent;">
      Copyright <i class="fa fa-copyright"/> 2020 @whaoa
    </q-footer>
  </q-layout>
</template>

<script>
import config from '@/config'

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: null,
        password: null,
      },
      isPwd: true,
      loading: false,
    }
  },

  methods: {
    // 提交
    onSubmit () {
      this.$refs.loginForm.validate().then(async success => {
        if (success) {
          this.loading = true
          this.$store.dispatch('qadmin/user/login', this.form)
            .then(() => {
              this.$q.notify({
                color: 'green-4',
                icon: 'check_circle',
                message: '登录成功',
              })
              this.$router.push(this.$route.query.redirect || { name: config.homePageName })
            })
            .finally(() => { this.loading = false })
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: '登录失败',
          })
        }
      })
    },
    // 表单重置
    onReset () {
      this.form.username = null
      this.form.password = null
      this.isPwd = true
    },
  },
}
</script>

<style scoped>
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .card {
    width: 100%;
    max-width: 350px;
  }
</style>
