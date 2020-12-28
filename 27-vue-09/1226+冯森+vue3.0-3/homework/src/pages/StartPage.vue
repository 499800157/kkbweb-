<template>
  <container>
    <sprite :texture="startPageImg" ref="startPage" width="600"></sprite>
    <sprite
      :texture="startBtnImg"
      x="150"
      y="514"
      @click="toGame"
      :interactive="true"
    ></sprite>
  </container>
</template>

<script>
import startPageImg from "../assets/start_page.jpg";
import startBtnImg from "../assets/startBtn.png";
import { ref, onMounted } from "vue";
export default {
  setup(props, { emit }) {
    // 没有 this this.$emit
    function toGame() {
      console.log("toGame");
      emit("change-page", "GamePage");
    }

    const startPage = ref(null);

    onMounted(() => {
      console.log(startPage);
    });

    return {
      startPage,
      startPageImg,
      startBtnImg,
      toGame,
    };
  },
};
</script>

<style></style>
