let path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  mode:'production',
  entry:{
    home:'./src/index.js'
  },
  //1)源码映射 会单独生成一个sourcemap文件 出错了会标识当前报错的列和行 大 而 全
  // devtool:'source-map',//增加映射文件 可以帮助我们调试源代码
  //2)不会产生单独的文件，但是可以显示行和列
  // devtool:'eval-source-map',
  //3) 不会产生列但是是一个单独的映射文件
  // devtool:'cheap-module-source-map',//产生后你可以保留起来,之后用于调试
  //4) 不会产生文件 集成在打包后的文件中(也不会产生列)
  devtool:'checp-module-eval-source-map',
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