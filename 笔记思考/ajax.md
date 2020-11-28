```js

// 上传文件，文件内容改变触发
attachmentElement.onchange = function() {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/save', true);
    let fd = new FormData();
    xhr.onload = function() {
        // 把后端返回的图片地址动态添加到页面中
        let header= this.getResponseHeader('content-type');
        if (header.includes('json')) {
            // 后端返回的数据
            let data = JSON.parse(this.responseText);
        }
    }
    // 开始上传
    xhr.upload.onloadstart = function() {
    }
    // 上传过程中
    xhr.upload.onprogress = function(e) {
        let v = (e.loaded / e.total * 100).toFixed(2);
        taskProgressStatusElement.innerHTML = v + '%';
        progressElement.style.width = v + '%';
    }
    fd.append('attachment', attachmentElement.files[0]);
    xhr.send(fd);
}


```