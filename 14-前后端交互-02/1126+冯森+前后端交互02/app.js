const Koa = require("koa")
const KoaRouter =require("koa-router")
const KoaBody = require("koa-body")
const KoaStaticCache = require("koa-static-cache")
const mysql2 = require("mysql2")
const jwt = require("koa-jwt")
const jsonwebtoken = require("jsonwebtoken");

// 创建数据库链接
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rocky',
    database: 'kkb'
});

function query(sql, prePared) {
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            prePared,
            function(err, results, fields) {
                if (err) {
                    reject(err); 
                } else {
                    resolve([results, fields]);
                }
            }
        ) 
    });
}

const app = new Koa()
const router = new KoaRouter()

const secret = 'kkb';
app.use(jwt({ secret }).unless({ path: [/^\/public/, /^\/login/] }));

app.use(KoaStaticCache({
    dir:"./public",
    prefix:"/public",
    gzip:true,
    dynamic:true
}))

router.post("/login",KoaBody(), async ctx =>{
    let {username , password} = ctx.request.body
    let [res] = await query(
        "SELECT * FROM `users` where `username` = (?) and `password` = (?)",
        [username , password]
    )
    if(res.length > 0){
        let payload = {
            id:res[0].id,
            username:res[0].username
        };
        ctx.set('Authorization', jsonwebtoken.sign(payload, secret));
        ctx.body = {
            username
        }
    }else{
        ctx.body = "用户不存在"
    }
})

router.get('/getPhotos', async ctx => {
    // 从数据库中读取所有上传的图片记录数据，并返回给前端，前端通过ajax调用该接口
    if(ctx.state.user){
        let userid = ctx.state.user.id
        let [res] = await query(
            "SELECT * FROM `photos` where userid = ?",
            [userid]
        )
        ctx.body = res
    }else{
        ctx.body = "没有权限"
    }
})

router.post('/save', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/static/upload',
        keepExtensions: true
    }
}), async ctx => {
    // ctx.request.files.attachment
    if(!ctx.state.user){
        ctx.body = "没有权限"
        return
    }
    let {name , type , size , path } = ctx.request.files.attachment
    let userid = ctx.state.user.id
    let [res] = await query(
        "INSERT INTO `photos` (`filename`, `type`, `size` ,`path`,`userid`) VALUES (?,?,?,?,?)",
        [name, type , size , path ,userid]
    )
    if(res.warningStatus === 0){
        // 把上传成功后的当前这个图片的访问地址返回给 前端
        ctx.body = {
            path:path
        }
    }else{
        ctx.body = "上传失败！"
    }
    
});


app.use(router.routes())
app.listen(8888,()=>{
    console.log("服务启动")
})