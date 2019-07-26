// webpack.dev.js 运行代码的配置（该文件暂时用不到，先创建了，下文会用到）
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
module.exports = smart(webpackCommonConf, {
  mode: 'development',
  devServer: { // 配置此项，需要安装 webpack-dev-server
    port: 3000,
    progress: true, // 显示打包的进度，
    contentBase: distPath, // 运行的目录
    open: true, // 自动打开浏览器
    compress: true, //启动 gzip 压缩
    proxy: {
      '/api': 'http://localhost:3000',
      '/api2': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api2': ''
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    })
  ]
})
