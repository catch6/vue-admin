<template>
  <el-button
    type="text"
    @click="toggleFullScreen"
    v-if="show"
    class="full-screen"
  >
    <el-tooltip :content="isFullScreen?'退出全屏':'全屏'" placement="bottom">
      <icon
        :name="isFullScreen ? 'fullscreen-exit' : 'fullscreen'"
        scale="1.2"
      ></icon>
    </el-tooltip>
  </el-button>
</template>

<script>
export default {
  name: 'FullScreen',
  data() {
    return {
      isFullScreen: false
    }
  },
  computed: {
    show() {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    }
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        let main = document.body
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.full-screen
  margin-right 5px
</style>
