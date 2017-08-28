const { resolve } = require('path');
const webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: [
        // 'react-hot-loader/patch',
        // 'webpack/hot/only-dev-server',
        './app/src/index.js'
    ],
    output: {
        path: resolve(__dirname, 'build'),//打包后的文件存放的地方
        filename: "bundle.js",//打包后输出文件的文件名
        publicPath: "/"
    },
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        hot: true,
        publicPath: '/',
    },
    module: {

        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader', {
                        loader:'babel-loader',
                        options: {
                            "presets": [
                                ["es2015", { "modules": false }],
                                // webpack现在已经支持原生的import语句了, 并且将其运用在tree-shaking特性上
                                "stage-2",
                                // 规定JS运用的语言规范层级
                                // Stage 2 是 "草案", 4 是 "已完成", 0 is "稻草人(strawman)"。
                                // 详情查看 https://tc39.github.io/process-document/
                                "react"
                                // 转译React组件为JS代码
                            ],
                            "plugins": [
                                "react-hot-loader/babel",
                                // ["import", { "libraryName": "antd", "style": "css" }],
                                ["import", { "libraryName": "antd", "style": true }]
                                // 开启react代码的模块热替换（HMR）
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.less$/,
                use: ["style-loader", 'css-loader', {
                    loader: 'postcss-loader',
                    options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => [
                            require('postcss-import')({ root: loader.resourcePath }),
                            require('autoprefixer')(), //CSS浏览器兼容
                            require('cssnano')()  //压缩css
                        ]
                    }
                }, "less-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
    // devtool: "cheap-eval-source-map",
};