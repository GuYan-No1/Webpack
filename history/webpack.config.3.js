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
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
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
            // {
            //     test:/\.js$/,
            //     use:[
            //         {
            //             loader:'eslint-loader',
            //             options:{
            //                  enforce:'pre'//previous:强制这个loader最先执行 还有一个参数数post:强制是最后执行 normal:普通的loader默认执行顺序
            //             }

            //         }
            //     ],
            //     include:path.resolve(__dirname,'src')
            // },
            // {
            //     test:require.resolve('jquery'),
            //     use:'expose-loader?$'
            // },
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