const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaStaticCache = require("koa-static-cache")
const KoaBody = require("koa-body")
const mysql2 = require("mysql2")
const fs = require("fs")

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

// 创建数据库链接
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rocky',
    database: 'kkb'
});

const server = new Koa();
const router = new KoaRouter()

// 静态资源代理
server.use(KoaStaticCache({
    dir:"./public",
    prefix: '/public',
    gzip: true,
    dynamic: true
}))

// 首页图片展示
router.get("/",async ctx => {
    ctx.set('content-type', 'text/html;charset="utf-8"');
    let [res] = await query(
        "SELECT * FROM `attachments`"
    )
    let str = `
        <h2>图片列表</h2>
        <ul>
    `
    if(res.length > 0){
        str += "<a href = '/upload'>继续上传</a>"
        res.forEach((item)=>{
            str += `
                <li><img src = "${item.path}"/></li>
            `
        }) 
    }else{
        str += "<li>目前还没有图片！<a href = '/upload'>前往上传</a></li>"
        
    }
    str += "</ul>"
    ctx.body = str
    
})
// 上传页面
router.get("/upload",ctx => {
    let content = fs.readFileSync("./public/upload.html")
    ctx.set('content-type', 'text/html;charset="utf-8"');
    ctx.body = content
})
// 处理上传信息
router.post("/upload",KoaBody({
    multipart: true,
    formidable: {
        uploadDir: './public/attachments',
        keepExtensions: true
    }
}), async ctx => {
    let imgTypeArr = ["image/jpeg","image/png","image/jpg","image/gif"]
    let {name , type , size , path } = ctx.request.files.file
    if(imgTypeArr.indexOf(type) > -1){
        let [res] = await query(
            "INSERT INTO `attachments` (`filename`, `type`, `size` ,`path`) VALUES (?,?,?,?)",
            [name, type , size , path]
        )
        if(res.warningStatus === 0){
            ctx.body = `
                <p>上传成功！</p>
                <a href = '/upload'>继续上传</a>
                <a href = '/'>返回首页</a>
            `
        }else{
            ctx.body = `
                <p>上传失败！</p>
                <a href = '/upload'>重新上传</a>
                <a href = '/'>返回首页</a>
            `
        }
    }else{
        ctx.body = `
            <p>上传失败！文件格式不正确，只能上传图片格式文件</p>
            <a href = '/upload'>重新上传</a>
            <a href = '/'>返回首页</a>
        `
    }
})

server.use(router.routes())

server.listen(8888,()=>{
    console.log("服务启动了")
})




