const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool:'cheap-module-eval-source-map',
  entry: {
    home: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path:path.resolve(__dirname,'bundle')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks:['home']
    }),
    new webpack.DefinePlugin({
      DEV:JSON.stringify('dev')
    })
  ],
  resolve: {
    modules: [path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue']
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
        
      }
    ]
  }
}