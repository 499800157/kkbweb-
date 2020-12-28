<template>
  <button @click="removeMouse">销毁组件</button>
  <button @click="showMouse">展示组件</button>
  <Mouse v-if = "isShow"></Mouse> 
</template>

<script>
import Mouse from './views/Mouse'

export default {
  name: 'App',
  components: {
    Mouse
  },
  data() {
    return {
      isShow:true
    }
  },
  methods: {
        removeMouse(){
          this.isShow = false
        },
        showMouse(){
          this.isShow = true
        }
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
