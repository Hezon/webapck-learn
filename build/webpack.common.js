// webpack.common.js 公共的配置
const { join } = require('path')
const srcPath = join(__dirname, '..', 'src')
const distPath = join(__dirname, '..', 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    index: join(srcPath, '/views/index/index'),
    other: join(srcPath, '/views/other/other'),
    vue: join(srcPath, '/views/vue/vue'),
    vue2: join(srcPath, '/views/vue2/vue2'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(srcPath, '/views/index/index.html'),
      filename: 'index.html',
      chunks: ['manifest', 'vendor', 'common', 'index'] // 引用 chunks
    }),
    new HtmlWebpackPlugin({
      template: join(srcPath, '/views/other/other.html'),
      filename: 'other.html',
      chunks: ['manifest', 'vendor', 'common', 'other']
    }),
    new HtmlWebpackPlugin({
      template: join(srcPath, '/views/vue/vue.html'),
      filename: 'vue.html',
      chunks: ['manifest', 'vendor', 'common', 'vue']
    }),
    new HtmlWebpackPlugin({
      template: join(srcPath, '/views/vue2/vue2.html'),
      filename: 'vue2.html',
      chunks: ['manifest', 'vendor', 'common', 'vue2']
    }),
    new VueLoaderPlugin()
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // })
  ],
  externals: {
    $: 'jQuery',
    vue: 'Vue'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': srcPath
    }
  },
  module: {
    noParse: /jquery|lodash/, // 不解析 jquery 和 lodash 的内部依赖
    rules: [ // loader 的执行顺序是：从下往上，从右往左
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
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
        loader: ['style-loader', 'vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 若在 css 文件中引入 less 文件，就需要加上 less-loader
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
