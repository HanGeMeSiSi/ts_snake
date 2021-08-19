// 引入一个包;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack 中的所有的配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry:'./src/index.ts',
    // 指定打包文件所放在的目录
    output:{
        // 指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 打包后文件的名字
        filename:"bundle.js",
        // 告诉webpack不是用箭头函数
        environment:{
            arrowFunction:false,
            const:false,
        }
    },
    // 指定webpack要使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,
                // 要是用loader  从后往前执行 做浏览器兼容
                use:[
                    // 配置babel
                    {
                        // 指定加载器
                        loader:"babel-loader",
                        // 设置babel
                        options:{
                            // 设置预定的环境
                            presets:[
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets:{
                                            "chrome":"88",
                                            "ie":"11"
                                        },
                                        // 指定corejs的版本
                                        "corejs":'3',
                                        // 使用corejs的方式“usage” 表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude:/node-modules/
            },
            // 设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:"last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title:"这是个自定义的"
            template:'./src/index.html'
        }),
    ],
    // 用来设置引用模块
    resolve:{
        // 那些文件可以当做模块被引入使用
        extensions:['.ts','.js']
    }
}