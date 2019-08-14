<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <v-icon
          name="bars"
          scale="1.5"
          :class="{'rotate-90':isCollapse , 'pointer':true }"
          @click.native="toggleCollapse"
      ></v-icon>
    </div>
    <div class="layout-header-right">
      <full-screen class="full-screen"></full-screen>
      <layout-header-user></layout-header-user>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import FullScreen from '@/components/FullScreen'
import LayoutHeaderUser from './LayoutHeaderUser'

export default {
  name: 'LayoutHeader',
  components: {FullScreen, LayoutHeaderUser},
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
  display flex
  align-items center
  position relative
  height 60px
  line-height 60px
  padding 0 20px
  box-shadow 0 2px 2px rgba(7, 17, 27, .1)
  vertical-align middle
  background-image linear-gradient(to right, #4facfe 0%, #00f2fe 50%, #4facfe 100%)
  color #fff
  .layout-header-left
    margin-right auto
</style>
