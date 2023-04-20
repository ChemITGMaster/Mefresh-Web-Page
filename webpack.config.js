const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/, // <-- 匹配 .js 和 .ts 文件
                exclude: /node_modules\/(?!mui-tel-input)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', 'ts-loader', 'source-map-loader']
                    }
                }
            }
        ]
    }
};