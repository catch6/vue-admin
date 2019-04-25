<template>
  <div class="layout-main">
    <div class="layout-breadcrumb" v-if="showBreadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="bread in breadcrumbs"
          :to="bread.path"
          :key="bread.path"
        >
          {{ bread.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-container">
      <keep-alive :include="cachePool">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutMain',
  computed: {
    ...mapGetters('user', ['menu', 'cachePool']),
    showBreadcrumb() {
      let meta = this.$route.meta
      return meta.showBread === undefined || meta.showBread
    },
    breadcrumbs() {
      return this.generateBreadcrumbs(this.$route, [])
    }
  },
  methods: {
    generateBreadcrumbs(route, breads) {
      if (route.name !== 'Home') {
        breads.unshift({
          path: route.path,
          title: route.meta.title
        })
      }
      if (route.meta.parent) {
        breads.concat(this.generateBreadcrumbs(route.meta.parent, breads))
      }
      return breads
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
