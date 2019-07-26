// webpack.common.js 公共的配置
const path = require('path')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.join(srcPath, 'index'),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [ // loader 的执行顺序是：从下往上，从右往左
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.less$/, // less 文件作为入口
        loader: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // {
      //   loader: 'less-loader',   // compiles Less to CSS
      //   options: {
      //     // 使用独立的文件解析路径，参照 readme.md
      //     paths: [
      //       path.resolve(__dirname, "../assets/css")
      //     ]
      //   }
      // },
      {
        test: /\.css$/, // css 文件作为入口
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 若在 css 文件中引入 less 文件，就需要加上 less-loader
      }
    ]
  }
}
