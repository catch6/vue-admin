/* eslint-disable */
const AliOSSPlugin = require('webpack-alioss-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true // 不进行host校验可以 ngrok 访问
  },
  configureWebpack: config => {
    if (prod) {
      // config.plugins.push(new AliOSSPlugin())
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // 只打包初始时依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]element-ui[\\/]/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 2, // 最小共用次数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }

    }
    // config.externals = {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'element-ui': 'ELEMENT'
    // }
  }
}
