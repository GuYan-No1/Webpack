const path = require('path');
module.exports={
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:path.resolve(__dirname,'dist')
  },
  resolveLoader:{ //专门用来解析loader的参数
    //别名
    // alias:{
    //   loader1:path.resolve(__dirname,'loader','loader1.js')
    // }
    modules:['node_modules',path.resolve(__dirname,'loader')]
  },
  module:{
    // loader的分类 pre在前面的 post 在后面 normal正常的
    // loader的顺序 pre-->normal-->inline-->post
    rules:[// loader的顺序问题，从右向左，从下到上
      {
        test:/\.js$/,
        use:{
          loader:'loader1'
        },
        enforce:'pre'
      },
      {
        test:/\.js$/,
        use:{
          loader:'loader2'
        }
      },
      {
        test:/\.js$/,
        use:{
          loader:'loader3'
        },
        enforce:'post'
      }
    ]
  }
}