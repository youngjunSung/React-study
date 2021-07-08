const path = require('path');

module.exports = {
    name: 'word-chaning-setting',
    mode: 'development', // 실서비스: product
    devtool: 'eval',
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
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },
    output: {
        path: path.join(__dirname, 'dist'), // path.join => 현재 폴더 안에 dist 폴더 생성
        filename: 'app.js',
    }, // 출력
}