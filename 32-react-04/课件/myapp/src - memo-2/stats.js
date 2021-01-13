function Stats(props) {
    const {data} = props;
    function doneLen() {
        //console.log("获取doneLen");
       return data.filter(item=>item.done).length; 
    }
    function unDoneLen() {
      return data.filter(item=>(!item.done)).length; 
   }
    return <p>汇总: 当前已完成{doneLen()}项，未完成{unDoneLen()}项</p>
}
export default Stats;