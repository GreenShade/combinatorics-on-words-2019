<template>
  <i class="fa fa-undo fa-9x" @click="$emit('reset')"></i>
</template>

<script>
export default {
  name: "Restart"
}
</script>

<style scoped>
i {
  font-size: 96px;
  z-index: 1000;
  cursor: pointer;

  position: absolute;
  bottom: 0;
  margin-bottom: 20vh;

  transform: translate(-50%, -50%);
}
</style>
