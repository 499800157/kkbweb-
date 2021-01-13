import { useState,memo } from "react";
function Child({name,nub,setNub}) {
  console.log(name,"render");
  return <div>
      <p>{name}:{nub}</p>
      <button onClick={()=>{
          setNub(nub+1);
      }}>递增</button>
  </div>
}
const NewChild = memo(Child,(prevProps,props)=>{
  console.log(prevProps.nub,props.nub,prevProps.nub !== props.nub);
  return prevProps.nub === props.nub; // 为 true 不更新子组件，false 更新子组件
});
/*
  memo 作用:
    调用 memo 方法，要传入一个组件，memo 会返回一个新的组件（高阶组件） 
    调用 memo 返回的组件时，memo 内部会调用我们传入的组件
    在 memo 父组件更新时，memo 会进行 prevProps 和 当前的 props 的浅对比，如果对比结果为 true 则不更新 子组件
*/
function App() {
  const [nub,setNub] = useState(1);
  const [index,setIndex] = useState(2);
  return <div>
    <NewChild name={"nub"} nub={nub} setNub={setNub} />
    <NewChild name={"index"} nub={index} setNub={setIndex} />
  </div>;
}

export default App;
