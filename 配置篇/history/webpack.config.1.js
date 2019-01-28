const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // 1)源码映射 会单独生产一个sourceMap文件 出错了 会标识当前报错的行
  // devtool:'source-map',//增加映射文件，可以帮我们调试源代码
  // 2）不会产生单独的文件 但是可以显示报错的行
  // devtool:'eval-source-map',
  // 3)不会提示行和列，但是是一个单独的映射文件(没有调试功能,产生后可以保留起来)
  // devtool:'cheap-module-source-map',
  // 4)不会产生单独的文件，但是会集成在打包的文件中(而且也不会产生行和列)
  devtool:'cheap-module-eval-source-map',
  entry: {
    home: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path:path.resolve(__dirname,'bundle')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks:['home']
    })
  ],
  resolve: {
    modules: [path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue']//扩展名的解析顺序，我们默认的引入的时候有时候不写拓展名，但是解析的时候会默认只解析js，配置后会如果第一个没有回依次解析
    // mainFields: ['style', 'main'], //引入包的解析入口顺序（在引入包的package.json中查看），默认是main
    // maiFile:[]//入口文件的名字
    // alias: {//别名
    //   bootstrap:'bootstrap/dist/css/bootstrap.css'
    // }
    
  },
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
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
        
      }
    ]
  }
}