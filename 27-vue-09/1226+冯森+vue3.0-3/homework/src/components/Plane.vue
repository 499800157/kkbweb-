<template>
  <container>
    <sprite :texture="planeImg"></sprite>
  </container>
</template>

<script>
import planeImg from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";
export default {
  setup() {
    return {
      planeImg,
    };
  },
};

export function usePlane({ onAttack }) {
  const planeInfo = reactive({
    x: 150,
    y: 350,
    width: 200,
    height: 364,
  });

  // eslint-disable-next-line no-unused-vars
  function move() {
    const speed = 10;
    function handleMove(e) {
      switch (e.code) {
        case "ArrowUp":
          planeInfo.y -= speed;
          planeInfo.y = planeInfo.y < 0 ? 0 : planeInfo.y;
          break;
        case "ArrowDown":
          planeInfo.y += speed;
          console.log(planeInfo.y);
          planeInfo.y = planeInfo.y > 500 ? 500 : planeInfo.y;
          break;
        case "ArrowLeft":
          planeInfo.x -= speed;
          console.log(planeInfo.x);
          planeInfo.x = planeInfo.x < 0 ? 0 : planeInfo.x;
          break;
        case "ArrowRight":
          planeInfo.x += speed;
          planeInfo.x = planeInfo.x > 400 ? 400 : planeInfo.x;
          break;
        default:
          break;
      }
    }
    onMounted(() => {
      window.addEventListener("keydown", handleMove);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleMove);
    });
  }
  // 关注点分离
  function attack() {
    function handleMove(e) {
      if (e.code === "Space") {
        onAttack &&
          onAttack({
            x: planeInfo.x + 100,
            y: planeInfo.y,
          });
      }
    }
    onMounted(() => {
      window.addEventListener("keydown", handleMove);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleMove);
    }); // 当按下空格的时候
  }

  move();
  attack();

  return { planeInfo };
}
</script>
