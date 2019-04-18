<template>
  <el-container>
    <layout-aside></layout-aside>
    <el-container class="is-vertical">
      <layout-header></layout-header>
      <layout-main></layout-main>
      <layout-footer></layout-footer>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './layout-aside'
import LayoutHeader from './layout-header'
import LayoutMain from './layout-main'
import LayoutFooter from './layout-footer'

export default {
  name: 'layout',
  components: { LayoutAside, LayoutHeader, LayoutMain, LayoutFooter }
}
</script>

<style lang="stylus" scoped></style>
