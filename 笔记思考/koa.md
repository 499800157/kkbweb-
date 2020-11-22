# koa

```js
// koa
const Koa = require("koa")
// koa-router
const KoaRouter = require("koa-router")
// 文件操作
const fs = require("fs")
// 获取request的内容
const koaBody = require("koa-body")
// 连接数据库的模块
const mysql2 = require("mysql2")
// 模板
const nunjucks = require('nunjucks');
// 静态资源代理
const KoaStaticCache = require('koa-static-cache');
```

##　KoaRouter

```js
router.get("/register",async ctx => {

})

router.post("/register",async ctx => {

})

// 请求路径 /register/2
router.get("/register/:id(\\d+)",async ctx => {
    // 请求的参数
    console.log(ctx.params)
    // 请求路径上?后边的内容
    console.log(ctx.query.username)
})
// 请求路径 /register?username=2
router.get("/register",async ctx => {
    // 请求路径上?后边的内容
    console.log(ctx.query.username)
})




```

## koaBody

```js
// post方式请求的数据，会存入ctx.request.body里
router.post("/register",koaBody(), async ctx => {
    // ctx.request.body 请求的数据
    let { username } = ctx.request.body;
})
koaBody({
    // 设置 koaBody 能够解析 formdata 格式的数据
    multipart: true,
    // 设置上传的二进制文件的处理
    formidable: {
        // 上传的二进制文件存储在服务器中的位置
        // 上传后的文件名称是koabody自动重新命名的
        // 上传后文件名称尽量不要使用上传之前的原始文件的名称，因为会有覆盖的问题：c：1.jpg d: 1.jpg
        uploadDir: './public/items',
        keepExtensions: true
    }
})

const parsePath = require('parse-filepath');
//  数据库中存储的是文件上传以后在服务器里面的新名字
let {base: file} = parsePath(ctx.request.files.file.path);

```


## mysql2

```js
// 链接数据库
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rocky',
    database: 'kkb'
});

/* 
    操作数据库
    sql 是操作语句
    prePared 是带入的数据 数组类型
        例子：
        let sqlUser = 'SELECT `username`  FROM `users` where `username` =?'; 
        
        connection.query(
            sqlUser,
            [username],
            function(err, results, fields) {
                // 数据库的查询是异步的，数据还没有查询出来的时候，后面的代码就执行完了，后端已经返回了
                // console.log(results);
                // console.log(fields);
            }
        )
*/

connection.query(
    sql,
    prePared,
    function(err, results, fields) {
        
    }
)


// 封装一个query方法，调用时候使用 await query(sql,prePared)
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
```


## nunjucks

```js

// 配置模板引擎
nunjucks.configure('./templates', {
    watch: true,
    noCache: true
});


ctx.body = nunjucks.render('index.html', {
    // 数据
    categories,
    items,
    pages,
    page
});

```


## KoaStaticCache

```js

// 设置静态文件资源代理
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

//这种方法也可
app.use(KoaStaticCache( {
    dir:"./public",
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

```