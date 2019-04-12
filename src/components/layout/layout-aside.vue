<template>
  <el-aside width="200px">
    <layout-aside-logo></layout-aside-logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="defaultActive"
        router
        unique-opened
        :collapse="isCollapse"
        background-color="#2c3e50"
        text-color="#ecf0f1"
        active-text-color="#ffd04b"
      >
        <layout-aside-item
          v-for="(item, index) in routes"
          :item="item"
          :navIndex="`${item.name}`"
          :key="index"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import LayoutAsideLogo from './layout-aside-logo'
import LayoutAsideItem from './layout-aside-item'
import { mapGetters } from 'vuex'

export default {
  name: 'layout-aside',
  components: { LayoutAsideLogo, LayoutAsideItem },
  data() {
    return {
      defaultActive: this.$route.name,
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters('user', ['routes'])
  }
}
</script>

<style lang="stylus" scoped></style>
