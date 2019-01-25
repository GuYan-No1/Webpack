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