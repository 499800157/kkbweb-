const path = require('path');
// 使用node的模块导出一个配置对象，该对象会在webpack执行过程中被加载
module.exports = {
    mode: 'development',

    entry: {
        'index': './src/1.js',
        'user': './src/user.js'
    },

    output: {
        // 一定要是绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    // 配置模块解析规则
    module: {
        rules: [
            // 每一个对象就是一个解析规则
            {
                // 要被处理的模块规则
                test: /\.txt$/,
                use: 'raw-loader'
            },


            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             // placeholder 占位符 [name] 源资源模块的名称
            //             // [ext] 源资源模块的后缀
            //             name: "[name]_[hash].[ext]",
            //             //打包后的存放位置，相对于与全局的output.path
            //             outputPath: "./images",
            //             // 打包后文件的 url
            //             publicPath: '../dist/images',
            //         }
            //     }
            // },

            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // placeholder 占位符 [name] 源资源模块的名称
                        // [ext] 源资源模块的后缀
                        name: "[name]_[hash].[ext]",
                        //打包后的存放位置
                        outputPath: "./images",
                        // 打包后文件的 url
                        publicPath: '../dist/images',
                        // 小于 100 字节转成 base64 格式
                        limit: 100
                    }
                }
            },


            

            // {
            //     test: /\.css$/,
            //     use: {
            //         loader: "css-loader",
            //         options: {
            //             // 启用/禁用 url() 处理
            //             url: true,
            //             // 启用/禁用 @import 处理
            //             import: true,
            //             // 启用/禁用 Sourcemap
            //             sourceMap: false
            //         }
            //     }
            // },

            {
                test: /\.css$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        // 启用/禁用 url() 处理
                        url: true,
                        // 启用/禁用 @import 处理
                        import: true,
                        // 启用/禁用 Sourcemap
                        sourceMap: false
                    }
                }]
            }
        ]
    }
}