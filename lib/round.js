const Player = require('./player');

class Round {
  constructor(opponent) {
    this.us = new Player('redbotpoker');

    this.them = new Player(opponent);

    // this.pot = {
    //   starting: chips,
    //   ours: chips,
    //   theirs: () => 2 * this.pot.starting - this.pot.ours,
    // }
  }

  dealCard(card) {
    this.us.receiveCard(card);
  }

  onUpdate({ COMMAND, DATA }) {
    console.log(`Game update: ${COMMAND} Data: ${DATA}`);

    const actions = {
      CARD: card => this.dealCard(card),
      OPPONENT_MOVE: (move) => {
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
