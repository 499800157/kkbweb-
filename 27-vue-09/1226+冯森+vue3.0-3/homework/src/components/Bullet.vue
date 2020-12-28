<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";
import bulletImg from "../assets/bullet.png";
import { game } from "../game";
export default {
  setup() {
    return {
      bulletImg,
    };
  },
};

export function useBullets() {
  const width = 61;
  const height = 99;
  const bullets = reactive([]);

  function addBullet({ x, y }) {
    bullets.push({ x, y, width, height });
  }

  function move() {
    const speed = 10;
    const handleTicker = () => {
      bullets.forEach((bullet, index) => {
        bullet.y -= speed;
        // todo  作业
        if (bullet.y < 0) {
          bullets.splice(index, 1);
        }
      });
    };

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
  }

  move();

  return {
    addBullet,
    bullets,
  };
}
</script>

<style lang="scss" scoped></style>
