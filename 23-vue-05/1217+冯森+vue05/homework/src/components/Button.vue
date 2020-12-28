<template>
  <div class="btn-box">
      <button @click="btnClick">
        <slot></slot>
      </button>
  </div>
</template>

<script>
export default {
methods: {
  btnClick() {
    this.$emit("clickEvnet")
  }
},
}
</script>

<style>
.btn-box{
  display: inline-block;
}
</style>