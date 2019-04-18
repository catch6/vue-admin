<template>
  <el-header class="layout-header">
    <div class="fl">
      <el-button type="text" @click="toggleCollapse">
        <icon name="menu" scale="1.2" :dir="isCollapse?'right':'top'" class="menu-icon"></icon>
      </el-button>
    </div>
    <div class="fr">
      rr
    </div>
  </el-header>
</template>

<script>
import '@/components/icons/menu'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'layout-header',
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
  line-height 60px
  position relative
  box-shadow 0 2px 2px rgba(7, 17, 27, .1)
  .el-button
    color black
    &:hover
      color #409EFF
</style>
