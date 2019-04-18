<template>
  <div class="layout-aside">
    <div class="layout-aside-logo">
      <router-link to="/home">
        LOGO
      </router-link>
    </div>
    <el-scrollbar
      class="layout-aside-scrollbar"
      wrap-class="layout-aside-scrollbar-wrap"
    >
      <el-menu
        class="layout-aside-menu"
        :default-active="defaultActive"
        router
        unique-opened
        :collapse="isCollapse"
        background-color="#2c3e50"
        text-color="#ecf0f1"
        active-text-color="#ffd04b"
      >
        <layout-aside-menu-item
          v-for="(item, index) in menuRoutes"
          :item="item"
          :navIndex="`${item.name}`"
          :key="index"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import LayoutAsideMenuItem from './LayoutAsideMenuItem'
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutAside',
  components: { LayoutAsideMenuItem },
  data() {
    return {
      defaultActive: this.$route.name
    }
  },
  computed: {
    ...mapGetters('user', ['menuRoutes']),
    ...mapGetters('layout', ['isCollapse'])
  }
}
</script>

<style lang="stylus" scoped>
.layout-aside
  height 100vh
  user-select none
  background-color #2c3e50
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
      border-right none
      &:not(.el-menu--collapse)
        width 220px
        overflow-y auto
</style>

<style lang="stylus">
.el-scrollbar__wrap
  overflow-x hidden !important
</style>
