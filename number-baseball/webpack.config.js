const path = require('path');
const webpack = require('webpack');
const refreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'word-chaning-setting',
    mode: 'development', // 실서비스: product
    devtool: 'eval', // 실서비스: hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'] // entry에 들어가는 확장자 지정
    },
    entry: {
        app: ['./client'], // client 안에 import 된 것까지 포함된다
    }, // 입력
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new refreshPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'dist'), // path.join => 현재 폴더 안에 dist 폴더 생성
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력
    devServer: {
        publicPath: '/dist/',
        hot: true,
        // writeToDisk: true, dist 생성되는 옵션
    }
}