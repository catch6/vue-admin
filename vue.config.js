/* eslint-disable */
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AliOSSPlugin = require('webpack-alioss-plugin')
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true // 不进行host校验可以 ngrok 访问
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'prod') {
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
      config.plugins.unshift(
        new CleanWebpackPlugin()
      )
      // gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240
        })
      )
      config.plugins.push(new AliOSSPlugin())
      config.plugins.push(new BundleAnalyzerPlugin())
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // config.resolve.extensions = ['.js', 'vue', '.json', '.styl', '.css']
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
