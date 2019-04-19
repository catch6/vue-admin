<template>
  <li class="layout-aside-menu-item">
    <el-menu-item
      v-if="!item.children"
      :route="{ name: item.name }"
      :index="`${item.id}`"
    >
      <icon :name="item.icon"></icon>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
    <el-submenu v-else :index="`${item.id}`">
      <template slot="title">
        <icon :name="item.icon"></icon>
        <span slot="title">{{ item.title }}</span>
      </template>
      <layout-aside-menu-item
        v-for="subItem in item.children"
        :key="subItem.id"
        :item="subItem"
      >
      </layout-aside-menu-item>
    </el-submenu>
  </li>
</template>

<script>
import '@/components/icons'
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
    width 18px
    height 18px
    & + span
      margin-left 10px
</style>
<style lang="stylus">
.el-menu--collapse
  .el-submenu > .el-submenu__title
    span
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    .el-submenu__icon-arrow
      display none
</style>
