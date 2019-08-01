// webpack.common.js 公共的配置
const path = require('path')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(srcPath, '/views/index/index'),
    other: path.join(srcPath, '/views/other/other')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, '/views/index/index.html'),
      filename: 'index.html',
      chunks: ['manifest', 'vendor', 'common', 'index'] // 引用 chunks
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, '/views/other/other.html'),
      filename: 'other.html',
      chunks: ['manifest', 'vendor', 'common', 'other']
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
      },
      {
        test: /\.html$/,
        use: ['html-withimg-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片转换为 base64 格式
            // 否则，用 file-loader 生成 url 格式
            limit: 5 * 1024,

            // outputPath: '/img/',

            name: 'img/[name].[hash:7].[ext]'

            // 设置图片 cdn 地址
            // publicPath: 'http://cdn/abc.com'
          }
        }
      },
      // {
      //   test:/\.(png|jpg|gif)$/,
      //   use:'file-loader'
      // }
    ]
  }
}
