<template>
  <li class="layout-aside-menu-item">
    <el-submenu v-if="item.children" :index="item.path">
      <template slot="title">
        <icon :name="item.meta.icon" scale="0.8"></icon>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <layout-aside-menu-item
        v-for="subItem in item.children"
        :item="subItem"
        :key="subItem.path"
      >
      </layout-aside-menu-item>
    </el-submenu>
    <el-menu-item v-else :route="item.path" :index="item.path">
      <icon :name="item.meta.icon" scale="0.8"></icon>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutAsideMenuItem',
  props: ['item'],
  computed: {
    ...mapGetters('layout', ['isCollapse'])
  }
}
</script>

<style lang="stylus" scoped>
.layout-aside-menu-item
  .svg-icon
    & + span
      margin-left 10px
</style>
<style lang="stylus">
.el-menu--collapse
  .el-submenu > .el-submenu__title
    span
      height 0
      width 0
      overflow hidden
      visibility hidden
      display inline-block
    .el-submenu__icon-arrow
      display none
</style>
