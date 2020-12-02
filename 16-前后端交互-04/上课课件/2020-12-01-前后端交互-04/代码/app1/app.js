const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');

let currentId = 2;
let users = [
    {
        id: 1,
        username: 'dahai'
    },
    {
        id: 2,
        username: 'zMouse'
    }
]

const app = new Koa();

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

router.get('/data', async ctx => {
    let n = ctx.query.n;
    console.log('n', n);

    // testData 检测数据是否有变化，如果没有变化，则每隔一段时间进行数据的比较，直到数据有变化为止（实际应用中，最好设置不好查询太久）
    await testData(n);

    ctx.body = users;
});

router.post('/save', KoaBody(), async ctx => {
    let username = ctx.request.body.username;

    users.push({
        id: ++currentId,
        username
    });

    ctx.body = '添加成功';
})

app.use(router.routes());

app.listen(8888);

async function testData(num) {
    // 数据和当前请求的客户端数据是一致的
    if (num == users.length) {
        await sleep(5000);
        await testData(num);
    }
}

function sleep(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, t);
    });
}