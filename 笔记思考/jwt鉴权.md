
## 后端的处理

```js

const jwt = require("koa-jwt")
const jsonwebtoken = require("jsonwebtoken");

//秘钥
const secret = 'kkb';

/*
    使用jwt中间件
    unless path是指不受鉴权控制的路径
*/
app.use(jwt({ secret }).unless({ path: [/^\/public/, /^\/login/] }));


/*
    sign是对payload的签名，通过secret秘钥加密
    payload是用户信息
    Authorization 是双方定义的key
*/
let payload = {
    id:res[0].id,
    username:res[0].username
};
ctx.set('Authorization', jsonwebtoken.sign(payload, secret));

/*
// 鉴别是否有权限
ctx.state.user 如果有则有权限 
*/
if(ctx.state.user){
    // 有权限
}


```

## 前端的处理

```js
// 登录时将用户信息发送至后端，后端返回一个用户信息的签名
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringify(userLoginInfo));


    // 登录时后端返回
 xhr.onload = function () {
    //  获取用户
    authorizationData = xhr.getResponseHeader('Authorization');
    if (authorizationData) {
        localStorage.setItem('authorizationData', authorizationData);
        let header = this.getResponseHeader('content-type');
        if (header.includes('json')) {
            let data = JSON.parse(this.responseText);
        }
    } else {
        alert(xhr.responseText)
    }
}

// 请求数据时 需要将本地存储的key(authorizationData)带入请求头去请求，后端会验证这个key
let auth = localStorage.getItem('authorizationData');
if (auth) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
}
xhr.send()

```