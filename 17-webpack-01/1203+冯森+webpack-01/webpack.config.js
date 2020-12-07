const path = require('path');
// 使用node的模块导出一个配置对象，该对象会在webpack执行过程中被加载
module.exports = {
    mode: 'development',

    entry: "/src/index.js",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    // 配置模块解析规则
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "./images",
                        publicPath: '../dist/images',
                        limit: 100
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        url: true,
                        import: true,
                        sourceMap: false
                    }
                }]
            }
        ]
    }
}