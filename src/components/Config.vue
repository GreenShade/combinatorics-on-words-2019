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
      if (this.isValid()) {
        this.$emit("startGame", this.config);
      }
    },
    isValid: function() {
      const alphabet = this.validateAlphabet();
      const maxLength = this.validateMaxLength();
      const delay = this.validateDelay();
      return alphabet && maxLength && delay;
    },
    validateAlphabet: function() {
      const {alphabet} = this.config;
      
      if (alphabet === "") {
        return this.error("Alphabet cannot be empty");
      } else if (!alphabet.match(/^[a-zA-Z0-9]*$/)) {
        return this.error("Alphabet must contain only numbers and letters");        
      } else if (alphabet.length !== new Set(alphabet.split("")).size) {
        return this.error("Alphabet cannot contain duplicates");
      }

      return this.success();
    },
    validateMaxLength: function() {
      return this.validateInteger("Max length", this.config.maxLength, 1);
    },
    validateDelay: function() {
      return this.validateInteger("Move delay", this.config.delay, 0);
    },
    validateInteger: function(name, value, min, max) {
      if (min > value) {
        return this.error(`${name} must be greater than ${min}`);
      }
      if (max < value) {
        return this.error(`${name} must be less than ${max}`);
      }
      return this.success();
    },
    error: function(text) {
      this.$toasted.show(text, {type: "error", duration: 5000})
      return false;
    },
    success: function() {
      return true;
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
