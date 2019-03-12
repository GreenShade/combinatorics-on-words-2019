<template>
  <div>
    <span>Player {{winner}}</span> has won!
  </div>
</template>

<script>
export default {
  name: "Word",
  props: ["winner"]
}
</script>

<style scoped>
div {
  font-size: 48px;
  margin-top: 10%;
}

span {
  color: #304ffecc;
}
</style>
