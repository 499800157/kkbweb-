import fn1 from "./fn.js"
import logo from "./images/logo.png"
import "./css/css.css"
console.log(fn1);



let img = new Image()
img.src = logo;
document.body.appendChild(img);


let btn = document.querySelector("button");
console.log(btn);

btn.onclick = function(){
    let myname = "冯森";
    console.log(`开课吧-${myname}`);
}



