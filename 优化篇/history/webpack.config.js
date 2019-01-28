const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack');
module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    contentBase:'./dist'
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist','manifest.json')
    }),
    new Happypack({
      id: 'js',
      use:[
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      ]
    })
  ],
  module: {
    noParse:/jquery/,//不去解析jquey中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除
        include:path.resolve('src'),//包含
        use: 'Happypack/loader?id=js'
      }
    ]
  }
}