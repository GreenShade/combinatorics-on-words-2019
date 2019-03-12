<template>
  <i class="fa fa-cog fa-5x" @click="$emit('config')"></i>
</template>

<script>
export default {
  name: "ConfigButton"
}
</script>

<style scoped>
i {
  font-size: 96px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 40px;
  z-index: 1000;
  cursor: pointer;
}
</style>
