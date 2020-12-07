const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');


webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('err', err);
    } else {
        console.log('打包成功');
    }
});

// 这里还可以利用koa等，或者http模块去实现一个http服务器，简单一点就可以直接把dist目录作用静态资源目录
const app = new Koa();

app.use(KoaStaticCache('./dist', {
    prefix: '/',
    gzip: true,
    dynamic: true
}));

app.listen(9999);