<template>
  <div class="login-layout">
    <div class="login-layout-content">
      <div class="login-layout-top">
        <div class="login-layout-top-header">
          Vue Admin
        </div>
        <div class="login-layout-top-desc">
          一个简单且易于食用的后端框架
        </div>
      </div>
      <div class="login-layout-main">
        <router-view></router-view>
      </div>
    </div>
    <footer class="login-layout-footer">
      <div class="login-layout-footer-link">
        <a title="help" target="_self" href="">帮助</a>
        <a title="privacy" target="_self" href="">隐私</a>
        <a title="terms" target="_self" href="">条款</a>
      </div>
      <div class="login-layout-footer-copyright">
        Copyright © 2019 Catch
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'login-layout',
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.login-layout
  display flex
  flex-direction column
  height 100vh
  overflow auto
  background-color #f0f2f5
  background-image url('~@/assets/svg/bg.svg')
  background-repeat no-repeat
  background-position center 110px
  background-size 100%
  .login-layout-content
    flex 1 1
    padding 72px 0 24px
    .login-layout-top
      text-align center
      .login-layout-top-header
        height 44px
        line-height 44px
        font-family Avenir, Helvetica Neue, Arial, Helvetica, sans-serif
        font-weight 600
        font-size 33px
        color rgba(0, 0, 0, .85)
      .login-layout-top-desc
        margin-top 12px
        margin-bottom 40px
        color rgba(0, 0, 0, .45)
        font-size 14px
  .login-layout-footer
    margin 48px 0 24px
    padding 0 16px
    text-align center
    color rgba(0, 0, 0, .45)
    .login-layout-footer-link
      margin-bottom 8px
      a
        color rgba(0, 0, 0, .45)
        &:not(:last-child)
          margin-right 40px
    .login-layout-footer-copyright
      font-size 14px
</style>
