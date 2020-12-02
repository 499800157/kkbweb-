axios


```js
    基本使用：
        axios({
        method: 'post',
        url: '/user/12345',
        data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }
    });


```


可以运行在浏览器也可以运行在node环境下
axios会根据环境判断做适配
    如果是浏览器则调用XMLHttpRequests对象
    如果是node则调用http模块
    支持promise的api
    会拦截请求和响应（intercept）
    对请求数据和响应数据的转换
    取消请求
    自动转换json数据
    支持XSRF的安全性的处理
基于promise的



```js
也可以创建一个通用的请求

axios.create([config]) 
根据基础的配置生成一个axios对象
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});


```


```js

// 请求的参数

1. 对请求的数据进行数据转换
transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
 
    return data;
  }],

2. 对响应的数据进行转换
 transformResponse: [function (data) {
    // Do whatever you want to transform the data
 
    return data;
  }],

3. 带到url上的参数 URLSearchParams object 也就是我们说的queryString
  params: {
    ID: 12345
  },

4. 对params的解析处理 负责序列化params
 paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

5. 通过正文发送的 一般用于 request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
data: {
    firstName: 'Fred'
  },

6.也可以字符串写法
  
  data: 'Country=Brasil&City=Belo Horizonte',

7. 做跨域设置的 是否带cookie

withCredentials: false, // default

8. 适配器 适配浏览器和node环境的处理，如果你想用fetch也可以在这里做处理
adapter ：function （config ）   { 
    / *  ...  * /
  } 

  9.
  responseType: 'json',

  10
   responseEncoding: 'utf8', // default

   xsrfCookieName: 'XSRF-TOKEN', // default

11. 上传进度 
   onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
 
  下载进度
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  12  最大响应的内容大小
  maxContentLength: 2000,

  13. 最大请求内容的大小
   maxBodyLength ：2000 ，
```