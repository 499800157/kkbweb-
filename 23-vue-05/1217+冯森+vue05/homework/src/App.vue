<template>
  <div id="app">
    <ShowCount :count = "count"></ShowCount>
    <Button @clickEvnet="add">增加</Button> |
    <Button @clickEvnet="reduce">减少</Button>
  </div>
</template>

<script>
import ShowCount from './views/ShowCount'
import Button from "./components/Button"

export default {
  name: 'App',
  components: {
    ShowCount,
    Button
  },
  computed:{
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    add() {
      this.$store.commit("increment",this.count)
    },
    reduce(){
      this.$store.commit("decrement",this.count)
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
