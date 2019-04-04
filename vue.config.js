/* eslint-disable */
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AliyunossWebpackPlugin = require('aliyunoss-webpack-plugin')
const oss = require('./oss.js')
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  // alias 配置
  devServer: {
    // port: 8080, // 端口号
    // host: 'localhost',
    // https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    disableHostCheck: true // 不进行host校验可以 ngrok 访问
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
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
      // config.plugins.push(
      //   new AliyunossWebpackPlugin({
      //     buildPath: 'dist/**',
      //     region: oss.region,
      //     accessKeyId: oss.accessKeyId,
      //     accessKeySecret: oss.accessKeySecret,
      //     bucket: oss.bucket,
      //     deleteAll: true,
      //     generateObjectPath: function(filename, file) {
      //       return file.replace(/dist\//, '')
      //     }
      //   })
      // )
      config.plugins.push(new BundleAnalyzerPlugin())
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    config.resolve.extensions = ['.js', 'vue', '.json', '.styl', '.css']
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
