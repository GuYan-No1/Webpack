const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode:'development',
  entry: {
    react: ['react','react-dom']
  },
  output: {
    filename: '_dll_[name].js',//产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',//_dll_react
    libraryTarget:'var'//支持的输出模式commonjs umd var this...
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',//name==library
      path:path.resolve(__dirname,'dist','manifest.json')
    })
  ]
}