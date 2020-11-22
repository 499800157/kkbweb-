const Koa = require("koa")
const KoaRouter = require("koa-router")
const fs = require("fs")
const koaBody = require("koa-body")
const mysql2 = require("mysql2")

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    // 数据库口令
    password: 'rocky',
    database: 'kkb'
});

function query(sql,prePared){
    return new Promise((resolve , reject) =>{
        connection.query(
            sql,
            prePared,
            function(err, results, fields) {
                if(err){
                    reject(err)
                }else{
                    resolve([results,fields]);
                }
            }
        )
    })
}
let server = new Koa()
let router = new KoaRouter()
// 用户列表
router.get("/",async ctx => {
    let sqlUsers = 'SELECT *  FROM `users`'; 
    let [con] = await query(sqlUsers);
    let str = `
    <p><a href ='/register'>去注册</a></p>
    <h2>用户列表</h2>
    <ul>`
    for(let i in con){
        str += `<li>${con[i].username}</li>`
    }
    str += "</ul>"
    ctx.body = str
}) 

// 注册页面
router.get("/register",async ctx => {
    let content = fs.readFileSync("./public/register.html")
    ctx.set('content-type', 'text/html;charset="utf-8"');
    ctx.body = content
})

// 处理注册请求
router.post("/register",koaBody(), async ctx => {
    // ctx.request.body 请求的数据
    let { username } = ctx.request.body;
    if(!username){
        ctx.body = `<span>用户名不能为空！</span><a href="/register">重新注册</a>`
    }else{
        let sqlUser = 'SELECT `username`  FROM `users` where `username` =?'; 
        let [con] = await query(sqlUser,[username]);
        if(con.length > 0){
            ctx.body = `<p>注册失败,该用户已经被注册！</p> <a href="/register">重新注册</a> | <a href="/">返回首页</a>`
        }else{
            // 添加用户数据
            let [res] = await query(
                "INSERT INTO `users` (`username`) VALUES (?)",
                [username]
            );
            if(res.warningStatus === 0){
                ctx.body = `<p>注册成功</p> <a href="/register">继续注册</a> | <a href="/">返回首页</a>`
            }else{
                ctx.body = `<p>注册失败，错误码:${res.warningStatus}</p> <a href="/register">重新注册</a> | <a href="/">返回首页</a>`
            }
        }
    }
})

server.use(router.routes())

server.listen(8888,()=>{
    console.log("服务启动")
})

