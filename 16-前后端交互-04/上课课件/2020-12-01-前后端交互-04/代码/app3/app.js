const http = require('http');
const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const ioServer = require('socket.io');

const app = new Koa();

// 利用node内置http模块创建一个server
const httpServer = http.createServer(app.callback());

app.use( KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}) );

const router = new KoaRouter();

router.get('/data', async ctx => {
    ctx.body = 'data';
});

app.use( router.routes() );

// 构建websocket服务器
const io = ioServer(httpServer);

let sockets = [];

// socket 套接字（插座）-> client&server 链接对象，每一个socket对象就是一个客户端和服务端的链接对象
io.on('connection', socket => {
    console.log('有人通过websocket请求了', socket.id);

    sockets.push(socket);

    // 监听当前 socket 的对应事件
    socket.on('message', data => {
        console.log(socket.id, data);

        // 把某个客户端发送过来的消息转发给其它客户端
        // sockets.forEach(s => {
        //     s.emit('chat', {
        //         id: socket.id,
        //         ...data
        //     });
        // });

        let chatData = {
            id: socket.id,
            ...data
        }
        // 这个是发送给指定的socket
        socket.emit('chat', chatData);
        // 其它客户端可以统一用广播的形式
        // broadcast => 除了当前自己以外的其它socket
        // broadcast => sockets.filter(s => s != socket);
        socket.broadcast.emit('chat', chatData);
    });




});

// app.listen(8888);
httpServer.listen(8888);