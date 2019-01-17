//webpack 是node写出来的 node的写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development', //模式 默认两种 production development
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'bulid'), //路径必须是一个绝对路径
    },
    plugins: [ //放在所有的webpack插件
        new HtmlWebpackPlugin({
            templete: './src/index.html', //传入模板的路径
            filename: 'index.html', //打包后的文件名
            minify: { //压缩配置
                removeAttributeQuotes: true, //删除属性的双引号
                collapseWhitespace: true //折叠空行
            },
            hash: true //加入哈希戳引入
        })
    ],
    module: { //模块
        rules: [
            //规则 css-loader 负责解析@import 这种语法的
            // style-loader 他是把css 插入到head的标签中
            // loader的特点 希望单一,一个loader只处理一键事情
            // loader的用法 例如：字符串只用一个loader
            // loader的顺序，默认是从右向左执行,从下到上执行
            //loader还可以写成对象方式
            {
                //可以处理less文件
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options:{
                        insertAt:'top'//插入到顶部
                    }
                }, 
                'css-loader', //@import 解析路径
                'less-loader'  // 把less->css
            ]
            }
        ]
    }
}