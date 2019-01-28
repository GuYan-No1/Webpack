## noParse
- 当我们在js文件引用第三方包的时候比如`jquery`,webpack会默认加载第三方包的依赖库,我们知道`jquery`没有依赖库，我们就可以通过noParse来配置让webpack不去加载
```
module:{
  noParse:/jquery/,
  rules:[
    {
      tset:/\.js$/,
      use:[
        {
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env','@babel/preset-react']
          }
        }
      ]
    }
  ]
}
```

## exclude && include
- 当我们去匹配js文件的时候,webpack会默认去解析`node_modules`中的文件，我们可以配置exclude属性来排除,
  或者配置include来包含
```
module:{
  noParse:/jquery/,
  rules:[
    {
      test:/\.js$/,
      <!-- 排除 -->
      exclude:/node_modules/,
      <!-- 包含 -->
      include:path.resolve('src')
      use:[
        {
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env','@babel/preset-react']
          }
        }
      ]
    }
  ]
}
```

## webpack.IgnorePlugin
- 当我们引入的一些第三方包的时候，有的时候第三方包会引入一些我们用不到的库，我们可以通过配置忽略掉,以moment为例他的主入口会引进`./locale/`
```
plugins:[
  new webpack.IgnorePlugin(/\.\/locale/,/moment/)
]
```

## 定义动态链接库
- 适用场景:当我们适用react的时候，我们需要引用一些长期不动的三方文件，但是如果我们不做处理的情况每次打包的时候都会打包一次；所以需要我们单独定义一个配置文件用来打包我们的公共的三方文件,运用webpack.DllPlugin定义，然后在`webpack.config.js`通过webpack.DllReferencePlugin插件通知webpack在打包的时候先引用我们的动态链接库，如果没有再去打包
```
//webpack.react.js
const path = require('path');
const webpack = require('webpack');
module.exports={
  mode:'development',
  entry:{
    react:['react','react-dom']
  },
  output:{
    filename:'_dll_[name].js',
    path:path.resolve(__dirname,'dist'),
    library:'_dll_[name]',
    libraryTarget:'var'
  },
  plugins:[
    new webpack.DllPlugin({
      name:'_dll_[name]',
      path:path.resolve(__dirname,'dist','mainfest.json')
    })
  ]
}

//index.html
<body>
<script src="/_dll_react.js"></script>
</body>

//webpack.config.js
plugins:[
  new webpack.DllReferencePlugin({
    manifest:path.reslove(__dirname,'dist','manifest.json')
  })
]
```

## 多线程打包
- 运用`happypack`实现多线程打包

## 内置的优化功能
- tree-shaking模式 把没用到的代码 自动删除掉
  - 前提：必须在生产模式下使用import 引入
- scope-hosting 作用域提升,会自动省略可以简化的代码

## 抽离公共代码
- 出现的前提：有多个入口，每个入口用相同的代码片段(可以是自己的自己写的js代码也可以是第三方文件)
```
optimizion:{
  <!-- 分割代码块 -->
  splitChunks:{
    <!-- 缓存组 -->
    cacheGroups:{
      <!-- 公共的模块 -->
      common:{
        <!-- 入口 -->
        chunks:'initial',
        <!-- 需要抽离的代码最小是多少 -->
        minSize:0,
        <!-- 需要抽离的代码最少的引用次数 -->
        minChunks:2
      },
      <!-- 第三方模块 -->
      vendor:{
        <!-- 入口 -->
        chunks:'initial',
        <!-- 匹配三方模块的引入路径 -->
        test:/node_modules/,
        <!-- 配置权重 -->
        priority:1,
        <!-- 需要抽离的代码最小是多少 -->
        minSize:0,
        <!-- 需要抽离的代码最少的引用次数 -->
        minChunks:2
      }
    }
  }
}
```
