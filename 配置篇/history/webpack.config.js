let path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  mode:'development',
  //多入口
  entry:{
    home:'./src/index.js',
    other:'./src/other.js'
  },
  output:{
    //[name] home,other
    filename:'[name].js',
    path:path.resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'home.html',
      chunks:['home']
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'other.html',
      chunks:['other']
    })
  ]
}