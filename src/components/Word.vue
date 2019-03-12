<template>
  <div>
    <span v-for="(letter, index) in word" 
          :key="index"
          :class="{
            space: letter.space, 
            chosen: letter.chosen, 
            player1: player === 1,
            finished: player === 0,
            pattern1: letter.pattern === 1,
            pattern2: letter.pattern === 2,
            pattern3: letter.pattern === 3
          }"
          @click="clicked(index)">{{letter.value}}</span>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: ["word", "player"],
  methods: {
    clicked: function(index) {
      if (this.word[index].space) {
        this.$emit("choosePlace", index);
      }
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  text-align: center;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

span {
  font-size: 48px;
}

.player1.space:hover {
  text-decoration: underline rgba(108, 122, 137, 1.0);
  cursor: pointer;  
}

.space {
  text-decoration: underline rgba(108, 122, 137, 0.5);
}

.chosen {
  text-decoration: underline  #304ffe;
}

.finished {
  text-decoration: none;
}

.pattern1 {
  text-decoration: underline #304ffeaa;
}

.pattern2 {
  text-decoration: underline #304ffeaa;
}

.pattern3 {
  text-decoration: underline #304ffeaa;
}
</style>
