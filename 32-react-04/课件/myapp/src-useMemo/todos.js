import Todo from "./todo";
function Todos(props) {
  const {data} = props;
  return <ul>{data.map(item=><Todo {...props} key={item.id} data={item} />)}</ul>
}

export default Todos;