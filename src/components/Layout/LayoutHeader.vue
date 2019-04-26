<template>
  <div class="layout-header clearfix">
    <div class="fl">
      <el-button type="text" @click="toggleCollapse">
        <icon
          name="menu"
          scale="1.2"
          :dir="isCollapse ? 'right' : 'top'"
        ></icon>
      </el-button>
    </div>
    <div class="fr">
      <full-screen></full-screen>
      <layout-header-user></layout-header-user>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FullScreen from '@/components/FullScreen'
import LayoutHeaderUser from './LayoutHeaderUser'

export default {
  name: 'LayoutHeader',
  components: { FullScreen, LayoutHeaderUser },
  computed: {
    ...mapGetters('layout', ['isCollapse'])
  },
  methods: {
    ...mapMutations('layout', ['toggleCollapse'])
  }
}
</script>

<style lang="stylus" scoped>
.layout-header
  position relative
  height 60px
  line-height 60px
  box-shadow 0 2px 2px rgba(7, 17, 27, .1)
  padding 0 20px
  background-color #fff
  .el-button
    color black
    &:hover
      color #409EFF
</style>
