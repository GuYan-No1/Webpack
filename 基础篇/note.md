## webpack安装
- 安装本地的webpack
- webpack webpack-cli -D

## webpack可以进行0配置
- 打包工具 -> 输出的结果（js模块）
- 打包(支持我们的js的模块化)

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js

## webpack-dev-server（webpack开发服务）
- yarn add webpack-dev-server -D

## HTML插件 
- yarn add html-webpack-plugin -D

## loader
- yarn add css-loader -D (负责处理css中@import语法)
- yarn add style-loader -D (负责将处理好的css样式插入到html结构中)
- yarn add less less-loader -D (负责将less转换为css)

- 类型
  - pre:前面执行的loader ;normal:普通的loader ;expore-loader:内联loader; 后置loader:postloader

## 抽离样式以link的形式插入到html结构
- yarn add mini-css-extract-plugin -D (抽离css的插件)

## 给样式自动添加-webkit-前缀
- yarn add autoprefixer -D (使用前提)
- yarn add postcss-loader -D

## 压缩css文件
- yarn add optimize-css-assets-webpack-plugin -D 
  - 需要注意的是如果用这个optimize-css-assets-webpack-plugin压缩css,我们build的js就不会自动打包，需要另一个插件(uglifyjs-webpack-plugin)辅助;详情见`https://www.npmjs.com/package/mini-css-extract-plugin`
- yarn add uglifyjs-webpack-plugin -D

## 处理js模块（babel）
- yarn add babel-loader @babel/core @babel/preset-env -D
- yarn add @babel/plugin-proposal-class-properties -D
- yarn add @babel/plugin-proposal-decorators -D
- yarn add @babel/babel/plugin-transform-runtime -D
- yarn add @babel/runtime 
- yarn add @babel/polyfill

- babel-loader(babel的loader) 
- @babel/core(babel的核心模块内置transform转换)
- @babel/preset-env(告知转换为什么形式)
- @babel/plugin-proposal-class-properties (负责转换es6中的class语法)
- @babel/plugin-proposal-decorators(负责转换es6中的装饰器语法) 详情见   `https://babeljs.io/docs/en/babel-plugin-proposal-decorators`;
- @babel/babel/plugin-transform-runtime(如果需要抽离我们转换的公共部分，需要在我们的项目中植入一个插件@bebel/runtime,
  所以@babel/runtime 需要安装在生产依赖中,详情见`https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav`)
- @babel/polyfill (负责处理includes等高级的es7语法,需要安装在生产依赖中,在需要使用es7语法的js文件中首行引入)

## 代码校验（Eslint）
- yarn add eslint eslint-loader -D

- 需要注意的是我们一般单独配置eslint匹配，还要在options中传递参数enforce:'pre'，强制eslint-loader先执行

## webapck中第三方模块的使用(全局变量引入问题)
- 本次以jQuery为例
- 1.内联loader(expose-loader),暴露到window中
  - yarn add expose-loader -D
    ```
    //第一种写法
    import $ from 'expose-loader?$!jquery';
    console.log(window.$);
    //第二中写法
    module:{
      rules:[
        {
          test:require.resolve('jquery),
          use:'expose-loader?$'
        }
      ]
    }
    ```
- 2.在每个模块中注入jquery($)
  ```
  plugins:[
    new Webpack.ProvidePlugin({
      $:'jquery'
    })
  ]
  ```

- 3.通过CDN在html中引入,在webpack中配置引入不打包

  ```
  externals:{
    jquery:'$'
  }
  ```

## webpack 打包图片
- 项目中可能出现的图片种类
  - 1.在js中创建图片引入
  - 2.在css中通过background引入
  - 3.在html中直接写死

- yarn add file-loader -D
 - file-loader 默认会在内部生成一张图片到build目录下并且把文件的路径返回回来

- yarn add html-withimg-loader -D
 - 处理html中的`img`标签的src路径问题

- yarn add url-loader -D
 - 效果同file-loader,但是比file-loader更加的灵活，一般项目中我们使用url-loader,
 - 哪里灵活:我们可以通过options传递一定的参数进去来做限制
 ```
 module:{
   rules:[
     {
       test:/\.(png|jpg|gif)$/,
       use:[
         {
           loader:'url-loader',
           options:{
             limit:200*1024//当文件小于200K的时候我们是进行base64压缩文件，当大于200K的时候跟file-loade效果一样
           }
         }
       ]
     }
   ]
 }
 ```

## 打包文件分类
- 1.对于图片的打包分类
```
module:{
  rules:[
    {
      test:/\.(png|jpg|gif)$/,
      use:[
        {
          loader:'url-loader',
          options:{
            limit:200*1024,
            outputPath:'image/' //执行build之后你会发现我们的图片都会打包进我们的image文件夹
          }
        }
      ]
    }
  ]
}
```
- 对于css文件的打包分类
```
plugins:[
  new MiniCssExtractPlugin({
    filename:'css/main.css'
  })
]
```

## 给打包的资源添加公共的路径
- 1.给所有的文件都增加
```
output:{
  filename:'bundle.js',
  path:path.resolve(__dirname,'build'),
  publicPath:'https://www.aliyun.com'
}
```
- 2.只给某些文件添加（以图片为例）
```
module:[
  {
    test:/\.(png|jpg|gif)$/,
    use:[
      {
        loader:'url-loader',
        options:{
          limit:200*1024,
          outputPath:'/image/',
          publicPath:'https://www.aliyun.com'
        }
      }
    ]
  }
]
```



