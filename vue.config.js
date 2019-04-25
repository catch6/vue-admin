/* eslint-disable */
const AliOSSPlugin = require('webpack-alioss-plugin')

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true // 不进行host校验可以 ngrok 访问
  },
  configureWebpack: config => {
    if (process.env.mode === 'prod') {
      // 转为CND外链方式的npm包，键名是import的npm包名，键值是该库暴露的全局变量
      // 参考 https://webpack.js.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx
      // config.externals = {
      //   'vue': 'Vue',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex',
      //   'axios': 'axios',
      //   'element-ui': 'ELEMENT'
      // }
      // 为生产环境修改配置...
      // config.plugins.push(new AliOSSPlugin())
    } else {
      // 为开发环境修改配置...
    }
  }
}
