var path = require('path');

var webpack = require('webpack');
var env = process.env.NODE_ENV;

var config = {

    //项目的文件夹 可以直接用文件夹名称 默认会找index.js ，也可以确定是哪个文件名字
    entry: [
        './src/MyValidation.js'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'stage-1', 'stage-2','stage-3']
                }
            }
        ],
    },
    //输出的文件名,合并以后的js会命名为bundle.js
    output: {
        library: 'myValidation',
        libraryTarget: 'umd',
        path: path.join(__dirname, "dist/"),
		filename: 'my-validation.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8088'
    }
};

if (env === 'production') {
    config.plugins= [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })];

    config.output.filename = 'my-validation.min.js';
}

module.exports = config;
