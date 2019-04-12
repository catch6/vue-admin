<template>
  <div class="layout-aside-item">
    <el-menu-item v-if="type === 1" :route="item" :index="item.path">
      <icon :name="item.meta.icon" scale="2"></icon>
      <span slot="title" v-text="item.meta.title"></span>
    </el-menu-item>
    <el-submenu v-if="type === 2" :index="navIndex">
      <template slot="title">
        <icon :name="item.meta.icon" scale="2"></icon>
        <span slot="title" v-text="item.meta.title"> </span>
      </template>
      <layout-aside-item
        v-for="(subItem, idx) in item.children"
        :key="`${navIndex}-${idx}`"
        :item="subItem"
        :navIndex="`${navIndex}-${idx}`"
      >
      </layout-aside-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'layout-aside-item',
  props: ['item', 'navIndex'],
  computed: {
    /**
     * 菜单三种类型
     * @returns {Number} 0-不显示；1-无子菜单；2-有子菜单；
     */
    type() {
      const item = this.item
      if (!item.meta.hideInMenu) {
        if (item.children && this.item.children.length) {
          if (item.children.some(child => !child.meta.hideInMenu)) {
            return 2
          }
        }
        return 1
      }
      return 0
    }
  }
}
</script>

<style lang="stylus" scoped></style>
