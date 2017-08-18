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
                    'babel-loader',
                ],
                exclude: /node_modules/
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