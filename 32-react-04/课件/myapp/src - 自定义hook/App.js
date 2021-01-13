import { useEffect, useRef } from "react";
import { useScroll } from "./useScroll";
function App() {
  const [scrollY,setScrollY] = useScroll();
  const spanEl = useRef();
  useEffect(()=>{
    if(scrollY>window.innerHeight){
      spanEl.current.style.display = "block";
    } else {
      spanEl.current.style.display = "none";
    }
  },[scrollY])
  return <div>
      <style>
        {
          `
            .box{
              width: 200px;
              height: 200px;
              background: red;
              font: 50px/200px "宋体";
              color: #fff;
              border: 2px solid #fff;
            }
            span {
              position: fixed;
              left: 0;
              top: 50%;
              width: 100px;
              font: 20px/40px "宋体";
              background: #000;
              color: #fff;
              text-align: center;
            }
          `
        }
      </style>
      {[...(".".repeat(30))].map((item,index)=><div className="box" key={index}>{index}</div>)} 
      <span ref={spanEl} onClick={()=>{
        setScrollY(0);
      }}>{scrollY}</span>
  </div>;
}

export default App;
