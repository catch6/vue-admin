<template>
  <el-container>
    <layout-aside></layout-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './layout-aside'

export default {
  name: 'layout',
  components: { LayoutAside }
}
</script>

<style lang="stylus" scoped></style>
