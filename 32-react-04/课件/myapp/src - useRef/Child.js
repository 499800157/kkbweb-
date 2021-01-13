import { useEffect, useRef, useState } from "react";
/*
  useRef:
    1. 关联节点实例，
    2. 用来记录组件更新前的一些数据
*/  
function Child(){
  const [nub,setNub] = useState(0);
  const [index,setIndex] = useState(10);
  const isMount = useRef(true);
  useEffect(()=>{
      console.log("组件挂载完执行");
      return ()=>{
        console.log("组件即将卸载执行");
      }
  },[]);
  useEffect(()=>{
    console.log("组件挂载完或更新完都执行");
  })
  useEffect(()=>{
    console.log("组件挂载完或nub有变化引起的更新更新完都执行");
  },[nub]);
  useEffect(()=>{
    if(!isMount.current){
      console.log("组件更新完成");
    } else {
      console.log("mounted");
      isMount.current = false;
    }
  })
  return <div>
      <p>nub:{nub}</p>
      <button onClick={()=>{
        setNub(nub+1);
      }}>nub递增</button>
      <p>index:{index}</p>
      <button onClick={()=>{
        setIndex(index+2);
      }}>index递增</button>
  </div>
}

export default Child;