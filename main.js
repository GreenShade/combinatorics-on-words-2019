Vue.component("app-letter", {
  props: ["value", "state"],
  template: `
    <span class="letter" v-bind:class="{remove: state == 'toRemove'}">{{ value }}</span>
  `
});

Vue.component("app-text", {
  props: ["moves"],
  template: `
    <div class="wrapped">
      <app-letter v-for="(move, index) in moves" 
                  v-if="move.state != 'hide'" 
                  v-bind:key="index" 
                  v-bind:value="move.key" 
                  v-bind:state="move.state" />
      <span class="blinking letter">_</span>
    </div>
  `
});

function getWord(moves) {
  let word = "";
  moves.forEach(element => {
    if (element.state == "show")
      word += element.key;
  });
  return word;
}

function transform(moves, reduceLength) {
  let toRemove = reduceLength * 2;
  for (let i = moves.length - 1; i >= 0; i--) {
    if (toRemove > 0 && moves[i].state == "show") {
      moves[i].state = "toRemove";
      toRemove--;
    } else if (moves[i].state == "toRemove") {
      moves[i].state = "hide";
    }
  }

  return moves;
}

function stateTransform(state) {
  const word = getWord(state.moves);
  const reduceLength = reduce(word);
  const transformedMoves = transform(state.moves, reduceLength);

  return {
    moves: transformedMoves
  };
}

function duplicatedSuffix(string, len) {
  const latter = i => string.length - 1 - i ;
  const former = i => latter(i) - len;

  for (let i = 0; i < len; i++) {
    if (string[former(i)] != string[latter(i)])
      return false;
  }
  return true;
}

function reduce(string) {
  let longest = 0;
  for (let i = 2; i * 2 <= string.length; i++) {
    if (duplicatedSuffix(string, i)) {
      longest = i;
    }
  }
  return longest;
}

function playerOneWins(state, config) {
  return getWord(state.moves).length >= config.maxLength;
}

function playerTwoWins(state, config) {
  return state.moves.length >= config.maxMoves;
}

function gameEnd(state, config) {
  return playerOneWins(state, config) || playerTwoWins(state, config);
}

// moves
function randomStrategy(state, config) {
  return config.alphabet[Math.floor(Math.random() * config.alphabet.length)];
}

function playerDefinition(type, name) {
  return {
    name: name,
    type: type,
    makeMove: type == "human" ? undefined : randomStrategy
  }
}

function updateState(state, move) {
  state.moves.push({key: move, state: "show"});
  return stateTransform(state);
}

const vm = new Vue({
  el: "#app",
  data: {
    appState: "init",
    state: {
      moves: []
    },
    rawConfig: {
      alphabet: "abc",
      maxMoves: 500,
      maxLength: 100,
      delay: 500,
      firstPlayerType: "human",
      secondPlayerType: "human"
    }
  },
  computed: {
    config: function() {
      return {
        alphabet: this.rawConfig.alphabet.split(""),
        maxMoves: this.rawConfig.maxMoves,
        maxLength: this.rawConfig.maxLength,
        delay: this.rawConfig.delay,
        firstPlayer: playerDefinition(this.rawConfig.firstPlayerType, "Player 1"),
        secondPlayer: playerDefinition(this.rawConfig.secondPlayerType, "Player 2")
      }
    },
    currentPlayer: function() {
      if (this.state.moves.length % 2 == 0) 
        return this.config.firstPlayer;
      else
        return this.config.secondPlayer;
    },
    winner: function() {
      if (playerOneWins(this.state, this.config))
        return this.config.firstPlayer.name;
      else
        return this.config.secondPlayer.name;
    },
    isInProgress: function() {
      return !gameEnd(this.state, this.config);
    }
  },
  mounted: function() {
    const vm = this;
    
    window.addEventListener("keyup", function(event) {
      if (vm.appState != "playing") return;

      const key = event.key.toLowerCase();
      if (key.length == 1 && vm.config.alphabet.indexOf(key) != -1) {
        vm.humanMove(key);
      }
    })
  },
  methods: {
    humanMove: function(key) {
      this.makeMove(() => key, "human")
    },
    aiMove: function() {
      this.makeMove(() => this.currentPlayer.makeMove(this.state, this.config), "ai")
    },
    makeMove: function(keyFn, type) {
      if (this.currentPlayer.type == type && this.isInProgress) {
        updateState(this.state, keyFn());
        this.nextPlayer();
      }
    },
    nextPlayer: function() {
      const vm = this;
      if (this.currentPlayer.type != "human") {
        setTimeout(() => vm.aiMove(), vm.config.delay);
      }
    },
    startGame: function() {
      this.appState = "playing";
      // todo: more control over state
      this.state.moves = [];
      this.nextPlayer();
    },
    settings: function() {
      this.appState = "init";
    }
  }
});