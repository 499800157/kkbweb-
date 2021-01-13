import { useMemo } from "react";

function Todo(props) {
  const {data,changeDone} = props;
  const {id,todo,done} = data;
  const toUpdater = useMemo(()=>{
    //console.log(id);
    return id+"渲染了"
  },[data]);
  console.log(id,"render");
  return <li>
      <input 
        type="checkbox" 
        checked={done} 
        onChange={({target})=>{
          changeDone(id,target.checked);
        }}
      />
      {todo} - <a>删除</a>
      <p>{toUpdater}</p>
  </li>
}

export default Todo;