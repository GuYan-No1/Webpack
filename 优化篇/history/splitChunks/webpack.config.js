const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  optimization: {
    splitChunks: {//分割代码块
      cacheGroups: {//缓存组
        common: {//公共的模块
          chunks: 'initial',// 入口
          minSize: 0,// 需要抽离代码大小，最小是多少
          minChunks: 2,// 需要抽离的代码被引用多少次，我们进行抽离
        },
        vendor: {//抽离第三方文件的配置
          priority: 1,// 权重,配置先抽离第三方文件再去抽离公共的
          test: /node_modules/,// 把你抽离处理
          chunks: 'initial',// 入口
          minSize: 0,// 需要抽离代码大小，最小是多少
          minChunks: 2,// 需要抽离的代码被引用多少次，我们进行抽离
        }
      },
    }
  },
  mode: 'production',
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    // new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    // new webpack.DllReferencePlugin({
    //   manifest:path.resolve(__dirname,'dist','manifest.json')
    // }),
  ],
  module: {
    noParse: /jquery/,//不去解析jquey中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除
        include: path.resolve('src'),//包含
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}