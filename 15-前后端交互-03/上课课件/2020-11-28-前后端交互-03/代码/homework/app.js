const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const mysql2 = require('mysql2');
const parsePath = require('parse-filepath');
const KoaStaticCache = require('koa-static-cache');
const jsonwebtoken = require('jsonwebtoken');
const KoaJwt = require('koa-jwt');

const app = new Koa();
const router = new KoaRouter();

const connection = mysql2.createConnection({
    user: 'root',
    password: '12345678',
    database: 'kkb'
});

const key = 'kkb';
app.use(
    KoaJwt({
        secret: key,
        getToken(ctx) {
            // console.log('ctx.query.authorization', ctx.query.authorization);
            return ctx.query.authorization;
        }
    })
    .unless({
        path: [
            /^\/public/,
           
            /^\/login/,
        ]
    })
);

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));
app.use(KoaStaticCache('./static', {
    prefix: '/static',
    gzip: true,
    dynamic: true
}));

router.post('/upload', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './static/upload',
        keepExtensions: true
    }
}), async ctx => {

    let {attachment} = ctx.request.files;

    let fileInfo = parsePath(attachment.path);

    let filename = fileInfo.basename;
    let fileType = attachment.type;
    let fileSize = attachment.size;


    // console.log('fileInfo', filename, fileType, fileSize);

    let rs = await query(
        "insert into `attachments` (`filename`, `type`, `size`, `uid`) values (?, ?, ?, ?)",
        [
            filename, fileType, fileSize, ctx.state.user.uid
        ]
    );

    if (rs.affectedRows < 1) {
        ctx.body = '上传失败';
    } else {
        ctx.body = {
            filename
        };
    }

});

// 登录验证
router.post('/login', KoaBody(), async ctx => {

    let {username, password} = ctx.request.body;

    if (!username || !password) {
        ctx.status = 400;
        return ctx.body = '用户名和密码不能为空';
    }

    let [rs] = await query(
        "select * from `users` where `username`=? and `password`=?",
        [username, password]
    );

    if (!rs) {
        ctx.status = 401;
        return ctx.body = '登录失败';
    }

    let signString = jsonwebtoken.sign({
        uid: rs.id,
        username: rs.username
    }, key);

    ctx.set('Authorization', signString);
    ctx.body  = '登录成功';

})

// 这个接口是需要授权的
router.get('/getPhotos', async ctx => {
    console.log('user', ctx.state.user);
    let rs = await query(
        "select * from `attachments` where `uid`=?",
        [ctx.state.user.uid]
    );

    ctx.body = rs;
})

app.use( router.routes() );


app.listen(8888, () => {
    console.log(`服务启动成功 http://localhost:8888`);
})

function query(sql, data) {
    return new Promise( ( resolve, reject) => {
        connection.query(
            sql,
            data,
            function(err, ...result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(...result);
                }
            }
        );
    } )
}