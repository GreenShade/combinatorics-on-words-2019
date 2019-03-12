<template>
  <div>
    <label for="alphabet">Alphabet </label><input name="alphabet" v-model="config.alphabet" /><br />
    <label for="maxLength">Max length </label><input name="maxLength" type="number" v-model="config.maxLength" /><br />
    <label for="delay">AI move delay </label><input name="delay" type="number" v-model="config.delay" /><br />
    <label for="strategy1">Player 1 strategy </label>
    <select name="strategy1" v-model="config.firstPlayerType">
      <option>human</option>
      <option>ai</option>
    </select>
    <br />
    <label for="strategy2">Player 2 strategy </label>
    <select name="strategy2" v-model="config.secondPlayerType">
        <option>human</option>
        <option>ai</option>
      </select>
      <br />
    <button @click="startGame">Start</button>
  </div>
</template>

<script>
export default {
  name: "Config",
  props: ["config"],
  methods: {
    startGame: function() {
      this.$emit("startGame", this.config);
    }
  }
}
</script>

<style scoped>
label {
  box-sizing: border-box;
  display: inline-block;
  width: 60%;
  text-align: right;
  margin-bottom: 10px;
  padding-right: 10px;
}

input {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  background: transparent;
  border: solid black 1px;
  width: 35%;
}

select {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  background: transparent;
  border: solid black 1px;
  width: 35%;
  box-sizing: border-box;
}

button {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  width: 100%;
  background: rgba(108, 122, 137, 0.5);
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #304ffe66;
}

div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
}
</style>
