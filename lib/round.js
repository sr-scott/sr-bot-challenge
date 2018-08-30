const Player = require('./player');

class Round {
  constructor(opponent, chips) {
    this.them = new Player(opponent, 'redbotpoker', chips / 2);

    this.us = new Player('redbotpoker', opponent, chips / 2);
  }

  dealCard(card) {
    this.us.receiveCard(card);
  }

  onUpdate({ COMMAND, DATA }) {
    console.log(`Game update: ${COMMAND} Data: ${DATA}`);

    const actions = {
      CARD: card => this.dealCard(card),
      OPPONENT_MOVE: move => {
        this.them.updateMoves(move);
      },
      // OPPONENT_CARD: card => doSomething(card),
      RECEIEVE_CHIPS: chips => this.us.updateChips(chips),
    };

    if (actions[COMMAND]) {
      return DATA ? actions[COMMAND](DATA) : actions[COMMAND]();
    }
  }

  getMove() {
    return this.us.getMove();
  }
}

module.exports = Round;
