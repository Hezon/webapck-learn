// webpack.prod.js 打包代码的配置
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    filename: 'bundle.[contentHash:8].js', // 打包代码时，加上 hash 戳
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  // devtool: 'source-map',  // 1. 生成独立的 source map 文件
  // devtool: 'eval-source-map',  // 2. 同 1 ，但不会产生独立的文件，集成到打包出来的 js 文件中
  // devtool: 'cheap-module-source-map',  // 3. 生成单独的 source map 文件，但没有列信息（因此文件体积较小）
  // devtool: 'cheap-module-eval-source-map',  // 4. 同 3 ，但不会产生独立的文件，集成到打包出来的 js 文件中
  plugins: [
    new webpack.DefinePlugin({ // 定义全局变量
      ENV: JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css'
    })
  ],

  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
