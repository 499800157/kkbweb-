import { useEffect, useState } from "react";
function useScroll() {
   const [y,setY] = useState(window.scrollY);
   useEffect(()=>{
     window.onscroll = function() {
       setY(window.scrollY);
     } 
     return ()=>{
      window.onscroll = null;
     }
   },[])
   return [y,(newY)=>{
      window.scrollTo(0,newY);
      setY(newY);
   }]; 
}

export {useScroll};