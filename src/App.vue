<template>
  <div id="app">
    <Start v-if="appState === 'start'" 
           @start="appState = 'game'" />
    <Summary v-if="appState === 'win'" :winner="winner" />
    <Game v-if="appState === 'game' || appState === 'win'" 
          :config="finalConfig"
          @config="appState = 'config'" 
          @victory="victory($event)"
          @currentLength="setCurrentLength($event)"
          ref="Game"/>
    <Config v-if="appState === 'config'" @startGame="startGame($event)" :config="config" />
    <ConfigButton @config="appState = 'config'"/>
    <Restart v-if="appState === 'win'" @reset="reset()" />
    <Footer />
    <State v-if="appState === 'game' || appState === 'win'" :config="config" :currentLength="currentLength" />
  </div>
</template>

<script>
import Start from "./components/Start";
import Game from "./components/Game";
import Config from "./components/Config";
import ConfigButton from "./components/ConfigButton";
import Summary from "./components/Summary";
import State from "./components/State";
import Restart from "./components/Restart";
import Footer from "./components/Footer";

export default {
  name: 'app',
  components: {
    Start,
    Game,
    Config,
    ConfigButton,
    Summary,
    State,
    Restart,
    Footer
  }, 
  data: function() {
    return {
      appState: "start",
      currentLength: 0,
      config: {
        alphabet: "abc",
        maxLength: 10,
        delay: 500,
        firstPlayerType: "human",
        secondPlayerType: "human"
      }
    }
  },
  computed: {
    finalConfig: function() {
      return {
        alphabet: this.config.alphabet.split(""),
        desiredLength: this.config.maxLength,
        delay: this.config.delay,
        player1Strategy: this.config.firstPlayerType,
        player2Strategy: this.config.secondPlayerType
      }
    }
  },
  methods: {
    victory: function(player) {
      this.winner = player;
      this.appState = "win";
    },
    reset: function() {
      this.$refs.Game.reset();
      this.appState = "game";
      this.currentLength = 0;
    },
    startGame: function(config) {
      this.config = config;
      this.appState = "game";
    },
    setCurrentLength: function(newLength) {
      this.currentLength = newLength;
    }
  }
}
</script>

<style>
</style>
