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


router.get('/user/profile', async ctx => {
    ctx.body = {
        id: 1,
        name: 'haizi'
    }
});
router.get('/user/address', async ctx => {
    ctx.body = {
        id: 1,
        text: '后厂村'
    }
});

router.get('/carts/goods', async ctx => {
    ctx.body = {
        id: 1,
        text: 'mac'
    }
});

app.use(router.routes());

app.listen(8888);