<template>
  <el-dropdown class="layout-header-user" @command="handleCommand">
    <div>
      <img class="avatar" :src="avatar" alt="" />
      <span class="username">{{ username }}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="exit">
        <icon name="logout" scale="0.8"></icon>
        退出
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { clearLogin } from '@/libs/util'

export default {
  name: 'LayoutHeaderUser',
  computed: {
    ...mapGetters('user', ['avatar', 'username'])
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
  margin-left 15px
  margin-right 20px
  .avatar
    width 28px
    height 28px
    vertical-align middle
    margin-right 8px
</style>
