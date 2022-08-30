/*
 * @Author: your name
 * @Date: 2021-12-29 11:58:30
 * @LastEditTime: 2021-12-29 12:07:26
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\vue.config.js
 */
const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  configureWebpack:{
    externals: {
      "AMap":"window.AMap",
      "AMapUI":"window.AMapUI",
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, "./src/assets/styles/theme.less"),
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false, // 打包时不生成.map文件
  devServer: {
    open: true,
    proxy: 'http://localhost:8080'
  }
}
