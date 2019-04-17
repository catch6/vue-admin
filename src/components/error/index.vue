<template>
  <div class="error">
    <div class="wrapper">
      <div class="img">
        <img :src="config[code].img" alt="" />
      </div>
      <div class="content">
        <h1>{{ config[code].title }}</h1>
        <div class="desc">{{ config[code].desc }}</div>
        <div class="action">
          <el-button type="primary" @click="handleToHome">
            返回首页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/libs/util'
import svg403 from '@/assets/svg/403.svg'
import svg404 from '@/assets/svg/404.svg'
import svg500 from '@/assets/svg/500.svg'

export default {
  name: 'error',
  data() {
    return {
      code: this.$route.params.code || 404,
      config: {
        403: {
          img: svg403,
          title: '403',
          desc: '抱歉，你无权访问该页面'
        },
        404: {
          img: svg404,
          title: '404',
          desc: '抱歉，你访问的页面不存在或仍在开发中'
        },
        500: {
          img: svg500,
          title: '500',
          desc: '抱歉，服务器出错了'
        }
      }
    }
  },
  methods: {
    handleToHome() {
      const token = getToken()
      if (token) {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  },
  mounted() {
    document.title = this.config[this.code].desc
  }
}
</script>

<style lang="stylus" scoped>
.error
  height 100vh
  display flex
  .wrapper
    position relative
    bottom 50px
    margin auto
    .img
      display inline-block
      vertical-align middle
      padding-right 52px
      zoom 1
      img
        height 360px
        max-width 430px
    .content
      display inline-block
      vertical-align top
      h1
        color #434e59
        font-size 72px
        font-weight 600
        line-height 72px
        margin-bottom 24px
      .desc
        color rgba(0, 0, 0, .45)
        font-size 20px
        line-height 28px
        margin-bottom 16px
</style>
