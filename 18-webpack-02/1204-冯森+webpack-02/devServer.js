const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
// const KoaRouter = require('koa-router');


webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('err', err);
    } else {
        console.log('打包成功');
    }
});

const app = new Koa();

app.use(KoaStaticCache('./dist', {
    prefix: '/',
    gzip: true,
    dynamic: true
}));

app.listen(9999);