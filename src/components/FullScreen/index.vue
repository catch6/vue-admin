<template>
  <v-icon
    v-if="show"
    :name="isFullScreen ? 'compress' : 'expand'"
    scale="1.2"
    class="pointer"
    @click.native="toggleFullScreen"
  ></v-icon>
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

