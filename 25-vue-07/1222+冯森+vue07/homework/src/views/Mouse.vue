<template>
    <div>横坐标：{{x}}</div>
    <div>纵坐标：{{y}}</div>
</template>
<script>
import {onMounted,onUnmounted ,ref } from "vue"
function useMousePosition(){
    const x = ref(0);
    const y = ref(0);
    //第二种方式：将变量变为响应式数据
    // const position = reactive({
    //     x: 0,
    //     y: 0,
    // });
    const mousemove = (e)=>{
        // position.x = e.pageX
        // position.y = e.pageY
        x.value = e.pageX;
        y.value = e.pageY;
        console.log(x.value)
    }
    onMounted(()=>{
        window.addEventListener("mousemove",mousemove)
    })
    onUnmounted(()=>{
        window.removeEventListener("mousemove",mousemove)
    })
    // return { position }
    return{
        x,y
    }
}
export default {
    setup() {
        // let { position } = useMousePosition()
        // const { x, y } = toRefs(position)
        const { x ,y } = useMousePosition()
        return {
            x,
            y,
        };
        
    },
    
}
</script>

<style>

</style>