let path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports={
  mode:'production',
  devServer:{
    proxy:{
      // '/api':'http://localhost:3000' //配置了一个代理
      '/api':{
        target:'http://localhost:3000',
        reWrite:{'/api':''}
      }
    }
  },
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
      filename:'index.html'
    }),
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