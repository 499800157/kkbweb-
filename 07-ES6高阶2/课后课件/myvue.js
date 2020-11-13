class Vue extends EventTarget{
    constructor(options) {
        super();
        this.$options = options;
        this.$data = options.data;
        this.observe(this.$data);
        this.compile();
    }
    observe(data){
        // 数据劫持
        let keys = Object.keys(data);
        //  data[key] ---> get ---> data[key]
        // data[key] --->get
        keys.forEach(key=>{
            let value = data[key];
            let _this = this;
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    console.log("get...");
                    // return data[key];
                    return value;
                },
                set(newValue){
                    console.log("set...");
                    // 触发编译渲染视图
                    _this.dispatchEvent(new CustomEvent(key,{
                        detail:newValue
                    }));
                    // 渲染视图；
                    value = newValue;
                }
            })
        })
    }

    compile() {
        let ele = document.querySelector(this.$options.el);
        // console.log(ele);
        this.compileNodes(ele);
    }
    compileNodes(ele){
        let childNodes = ele.childNodes;
        [...childNodes].forEach(node => {
            // console.log(node);
            if (node.nodeType === 3) {
                // console.log("文本",node.textContent);
                // 查找大胡子语法；
                // 正则表达式查找大胡子语法；{{mydata}}
                let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
                if (reg.test(node.textContent)) {
                    console.log("有大胡子语法");
                    let $1 = RegExp.$1;
                    // $1  --->messgae
                    // console.log(this.$data[$1]);
                    // console.log($1,RegExp.$2)
                    let res = node.textContent.replace(reg, this.$data[$1]);
                    //   console.log(res);
                    node.textContent = res;
                    // 编译视图；
                    this.addEventListener($1,e=>{
                        // console.log("设置了",e.detail);
                        let newValue = e.detail;
                        let oldValue = this.$data[$1];
                        let reg = new RegExp(oldValue);
                        node.textContent = node.textContent.replace(reg,newValue);
                    })
                }
            } else if (node.nodeType === 1) {
                // console.log("元素标签");
                if(node.childNodes.length>0){
                    this.compileNodes(node);
                }
            }
        })
    }


}