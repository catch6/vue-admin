<template>
  <div class="layout-header clearfix">
    <div class="fl">
      <el-button type="text" @click="toggleCollapse">
        <icon name="menu" scale="1" :dir="isCollapse ? 'right' : 'top'"></icon>
      </el-button>
      <el-button type="text" @click="toggleCollapse">
        <icon name="fullscreen" scale="1"></icon>
      </el-button>
    </div>
    <div class="fr">
      <el-button type="text" @click="toggleCollapse">
        <icon name="fullscreen" scale="1"></icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import '@/components/icons/menu'
import '@/components/icons/fullscreen'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'LayoutHeader',
  data() {
    return {}
  },
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
  .el-button
    color black
    &:hover
      color #409EFF
</style>
