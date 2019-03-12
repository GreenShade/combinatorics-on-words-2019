<template>
  <div>
    <h2><span>Forbidden</span> patterns</h2>
    <h4>Goal for the first player - force your opponent to write a word with threefold consequtive repetition of a segment.</h4>
    <h4>Goal for the second player - don't give in and write a word of required length!</h4>
    <button @click="$emit('start')">Start</button>
  </div>
</template>

<script>
export default {
  name: 'Start'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
}

span {
  text-decoration: underline #304ffeaa;
}

h2 {
  font-size: 48px;
}

h4 {
  font-size: 24px;
}

button {
  font-size: 60px;
  background: rgba(108, 122, 137, 0.3);
  border: none;
  text-transform: uppercase;
  border-radius: 5%;

  margin-top: 5%;
}
button:hover {
  background: #304ffeaa;
  cursor: pointer;
}
</style>
