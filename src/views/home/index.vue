<template>
  <div class="home basic">
    <h1>首页</h1>
  </div>
</template>

<script>
import { clearLogin } from '@/libs/util'

export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    logout() {
      clearLogin()
      location.href = '/login'
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  height 100%
  display flex
  justify-content center
  align-items center
</style>
