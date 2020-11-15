const http = require("http")
const fs = require("fs")

const server = http.createServer(function(req,res){
    console.log("接收到请求")
    let url = req.url
    if(url.startsWith("/public")){
        let content = fs.readFileSync("." + url)
        res.write(content)
        res.end()
    }
    if(url.startsWith("/quote")){
        res.setHeader("content-type","text/html")
        let content = fs.readFileSync("./public/quote.html")
        res.write(content)
        res.end()
    }

    if(url === "/"){
        // 默认处理
        res.write(fs.readFileSync("./public/index.html"))
        res.end()
    }
    
})


server.listen(8888,()=>{
    console.log("服务启动")
})