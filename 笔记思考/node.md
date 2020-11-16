# 总结

## 从浏览器输入 URL 到页面展示过程的过程中发生了什么？

##　WebServer 本质上就是一个软件，一个用来处理网络数据交互的程序，它可以用任何具备网络编程的语言来实现

## 基于 Node.js 构建 WebServer(既可以当服务端，又可以当客户端)

## 创建 WebServer

## 端口的意义（一台主机的网卡数量是有限的，不可能为主机上的每一个程序去安装一个网卡）

## 端口监听

## 处理用户请求（`server` 会提供一些的事件，我们通过 Node.js 内置的 `on` 方法来监听这些事件）

## request 事件

```js

    server.on('request', () => {
        console.log('有客户端发送了一个请求');
    });

    // 我们还可以在 `http.createServer` 的时候传入一个 `callback` 参数，这个 `callback` 就是 `request` 事件的回调函数。
    在 `request` 事件回调函数中会自动传入两个参数，供我们进行后续的业务逻辑调用：

        const server = http.createServer((req,res) => {
        console.log('有客户端发送了一个请求');
        });
        req :　- http.IncomingMessage：一个 Node.js 封装好的对象，与当前请求的客户端相关信息（客户端请求提交的数据，IP等）和方法都是通过该对象来完成。
        res : - http.ServerResponse：也是一个 Node.js 封装好的对象，提供了服务端信息和方法，比如向客户端发送数据的方法就由该对象提供。

```

## http.IncomingMessage 对象

一个 Node.js 封装好的对象，与当前请求的客户端相关信息（客户端请求提交的数据，IP等）和方法都是通过该对象来完成。

一些常用属性和方法：

- url: 当前客户端请求的 url，http://域名:端口 后面的部分，不包含 http://域名:端口。
- headers: 当前客户端请求携带的头信息数据。
- method: 当前客户端所使用的请求方法。
- httpVersion：当前客户端请求所使用的 http 协议的版本。
- on():  监听一些事件。


### http.ServerResponse

也是一个 Node.js 封装好的对象，提供了服务端信息和方法，比如向客户端发送数据的方法就由该对象提供。

一些常用的属性和方法：

- write(chunk[, encoding][, callback])：服务端发送数据给客户端的方法，但是需要调用end方法来结束当前请求。
- end([data[, encoding]][, callback])：与write类似。
- setHeader(name, value): 设置发送给客户端的额外信息（头信息）。
- statusCode：响应状态码。
- statusMessage：响应状态码对应的文本。
- writeHead(statusCode[, statusMessage][, headers])：与 end 类似，注意：调用 writeHead 以后不能在进行头信息设置了。



## 静态资源 Vs 动态资源

## 头信息

## Content-Type


