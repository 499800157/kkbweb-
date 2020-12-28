<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";
import enemyImg from "../assets/enemy.png";
import { game } from "../game";
export default {
  setup() {
    return {
      enemyImg,
    };
  },
};

export function useEnemyPlane() {
  // todo 自动创建敌军
  const width = 300;
  const height = 207;
  const enemyPlanes = reactive([
    // {
    //   x: 55,
    //   y: 55,
    //   width,
    //   height,
    // },
    // {
    //   x: 90,
    //   y: 120,
    //   width,
    //   height,
    // },
  ]);

  // eslint-disable-next-line no-unused-vars
  function move() {
    const speed = 5;
    const handleTicker = () => {
      enemyPlanes.forEach((enemy, index) => {
        enemy.y += speed;

        if (enemy.y >= 666) {
          // 怎么移除呢？
          // mvvm
          // 移除敌军
          enemyPlanes.splice(index, 1);
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
  //生成敌军
  function createData() {
    function createItem() {
      let x = Math.floor(Math.random() * 600);
      let y = -Math.floor(Math.random() * 300);
      let item = {
        x,
        y,
        width,
        height,
      };
      enemyPlanes.push(item);
    }
    setInterval(createItem, 1000);
  }

  createData();
  move();

  return {
    enemyPlanes,
  };
}
</script>
