class Jq {
  constructor(args,root){
    if(root){
      this['prevObj'] = root
    }
    // 判断opts的类型，
    // 当是字符串的时候 , 是选择器
    if(typeof args === "string"){
      let eles = document.querySelectorAll(args)
      this.addEles(eles)
    }else if(typeof args === "function"){
      // 传入的是一个函数，
      document.addEventListener("DOMContentLoaded",args)
    }else{
      // $(document.querySelector(".box1")).
      if(typeof args.length === "undefined"){
        // 对象处理，对象一般没有length属性
        this[0] = args
        this.length = 1
      }else{  
        //数组
        this.addEles(args)
      }
    }
  }
  // 将元素添加到this身上
  addEles(eles){
    eles.forEach((element,i) => {
      this[i] = element
    });
    this.length = eles.length
  }
  click(fn){
    for(let i = 0 ; i<this.length ; i++){
      this[i].addEventListener("click",fn)
    }
  }
  on(eventName , fn){
    // eventName => "click mouseover"
    let eventNameArr = eventName.split(" ")
    for(let i = 0 ; i<this.length ; i++){
      for(let j = 0 ; j< eventNameArr.length ; j++ ){
        this[i].addEventListener(eventNameArr[j],fn)
      }
    }
  }

  eq(index){
    return new Jq(this[index],this)
  }
  end(){
    return this['prevObj']
  }
  css(...args){
    // 存在一个参数和多个参数的情况
    // css("with")
    // css("with","300px")
    // css({"width":"300px"})

    if(args.length === 1){
      if(typeof args === "object"){
        for(let i in this){
          for(let j in args){
            this[i].setStyle(this[i],j,args[j])
          }
        }
      }else{
        return this.getStyle(this[0],args[0])
      }
    }else{
      for(let i in this){
        this.setStyle(this[i],args[0],args[1])
      }
    }
  }
  getStyle(ele,attr){
    return window.getComputedStyle(ele,null)[attr]
  }
  setStyle(ele,attr,newValue){
    if(typeof newValue === "number"){
      if(!(attr in $.cssNumber)){
        newValue = newValue + "px"
      }
    }
    ele.style[attr] = newValue
  }

}

function $(args){
  return new Jq(args)
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