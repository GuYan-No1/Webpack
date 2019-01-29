let path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports={
  mode:'production',
  devServer:{
    // 1)通过别人提供好的接口去请求数据
    // proxy:{//重写的方式 把请求代理到express服务器上
    //   // '/api':'http://localhost:3000' //配置了一个代理
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{'/api':''}
    //   }
    // }

    //2)前端只想单纯的模拟数据
    // before(app){//提供的方法 钩子
    //   app.get('/user',(req,res)=>{
    //     res.json({name:'王闯__张曼-before'})
    //   })
    // } 

  // 3)有服务端 不想用代理处理 在服务端中启动webpack端口用服务端端口
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