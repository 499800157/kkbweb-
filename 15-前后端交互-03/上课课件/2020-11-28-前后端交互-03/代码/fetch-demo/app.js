const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaStaticCache = require('koa-static-cache');

const app = new Koa();

app.use(koaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();


router.get('/getData', async ctx => {
    ctx.body = {
        id: 1,
        name: 'haizi'
    }
});

app.use(router.routes());

app.listen(8888);