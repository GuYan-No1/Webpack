let path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin =  require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


// 1) cleanWebpackPlugin  先删除我们的指定目录，然后再进行打包
// 2) copyWebpackPlugin   会将指定的文件拷贝到我们打包的文件中
// 3) bannerPlugin  内置的 版权声明，会在每个打包的js文件前面加上想加的注释
module.exports={
  mode:'production',
  entry:{
    home:'./src/index.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'home.html'
    }),
    new CleanWebpackPlugin('./build'),
    new CopyWebpackPlugin([// 拷贝插件
      { from:'./doc', to:'./'}
    ]),
    new webpack.BannerPlugin('make 2019 by wc')
  ],
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
      }
    ]
  }
}