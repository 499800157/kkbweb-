let btnElement = document.querySelector('.btn');
let attachmentElement = document.querySelector('#attachment');
let taskBodyElement = document.querySelector('.task_body');
let contentList = document.querySelector(".content-list")
let taskPanel = document.querySelector(".task_panel")

btnElement.onclick = function() {
    attachmentElement.click();
}

attachmentElement.onchange = function() {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/save', true);
    let fd = new FormData();
    xhr.onload = function() {
        // 把后端返回的图片地址动态添加到页面中
        let header= this.getResponseHeader('content-type');
        if (header.includes('json')) {
            let data = JSON.parse(this.responseText);
            let ele = document.createElement("img")
            ele.setAttribute("src","/"+data.path)
            contentList.appendChild(ele)
        }
        taskPanel.style.display = "none"
    }
    let liElement = document.createElement('li');
    let spanElement = document.createElement('span');
    let taskProgressStatusElement = document.createElement('span');
    let progressElement = document.createElement('span');
    xhr.upload.onloadstart = function() {
        taskProgressStatusElement.classList.add('task-progress-status');
        taskProgressStatusElement.innerHTML = '开始上传……';
        progressElement.classList.add('progress');
        progressElement.style.width = '0%';

        liElement.appendChild(spanElement);
        liElement.appendChild(taskProgressStatusElement);
        liElement.appendChild(progressElement);

        taskBodyElement.appendChild(liElement);
        taskPanel.style.display = "block"
    }
    xhr.upload.onprogress = function(e) {
        let v = (e.loaded / e.total * 100).toFixed(2);
        taskProgressStatusElement.innerHTML = v + '%';
        progressElement.style.width = v + '%';
    }
    fd.append('attachment', attachmentElement.files[0]);
    xhr.send(fd);

}

// 当进入页面的时候，首先会调用 /getPhotos 接口从后端拿去到所有已经上传的图片数据，并显示在 content-list 中
window.onload = function(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/getPhotos', true);
    xhr.send();
    xhr.onload = function(){
        let header= this.getResponseHeader('content-type');
        if (header.includes('json')) {
            let data = JSON.parse(this.responseText);
            let str = ""
            data.forEach(item => {
                str += `<img  src = "/${item.path}"/>`
            })
            contentList.innerHTML = str
        }
    }

}