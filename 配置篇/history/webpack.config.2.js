let path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


// 1) cleanWebpackPlugin
// 2) copyWebpackPlugin 
// 3) bannerPlugin  内置的
module.exports={
  mode:'production',
  entry:{
    home:'./src/index.js'
  },
  watch:true,
  watchOptions:{//监控的选择
    poll:1000,//每秒 问我 1000次
    aggregateTimeout:500, //防抖 我一直输入代码
    ignored:'/node_modules'//不需要监控哪个文件
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html'
    })
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