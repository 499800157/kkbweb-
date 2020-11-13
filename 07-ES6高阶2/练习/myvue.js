class Vue{
    constructor(opts){
        this.$opts = opts
        this.$data = opts.data
        this.compile()
        this.observe(this.$data)
    }
    // 编译展示视图
    compile(){
        let el = document.querySelector(this.$opts.el)
        this.compileNode(el)
    }
    compileNode(ele){
        console.log(this.$data)
        // 获取元素的子节点
        let childNodes = ele.childNodes
        childNodes.forEach(node => {

            if(node.nodeType === 3){
                console.log("文本节点")
                // 文本节点
                // 开始查找{{}}语法
                let reg = /\{\{\s*([^\}\}\s]+)\s*\}\}/g;
                if(reg.test(node.textContent)){
                    console.log("有{{}}语法")
                    // $1是查找的变量
                    let $1 = RegExp.$1
                    let res = node.textContent.replace(reg, this.$data[$1]);
                    node.textContent = res
                    new Watcher(this.$data,$1,()=>{
                        console.log(23132)
                    })
                }
            }else if(node.nodeType === 1){
                // 元素节点
                // 判断元素节点上的属性
                let attrs = node.attributes;
                [...attrs].forEach((item)=>{
                    // 属性名item.name 属性值item.value
                    if(item.name === "v-model"){
                        let val = this.$data[item.value]
                        console.log(val)
                        // 观察数据是否变化
                    }
                })
                if(node.childNodes.length > 0){
                    this.compileNode(node)
                }
            }
        });
    }
    
    observe(data){
        let keys = Object.keys(data)
        keys.forEach(key=>{
            let value = data[key];
            let dep = new Dep();
            console.log(key)
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    console.log("get...");
                    if(Dep.target){
                        dep.addSub(Dep.target)
                    }
                    return value;
                },
                set(newValue){
                    console.log("set...");
                    dep.notify(newValue)
                    value = newValue
                }
            })
        })
    }
}

class Dep{
    constructor(){
        this.subs = [] 
    }
    addSub(sub){
        console.log(123)
        this.subs.push(sub)  
    }
    notify(newValue){
        console.log(this.subs)
        this.subs.forEach((sub)=>{
            sub.update(newValue)
        })
    }
}

class Watcher{
    constructor(data,key,cb){
        console.log(44)
        Dep.target = this
        console.log(Dep.target)
        data[key];
        this.cb = cb
        Dep.target = null
    }
    update(newValue){
        this.cb(newValue)
    }
}


