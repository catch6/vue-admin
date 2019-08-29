<template>
  <el-dropdown class="layout-header-user" @command="handleCommand">
    <div>
      <img class="avatar" :src="avatar" alt=""/>
      <span class="username">{{ nickname }}</span>
      <v-icon name="angle-down" style="font-size: 16px"></v-icon>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="exit">
        <v-icon name="sign-out-alt"></v-icon>
        退出
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { clearLogin } from '@/assets/js/util'

export default {
  name: 'LayoutHeaderUser',
  computed: {
    ...mapGetters('user', ['avatar', 'nickname'])
  },
  methods: {
    handleCommand(command) {
      if (command === 'exit') {
        clearLogin()
        location.href = '/login'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-header-user
  margin 0 15px
  color #fff
  .avatar
    width 32px
    height 32px
    vertical-align middle
    margin-right 5px
    border-radius 50%
  .username
    font-size 20px
    vertical-align middle
    margin-right 5px
</style>
