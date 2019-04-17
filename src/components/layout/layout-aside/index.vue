<template>
  <el-aside width="260px" class="layout-aside">
    <logo></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="defaultActive"
        router
        unique-opened
        :collapse="isCollapse"
        background-color="#2c3e50"
        text-color="#ecf0f1"
        active-text-color="#ffd04b"
        class="menu"
      >
        <item
          v-for="(item, index) in menuRoutes"
          :item="item"
          :navIndex="`${item.name}`"
          :key="index"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import logo from './logo'
import item from './item'
import { mapGetters } from 'vuex'

export default {
  name: 'layout-aside',
  components: { logo, item },
  data() {
    return {
      defaultActive: this.$route.name,
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters('user', ['menuRoutes'])
  }
}
</script>

<style lang="stylus" scoped>
.layout-aside
  height 100vh
  .menu
    height calc(100vh - 60px)
    border-right none
</style>
