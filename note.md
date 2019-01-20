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

## 抽离样式以link的形式插入到html结构
- yarn add mini-css-extract-plugin -D (抽离css的插件)

## 给样式自动添加-webkit-前缀
- yarn add autoprefixer -D (使用前提)
- yarn add postcss-loader -D

## 压缩css文件
- yarn add optimize-css-assets-webpack-plugin -D 
  - 需要注意的是如果用这个optimize-css-assets-webpack-plugin压缩css,我们build的js就不会自动打包，需要另一个插件(uglifyjs-webpack-plugin)辅助详情见`https://www.npmjs.com/package/mini-css-extract-plugin`
- yarn add uglifyjs-webpack-plugin -D