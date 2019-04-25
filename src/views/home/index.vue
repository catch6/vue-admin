<template>
  <div class="home">
    home
    <el-button @click="logout">logout</el-button>
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
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped></style>
