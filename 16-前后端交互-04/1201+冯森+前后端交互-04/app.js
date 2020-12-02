const Koa = require("koa")
const http = require("http")
const KoaRouter = require("koa-router")
const KoaStaticCache = require("koa-static-cache")
const KoaBody = require("koa-body")
const ioServer = require("socket.io")


const app = new Koa()
const router = new KoaRouter()
const httpServer = http.createServer(app.callback())
const io = ioServer(httpServer);

app.use(KoaStaticCache({
    dir:"./public",
    prefix:"/public",
    gzip:true,
    dynamic:true,
}))

let sockets = [];

io.on('connection', socket => {
    sockets.push(socket);
    socket.on("login", data =>{
        let userAdd = {
            id:data.id
        }
        socket.emit("userAdd",userAdd)
        socket.broadcast.emit("userAdd",userAdd)
    })

    socket.on('message', data => {
        let chatData = {
            id: socket.id,
            date: (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
            ...data
        }
        socket.emit('chat', chatData);
        socket.broadcast.emit('chat', chatData);
    })
})

// 时间格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月  
        "d+": this.getDate(), //日  
        "h+": this.getHours(), //小时  
        "m+": this.getMinutes(), //分  
        "s+": this.getSeconds(), //秒  
    }; 
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    };
    for(var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); 
        }
    }
    return fmt;
}

app.use(router.routes())
httpServer.listen(8888)