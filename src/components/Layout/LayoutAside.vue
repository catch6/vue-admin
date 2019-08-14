<template>
  <div class="layout-aside">
    <div class="layout-aside-logo">
      <router-link to="/home">
        LOGO
      </router-link>
    </div>
    <el-scrollbar class="layout-aside-scrollbar">
      <el-menu
        class="layout-aside-menu"
        :default-active="defaultActive"
        router
        unique-opened
        :collapse="isCollapse"
      >
        <layout-aside-menu-item
          v-for="item in menuRoutes"
          :item="item"
          :key="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import LayoutAsideMenuItem from './LayoutAsideMenuItem'
import {mapGetters} from 'vuex'

export default {
  name: 'LayoutAside',
  components: {LayoutAsideMenuItem},
  computed: {
    ...mapGetters('user', ['menuRoutes']),
    ...mapGetters('layout', ['isCollapse']),
    defaultActive() {
      let matched = this.$route.matched
      return matched[matched.length - 1].path
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-aside
  height 100vh
  user-select none
  background-color #fff
  .layout-aside-logo
    height 60px
    line-height 60px
    text-align center
    color #fff
    font-size 25px
    font-weight 700
  .layout-aside-scrollbar
    height calc(100vh - 60px)
    overflow-x hidden
    .layout-aside-menu
      min-width 75px
      border-right none
</style>

<style lang="stylus">
.el-scrollbar__wrap
  overflow-x hidden !important

.layout-aside-menu:not(.el-menu--collapse)
  width 220px
  min-height calc(100vh - 60px)
</style>
