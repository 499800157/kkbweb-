const Koa = require("koa")
const KoaRouter = require("koa-router")
const fs = require("fs")
const KoaStaticCache = require('koa-static-cache');
const mime = require("./mime.json")

let server =  new Koa()
let router = new KoaRouter()

// 静态资源代理
server.use(KoaStaticCache({
    dir: './public',
    prefix: '/public',
    dynamic: true,
}))

// 路由处理
router.get("/quote", async ctx => {
    let content = fs.readFileSync("./public/quote.html")
    let url = ctx.url
    let lastPoint = url.lastIndexOf('.');
    let suffix = url.substring(lastPoint);
    ctx.set('content-type', mime[suffix] + ';charset="utf-8"');
    ctx.body = content
})

router.get("/", ctx => {
    ctx.body = "首页kkb"
})

// 使用路由
server.use(router.routes())

server.listen(8888,()=>{
    console.log("koa服务开启")
})