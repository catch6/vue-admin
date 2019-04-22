<template>
  <div class="layout-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { findMenuByName } from '@/libs/util'

export default {
  name: 'LayoutMain',
  data() {
    return {}
  },
  computed: {
    breadcrumb() {
      let breadcrumbs=[]
      let curRouteName = this.$route.name
      let curMenu = findMenuByName(curRouteName)
      // if (curMenu.parentId)
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-main
  flex 1
  background-color #f0f0f0
</style>
