const Player = require('./player');

class Round {
  constructor(opponent) {
    this.us = new Player('redbotpoker');

    this.them = new Player(opponent);

    // this.opponentProfile = profiles[opponent] || {moves: [], card: null};

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
      RECEIVE_BUTTON: () => this.getMove(),
      CARD: card => this.dealCard(card),
      OPPONENT_MOVE: move => {
        this.them.updateLastMove(move);
      },
    };

    if (actions[COMMAND]) {
      return DATA ? actions[COMMAND](DATA) : actions[COMMAND]();
    }
  }

  getMove() {
    this.us.getMove();
    this.us.updateLastMove(move);
  }
}

module.exports = Round;
