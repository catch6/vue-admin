<template>
  <div class="layout">
    <layout-aside></layout-aside>
    <section class="layout-container">
      <layout-header></layout-header>
      <layout-main></layout-main>
      <layout-footer></layout-footer>
    </section>
    <!--<el-header>-->
    <!--<el-button type="text" @click="handleCollapse">-->
    <!--<icon type="navicon" :rotate="isCollapse?90:0" size="32"></icon>-->
    <!--</el-button>-->
    <!--<div class="header-right">-->
    <!--<full-screen></full-screen>-->
    <!--<lock-screen></lock-screen>-->
    <!--<message-tip></message-tip>-->
    <!--<el-row type="flex" justify="end" align="middle" class="user-info">-->
    <!--<img class="avatar" :src="user.avatar" />-->
    <!--<el-dropdown @command="handleCommand">-->
    <!--<span class="username">-->
    <!--{{user.nickname}} <icon type="chevron-down"></icon>-->
    <!--</span>-->
    <!--<el-dropdown-menu slot="dropdown">-->
    <!--<el-dropdown-item command="exit">退出</el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
    <!--</el-row>-->
    <!--</div>-->
    <!--</el-header>-->
    <!--<el-main>-->
    <!--<router-view></router-view>-->
    <!--</el-main>-->
    <!--<el-footer>2015-2017 © euming.com 京ICP备15010597号</el-footer>-->
  </div>
</template>

<script>
import LayoutAside from './LayoutAside'
import LayoutHeader from './LayoutHeader'
import LayoutMain from './LayoutMain'
import LayoutFooter from './LayoutFooter'

export default {
  name: 'Layout',
  components: { LayoutAside, LayoutHeader, LayoutMain, LayoutFooter },
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.layout
  width 100vw
  height 100vh
  display flex
  .layout-container
    flex 1
    display flex
    flex-direction column
</style>
