import { useEffect, useRef, useState } from "react";
/*
  useRef:
    1. 关联节点实例，
    2. 用来记录组件更新前的一些数据
*/  
function Child(){
  const [nub,setNub] = useState(0);
  const [index,setIndex] = useState(10);
  const pEl =  useRef();
  // 使用 useRef 记录数据时，该数据不会随着组件更新而自动更新
  const prevNub = useRef(nub);
  // useEffect(()=>{
  //   console.log(pEl);
  // })
  useEffect(()=>{
    console.log(nub,prevNub.current);
    prevNub.current = nub;
  },[nub])
  return <div>
      <p ref={pEl}>nub:{nub}</p>
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