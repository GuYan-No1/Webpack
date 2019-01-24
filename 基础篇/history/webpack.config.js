//webpack 是node写出来的 node的写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    devServer: { //开发服务的配置
        port: 3000, //端口号
        progress: true, //进度条,
        contentBase: './bulid', //指定服务指向的文件夹
        open: true, //自动打开浏览器
        compress: true, //启用gzip压缩
    },
    mode:'development',//模式 默认两种 production development
    entry:'./src/index.js',//入口
    output:{
        filename:'bundle.[hash:8].js',//打包后的文件名
        path:path.resolve(__dirname,'bulid'),//路径必须是一个绝对路径
    },
    plugins:[//放在所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',//传入模板的路径
            filename:'index.html',//打包后的文件名
            minify:{//压缩配置
                removeAttributeQuotes:true,//删除属性的双引号
                collapseWhitespace:true//折叠空行
            },
            hash:true//加入哈希戳引入
        })

    ]
}