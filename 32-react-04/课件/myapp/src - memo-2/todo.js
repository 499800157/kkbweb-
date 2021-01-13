import { memo } from "react";
/*
  memo 高阶组件:
    传入一个组件，返回一个新的组件
*/
function Todo(props) {
  const {data,changeDone} = props;
  const {id,todo,done} = data;
  console.log(id);
  return <li>
      <input 
        type="checkbox" 
        checked={done} 
        onChange={({target})=>{
          changeDone(id,target.checked);
        }}
      />
      {todo} - <a>删除</a>
  </li>
}
// const newTodo = memo(Todo);
// console.log(newTodo);
export default memo(Todo,(props1,props2)=>{
    //console.log(props1,props2);
    return props1.data === props2.data;
});