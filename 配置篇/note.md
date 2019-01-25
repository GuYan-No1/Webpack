## 多页应用配置
- 当有多页应用的时候我们的入口文件就不只是一个文件了，所以我们的`entry`的配置也不能像之前那样
  直接字符串配置了,而是应该通过一个对象配置两个入口
- 当然我们的出口也不能像之前那样配置了，因为我们的入口有两个了，就要有两个出口了
- 引入html的时候我们也要分别的js引入到分别的html中了,我们想输出两个,就要new两次插件,通过chunk
  参数来控制每个html引入那个js文件
  ```
  module.exports={
    entry:{
      home:'./src/index.js',
      other:'./src/other.js'
    },
    output:{
      filename:'[name].js',
      path:path.resolve(__dirname,'bundle')
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'home.html',
        chunk:['home']
      }),
      new HtmlWebpack({
        template:'./src/index.html',
        filename:'other.html',
        chunk:['other']
      })
    ]
  }
  ```

## 配置source-map（代码映射）
- 1.配置devtool:'source-map',会产生一个单独的sourceMap文件，出错了会标识当前报错的行 
  特点:大而且全
```
devtool:'source-map'
```
- 2.配置devtool:'eval-source-map',不会产生一个单独的source文件，出错了会标识当前报错的行
```
devtool:'eval-source-map'
```
- 3.配置devtool:'cheap-module-source-map',会产生一个单独的文件存起来,不会提示行和列,
```
devtool:'cheap-module-source-map'
```
- 4.配置devtool:'cheap-module-eval-source-map',不会产生一个单独的文件存起来，但是会集成在打包的文件中,会提示行和列