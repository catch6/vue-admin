<template>
  <li class="layout-aside-menu-item">
    <el-menu-item v-if="type === 1" :route="item" :index="item.path">
      <icon :name="item.meta.icon"></icon>
      <span slot="title" v-text="item.meta.title"></span>
    </el-menu-item>
    <el-submenu v-if="type === 2" :index="navIndex">
      <template slot="title">
        <icon :name="item.meta.icon"></icon>
        <span slot="title" v-text="item.meta.title"></span>
      </template>
      <layout-aside-menu-item
        v-for="(subItem, idx) in item.children"
        :key="`${navIndex}-${idx}`"
        :item="subItem"
        :navIndex="`${navIndex}-${idx}`"
      >
      </layout-aside-menu-item>
    </el-submenu>
  </li>
</template>

<script>
import '@/components/icons'
import { hasChildren } from '@/libs/util'
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutAsideMenuItem.vue',
  props: ['item', 'navIndex'],
  computed: {
    ...mapGetters('layout', ['isCollapse']),
    /**
     * 菜单三种类型
     * @returns {Number} 0-不显示；1-无子菜单；2-有子菜单；
     */
    type() {
      const item = this.item
      if (item.meta.hideInMenu) {
        return 0
      } else {
        if (hasChildren(item)) {
          if (item.children.some(one => !one.meta.hideInMenu)) {
            return 2
          }
        }
        return 1
      }
    }
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
