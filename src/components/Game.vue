<template>
  <div>
    <p v-if="currentPlayer == 1">Choose position for second player!</p>
    <p v-if="currentPlayer == 2">Type a letter!</p>
    <Word :word="word" :player="currentPlayer" @choosePlace="choosePlace($event)" />
  </div>
</template>

<script>
import {initWord, letter, space} from "../game/logic";
import algo from "../game/algorithm";
import Word from "./Word";

export default {
  name: "Game",
  props: ["config"],
  components: {
    Word
  },
  data: function() {
    return {
      currentPlayer: 1,
      word: initWord()
    }
  },
  methods: {
    choosePlace: function(index) {
      if (this.currentPlayer != 1) return;
      
      this.word[index].chosen = true;
      this.currentPlayer = 2;

      this.verify();

      if (this.config.player2Strategy === "ai") {
        setTimeout(() => this.nextLetter(this.config.alphabet[Math.floor(Math.random() * this.config.alphabet.length)]), this.config.delay);
      }
    },
    nextLetter: function(key) {
      if (this.currentPlayer != 2) return;

      const index = this.findChosen();

      this.word.splice(index, 0, letter(key));
      this.word.splice(index, 0, space());

      this.currentPlayer = 1;
      this.resetChosen();

      this.verify();

      if (this.config.player1Strategy === "ai") {
        setTimeout(() => this.choosePlace(2 * Math.floor(Math.random() * (this.word.length / 2))), this.config.delay);
      }
    },
    resetChosen: function() {
      this.word.forEach(x => x.chosen = false);
    },
    findChosen: function() {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i].chosen) return i;
      }
      return -1;
    },
    verify: function() {
      const wordLength = this.word.length / 2;
      const result = algo(this.getWord());

      if (result.start !== undefined) {
        this.$emit("victory", 1);
        this.currentPlayer = 0;

        for (let i = 0; i < result.length; i++) {
          if (i != 0) {
            this.word[(result.start + 0 * result.length + i) * 2].pattern = 1;
            this.word[(result.start + 1 * result.length + i) * 2].pattern = 2;
            this.word[(result.start + 2 * result.length + i) * 2].pattern = 3;
          }
          this.word[(result.start + 0 * result.length + i) * 2 + 1].pattern = 1;
          this.word[(result.start + 1 * result.length + i) * 2 + 1].pattern = 2;
          this.word[(result.start + 2 * result.length + i) * 2 + 1].pattern = 3;
        }
      } else if (wordLength >= this.config.desiredLength) {
        this.$emit("victory", 2);
        this.currentPlayer = 0;
      }
    },
    getWord: function() {
      let result = "";
      
      for (let i = 1; i < this.word.length; i += 2) {
        result += this.word[i].value;
      }

      return result;
    },
    reset: function() {
      const config = this.props;

      this.currentPlayer = 1;
      this.word = initWord();
      this.resetChosen();

      this.firstMove();
    },
    firstMove: function() {
      if (this.config.player1Strategy === "ai") {
        setTimeout(() => this.choosePlace(2 * Math.floor(Math.random() * (this.word.length / 2))), 0);
      }
    }
  },
  mounted: function() {
    const vm = this;
    
    window.addEventListener("keyup", function(event) {
      if (vm.currentPlayer == 1) return;

      const key = event.key.toLowerCase();
      if (key.length == 1 && vm.config.alphabet.indexOf(key) != -1) {
        vm.nextLetter(key);
      }
    });

    this.firstMove();
  }
}
</script>

<style scoped>
p {
  font-size: 24px;
  margin-top: 10%;
}
</style>
