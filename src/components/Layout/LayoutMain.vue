<template>
  <div class="layout-main">
    <div class="layout-breadcrumb">
      <el-breadcrumb v-if="curMenu.name !== 'home'">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="bread in breadcrumbs"
          :to="bread.path"
          :key="bread.id"
        >
          {{ bread.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-container">
      <keep-alive>
        <router-view v-if="$route.cache"></router-view>
      </keep-alive>
      <router-view v-if="!$route.cache"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findMenu } from '@/libs/util'

export default {
  name: 'LayoutMain',
  data() {
    return {
      breadcrumbs: [],
      curMenu: null
    }
  },
  computed: {
    ...mapGetters('user', ['menu'])
  },
  methods: {
    initBreadcrumb(route) {
      this.curMenu = findMenu(this.menu, 'name', route.name)
      document.title = this.curMenu.title
      this.breadcrumbs = this.generateBreadcrumb(this.curMenu, []).reverse()
    },
    generateBreadcrumb(menu, breads) {
      if (menu.name !== 'home') {
        breads.push(menu)
        if (menu.parent) {
          return this.generateBreadcrumb(menu.parent, breads)
        }
      }
      return breads
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.initBreadcrumb(route)
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-main
  flex 1
  background-color #f0f0f0
  padding 10px 15px 0
  .layout-breadcrumb
    padding 0 0 10px
</style>
