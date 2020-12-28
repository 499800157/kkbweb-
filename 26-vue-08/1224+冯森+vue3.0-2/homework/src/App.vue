<template>
  
  <container>
  <Circle :x ="x"></Circle>
  </container>
</template>

<script>
import Circle from "./components/Circle";
import { onMounted, onUnmounted ,ref} from "vue";
import { game, getRootContainer } from "./game/index";
export default {
  name: "App",
  components: {
    Circle,
  },
  setup() {
    console.log(getRootContainer)
    let arrow = true;
    const x = ref(0)
    function move() {
      if (arrow) {
        x.value ++
        // getRootContainer().children[0].x++;
        if (getRootContainer().children[0].x > 725) {
          arrow = false;
        }
        } else {
        // getRootContainer().children[0].x--;
        x.value --
        if (getRootContainer().children[0].x <= 25) {
          arrow = true;
        }
      }
    }
    onMounted(() => {
      game.ticker.add(move);
    });
    onUnmounted(() => {
      game.ticker.remove(move);
    });
  return{
    x
  }
  },
};
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
