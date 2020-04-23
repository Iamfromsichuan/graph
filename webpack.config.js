const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, './build'),
    },
    module: {
        rules: [
            {
                // 注意不要写成 '/\.css$/'
                test: /\.css$/,
                use: [
                    // 创建style变迁，将js的央视资源插入
                    'style-loader',
                    // 将css作为js模块加载到js中，内容是字符串
                    'css-loader'
                ]
            },
            {
                // 注意不要写成 '/\.css$/'
                test: /\.less$/,
                use: [
                    // 创建style变迁，将js的央视资源插入
                    'style-loader',
                    // 将css作为js模块加载到js中，内容是字符串
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // 小8k，处理成base64
                    // 减少资源请求, 会增加打包体积
                    limit: 8 * 1024,
                    // 在部分情况下，html中存在引入图片，打包后src成了[Object Modeule]
                    // 原因是url-loader默认使用的es6的模块
                    // 关闭es6的模块，使用commonjs
                    esModule: false,
                    name: 'name-[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 专门处理html中引入图片资源，让其被url-loader处理
                use: 'html-loader'
            },
            {
                exclude: /\.(css|js|html|less|png|jpg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    mode: 'development', // production
    // 开发服务器devServer 只会在内存中打包编译
    // 不会有任何的输出, 启动指令是webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, './build'),
        compress: true,
        port: 3000,
    }
}