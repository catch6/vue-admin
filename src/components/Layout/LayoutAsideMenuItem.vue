<template>
  <li class="layout-aside-menu-item">
    <el-submenu v-if="item.children" :index="item.path">
      <template slot="title">
        <v-icon :name="item.meta.icon"></v-icon>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <layout-aside-menu-item
          v-for="subItem in item.children"
          :item="subItem"
          :key="subItem.path">
      </layout-aside-menu-item>
    </el-submenu>
    <el-menu-item v-else :route="item.path" :index="item.path">
      <v-icon :name="item.meta.icon"></v-icon>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
  </li>
</template>

<script>

export default {
  name: 'LayoutAsideMenuItem',
  props: ['item']
}
</script>

<style lang="stylus" scoped>
.layout-aside-menu-item
  .fa-icon
    & + span
      margin-left 10px
</style>
<style lang="stylus">
.el-menu--collapse
  .el-submenu > .el-submenu__title
    span
      display none
    .el-submenu__icon-arrow
      display none
</style>
