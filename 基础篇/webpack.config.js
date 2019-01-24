//webpack 是node写出来的 node的写法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
    optimization: {//优化项
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache:true,
                parallel:true,
                sourceMap:true
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bulid'),
        // publicPath:'https://aliyun.com'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new Webpack.ProvidePlugin({//提供插件,在每个模块中都注入$
            $:'jquery'
        })
    ],
    externals:{
        jquery:'$'
    },
    module: {
        rules: [
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        //做一个限制当我们的图片小于多少k的时候我们使用base64转化，否则用file-loader产生真实的图片
                        options:{
                            // limit:200*1024 //200k
                            limit:1,
                            outputPath:'/image/',
                            publicPath:'https://www.aliyun.com'
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{//用babell-loader需要把es6->es5
                            presets:[//设置预设
                                '@babel/preset-env'
                            ],
                            plugins:[//在大插件的集合中配置小插件
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                                ["@babel/plugin-transform-runtime"]
                            ]
                        }
                    }
                ],
                include:path.resolve(__dirname,'src'),//包括哪些文件（匹配哪些文件）
                exclude:/node_modules///排除掉那些文件（不匹配哪些文件）
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]

            }
        ]
    }
}