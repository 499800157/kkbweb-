class Vue{
    constructor(opts){
        this.$options = opts
        this.$data = opts.data
        this.observe(opts.data)
        this.compile()
    }

    compile(){
        let ele = document.querySelector(this.$options.el)
        this.compileNodes(ele)
    }

    compileNodes(ele){
        let childNodes = ele.childNodes
        ;[...childNodes].forEach((node)=>{
            if(node.nodeType === 1){
                // 元素节点
                let attrs = node.attributes
                ;[...attrs].forEach((attr)=>{
                    console.log(attr)
                    let key = attr.name
                    let val = attr.value
                    if(key === "v-model"){
                        node.value = this.$data[val]
                        new Watcher(this.$data,val,(newValue)=>{
                            node.value = newValue
                        })
                        node.addEventListener("input",(e)=>{
                            this.$data[val] = e.target.value
                        })
                    }else if(key === "v-html"){
                        node.innerHTML = this.$data[val]
                        new Watcher(this.$data,val,(newValue)=>{
                            node.innerHTML = newValue
                        })
                    }else if(key === "v-text"){
                        node.innerText = this.$data[val]
                        new Watcher(this.$data,val,(newValue)=>{
                            node.innerText = newValue
                        })
                    }
                })
                
                if(node.childNodes.length > 0){
                    this.compileNodes(node)
                }
            }else if(node.nodeType === 3){
                // 文本节点
                let reg = /\{\{\s*([^\}\}\s]+)\s*\}\}/g;
                // 判断是否有{{}}语法
                if(reg.test(node.textContent)){
                    let $1 = RegExp.$1
                    node.textContent = node.textContent.replace(reg,this.$data[$1])

                    new Watcher(this.$data,$1,(newValue)=>{
                        let oldValue = this.$data[$1]
                        let reg = RegExp(oldValue)
                        node.textContent = node.textContent.replace(reg,newValue)
                    })
                }
            }
        })
    }
    observe(data){
        // 1. 通过Object.defineProperty实现
        let keys = Object.keys(data)
        keys.forEach((key)=>{
            let value = data[key]
            let dep = new Dep()
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    if(Dep.target){
                        dep.addSub(Dep.target)
                    }
                    console.log("...get")
                    return value
                },
                set(newValue){
                    console.log("...set")
                    dep.notify(newValue)
                    value = newValue
                }
            })
        })
    }
}


class Dep {
    constructor(){
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(newValue){
        this.subs.forEach((sub)=>{
            sub.update(newValue)
        })
    }
}

class Watcher{
    constructor(data,key,cb){
        Dep.target = this;
        data[key]
        ;this.cb = cb
        Dep.target = null
    }
    update(newValue){
        this.cb(newValue)
    }
}