<template>
  <div class="home">
    111
    <el-button @click="logout">logout</el-button>
  </div>
</template>

<script>
import { clearLogin } from '@/libs/util'

export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    logout() {
      clearLogin()
    }
  }
}
</script>

<style lang="stylus" scoped></style>
