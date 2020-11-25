const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaBody = require("koa-body")
const KoaStaticCache = require("koa-static-cache")
const mysql2 =require("mysql2")

// 创建数据库链接
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rocky',
    database: 'kkb'
});

let server = new Koa()
let router = new KoaRouter()

server.use(KoaStaticCache({
    dir:"./public/",
    prefix:"/public",
    gzip:true,
    dynamic: true
}))

router.get('/getData', async ctx => {
    ctx.body = {
        id: 1,
        username: 'haizi',
        gender: '未知'
    }
});

router.post('/save', KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/static/upload',
        keepExtensions: true
    }
}), async ctx => {
    // ctx.request.files.attachment
    let {name , type , size , path } = ctx.request.files.attachment
    let [res] = await query(
        "INSERT INTO `photos` (`filename`, `type`, `size` ,`path`) VALUES (?,?,?,?)",
        [name, type , size , path]
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

router.get('/getPhotos', async ctx => {
    // 从数据库中读取所有上传的图片记录数据，并返回给前端，前端通过ajax调用该接口
    let [res] = await query(
        "SELECT * FROM `photos`"
    )
    ctx.body = res
})
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


server.use(router.routes())

server.listen(8888,()=>{
    console.log("服务启动")
})