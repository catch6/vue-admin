<template>
  <div class="login">
    <h3 class="login-title">登录</h3>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.remember">自动登录</el-checkbox>
        <a class="fr" href="/">忘记密码</a>
      </el-form-item>
      <el-form-item class="login-button-wrapper mb0">
        <el-button class="login-button" type="primary" @click="handleLogin" :loading="loading">
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <span class="fr">
          还没账号？去<router-link to="/register">注册</router-link></span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  name: 'login',
  data() {
    return {
      form: {
        mobile: '',
        password: '',
        remember: false
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['blur']
          },
          {
            len: 11,
            message: '手机号长度应为 11 位',
            trigger: ['blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur']
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: ['blur']
          }
        ]
      },
      loading: false
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          login(this.form)
            .then(data => {
              setToken(data.token, this.form.remember ? 30 : 1)
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  width 388px
  margin 50px auto 0
  .login-title
    margin-bottom 20px
    font-size 16px
    font-weight 600
  .login-button
    width 100%
</style>
