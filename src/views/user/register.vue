<template>
  <div class="register">
    <h3 class="register-title">注册</h3>
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
      <el-form-item prop="smsCode">
        <el-input
          v-model="form.smsCode"
          placeholder="请输入短信验证码"
          class="sms-code-input"
        >
        </el-input>
        <el-button
          plain
          class="sms-code-btn"
          :disabled="timerSeconds !== 0"
          @click="handleSendSmsCode"
          v-text="
            timerSeconds === 0 ? '发送验证码' : `重新发送 (${timerSeconds}s)`
          "
        ></el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.remember">在本设备保存登录状态</el-checkbox>
      </el-form-item>
      <el-form-item class="register-button-wrapper">
        <el-button
          class="register-button"
          type="primary"
          @click="handleRegister"
          :loading="loading"
        >
          注册
        </el-button>
      </el-form-item>
      <el-form-item>
        <span class="fr">
          已有账号？去
          <router-link :to="{ name: 'login', query: $route.query }">
            登录
          </router-link>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
import { sendSmsCode } from '@/api/common'
import { setToken } from '@/libs/util'

export default {
  name: 'register',
  data() {
    const validateMobile = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      const reg = /^\S{6,20}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入 6 到 20 位密码'))
      }
    }
    const validateSmsCode = (rule, value, callback) => {
      const reg = /^\d{6}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入 6 位数字短信验证码'))
      }
    }
    return {
      form: {
        mobile: '',
        password: '',
        remember: false,
        smsCode: ''
      },
      rules: {
        mobile: [
          {
            validator: validateMobile,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        smsCode: [
          {
            validator: validateSmsCode,
            trigger: 'blur'
          }
        ]
      },
      timerSeconds: 0,
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
    handleSendSmsCode() {
      this.$refs.form.validateField('mobile', errorMobile => {
        if (!errorMobile) {
          sendSmsCode(this.form.mobile).then(() => {
            this.timerSeconds = 120
            this.setTimer()
          })
        }
      })
    },
    setTimer() {
      if (this.timerSeconds > 0) {
        setTimeout(() => {
          --this.timerSeconds
          this.setTimer()
        }, 1000)
      }
    },
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.form)
            .then(data => {
              setToken(data.token, this.form.remember ? 30 : 1)
              this.loading = false
              this.$router.replace(this.redirect || { name: 'home' })
            })
            .catch(error => {
              this.loading = false
              console.error(error)
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
.register
  width 388px
  margin 50px auto 0
  .register-title
    margin-bottom 20px
    font-size 16px
    font-weight 600
  .sms-code-input
    width 65%
  .sms-code-btn
    float right
    width 33%
  .register-button-wrapper
    margin-bottom 0
    .register-button
      width 100%
</style>
