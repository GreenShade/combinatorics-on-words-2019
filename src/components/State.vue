<template>
  <div>
    <table>
      <tr>
        <td><span>Alphabet</span></td>
        <td><span>{{config.alphabet}}</span></td>
      </tr>
      <tr>
        <td><span>Word length</span></td>
        <td style="width: 100px"><span>{{currentLength}} / {{config.maxLength}}</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: ["config", "currentLength"]
}
</script>

<style scoped>
div {
  position: absolute;
  right: 0;
  top: 15%;
  font-size: 20px;
  margin: 20px;
}
</style>
