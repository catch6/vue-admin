<template>
  <div class="user-layout">
    <div class="user-layout-content">
      <div class="user-layout-top">
        <div class="user-layout-top-header">
          Vue Admin
        </div>
        <div class="user-layout-top-desc">
          一个简单且易于食用的后端框架
        </div>
      </div>
      <div class="user-layout-main">
        <router-view></router-view>
      </div>
    </div>
    <footer class="user-layout-footer">
      <div class="user-layout-footer-link">
        <a title="help" target="_self" href="">帮助</a>
        <a title="privacy" target="_self" href="">隐私</a>
        <a title="terms" target="_self" href="">条款</a>
      </div>
      <div class="user-layout-footer-copyright">
        Copyright © 2019 Catch
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UserLayout'
}
</script>

<style lang="stylus" scoped>
.user-layout
  display flex
  flex-direction column
  height 100vh
  overflow auto
  background-color #f0f2f5
  background-image url('~@/assets/svg/bg.svg')
  background-repeat no-repeat
  background-position center 110px
  background-size 100%
  .user-layout-content
    flex 1 1
    padding 72px 0 24px
    .user-layout-top
      text-align center
      .user-layout-top-header
        height 44px
        line-height 44px
        font-family Avenir, Helvetica Neue, Arial, Helvetica, sans-serif
        font-weight 600
        font-size 33px
        color rgba(0, 0, 0, .85)
      .user-layout-top-desc
        margin-top 12px
        margin-bottom 40px
        color rgba(0, 0, 0, .45)
        font-size 14px
  .user-layout-footer
    margin 48px 0 24px
    padding 0 16px
    text-align center
    color rgba(0, 0, 0, .45)
    .user-layout-footer-link
      margin-bottom 8px
      a
        color rgba(0, 0, 0, .45)
        &:not(:last-child)
          margin-right 40px
    .user-layout-footer-copyright
      font-size 14px
</style>
