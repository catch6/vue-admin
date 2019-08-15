<template>
  <div class="layout">
    <layout-aside></layout-aside>
    <div class="layout-container">
      <layout-header></layout-header>
      <layout-main></layout-main>
      <layout-footer></layout-footer>
    </div>
  </div>
</template>

<script>
import LayoutAside from './LayoutAside'
import LayoutHeader from './LayoutHeader'
import LayoutMain from './LayoutMain'
import LayoutFooter from './LayoutFooter'

export default {
  name: 'Layout',
  components: { LayoutAside, LayoutHeader, LayoutMain, LayoutFooter }
}
</script>

<style lang="stylus" scoped>
.layout
  width 100vw
  height 100vh
  display flex
  .layout-container
    flex 1
    display flex
    flex-direction column
</style>
