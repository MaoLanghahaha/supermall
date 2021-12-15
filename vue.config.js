// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  configureWebpack: { // 配置webpack
    resolve: { // 解决路径相关的一些问题
      // extensions:['.js', '.vue', '.json'], // 配置需要省略的文件后缀名，vue-cli3及以上默认的webpack配置（所以不需要再配置）
      alias: {
        // '@':'src' // vue-cli3及以上默认配置
        'assets': '@/assets', // vue-cli2写法：'assets':'src/assets'
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
