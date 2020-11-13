

class Jq {
    constructor(args,root) {
        // 上次操作节点；root
        if(typeof root === "undefined"){
            this['prevObj'] = [document];
        }else{
            this['prevObj'] = root;
        }
        // 获取元素
        // this.ele = document.querySelector(args);
        // this.elels = document.querySelectorAll(args);
        // this[0] = ele1 this[1] = ele2 
        // let eles = document.querySelectorAll(args);
        // this.addEles(eles);
        // console.log(this);

        if (typeof args === "string") {
            // $(".box1")
            let eles = document.querySelectorAll(args);
            this.addEles(eles);
        } else if (typeof args === "function") {
            // $(function(){
            //     console.log("ready");
            // })
            document.addEventListener("DOMContentLoaded",args);

        } else {
            // $(document.querySelector(".box1")).
            if(typeof args.length === "undefined"){
                // 对象
                this[0] = args;
                this.length = 1;
            }else{
                // 数组；
                this.addEles(args);
            }
        }   

    }
    addEles(eles) {
        for (let i = 0; i < eles.length; i++) {
            this[i] = eles[i];
        }
        this.length = eles.length;
    }
    click(cb) {
        // 绑定事件；
        // this.ele.addEventListener("click",cb);
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", cb);
        }
    }
    on(eventName, cb) {
        // console.log("on..")
        // 多个元素  多个事件处理
        let eventNameArr = eventName.split(" ");
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < eventNameArr.length; j++) {
                console.log(this[i]);
                this[i].addEventListener(eventNameArr[j], cb);
            }
        }
    }   
    eq(index){
        // console.log(new Jq(this[index]));
        // 原生js对象；返还jq对象；
        // return this[index];
        // return this; (box1,box2)
        return new Jq(this[index],this);  // (一个元素 box2)
        // 1.返还this； 2. 返还新的实例化对象；
    }
    end(){
        return this['prevObj'];
    }
    css(...args){
        if(args.length===1){
            if(typeof args[0] === "string"){
                // 获取样式
              return this.getStyle(this[0],args[0]);
            }else{
                // 对象  多个元素设置 多个样式
                for(let i=0;i<this.length;i++){
                    for(let j in args[0]){
                        this.setStyle(this[i],j,args[0][j]);
                    }
                }
            }
        }else{
            // css("background","yellow");
            // 设置样式；多个元素设置一个样式
            for(let i=0;i<this.length;i++){
                this.setStyle(this[i],args[0],args[1]);
            }
        }
    }
    getStyle(ele,styleName){
        return window.getComputedStyle(ele,null)[styleName];
    }
    setStyle(ele,styleName,styleValue){
        if(typeof styleValue === "number"){
            if(!$.cssNumber[styleName]){
                styleValue = styleValue + "px";
            }
        }
        ele.style[styleName] = styleValue;
    }
}


function $(args) {
    // return {
    //     click(cb){
    //         console.log("执行了click方法 ");
    //         document.querySelector(args).addEventListener("click",cb);
    //     }
    // }
    return new Jq(args);
}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

// export default $ ;