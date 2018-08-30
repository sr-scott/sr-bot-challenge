const cards = require('./cards');
const moves = require('./moves');
const strategy = require('./currentStrategy');

class Player {
  constructor(name) {
    this.name = name;
    this.chips = 100;
    this.currentBet = 0;
    this.card = 2;
    this.lastMove = 'FOLD';
    this.strategy = strategy;
  }

  receiveCard(card) {
    console.log(`New card: ${card}. Chips available: ${this.chips}`);

    this.opponentsLastMove = 'FOLD';
    this.card = cards[card];
    this.currentBet = 0;
  }

  makeBet(bet = 2) {
    this.currentBet += bet;

    this.chips -= bet;

    return moves.bet(bet);
  }

  readOpponent(move) {
    this.opponentsLastMove = move;
  }

  getMove() {
    return this.strategy({ card: this.card, currentBet: this.currentBet, opponentsLastMove: this.opponentsLastMove });
  }
}

const player = new Player();

module.exports = {
  onUpdate: ({ COMMAND, DATA }) => {
    console.log(`Update received: ${COMMAND} Data: ${DATA}`);
    switch (COMMAND) {
      case 'CARD':
        player.receiveCard(DATA);
        break;

      case 'RECEIVE_CHIPS':
        {
          player.updateChips(DATA);
        }
        break;

      case 'OPPONENT_MOVE': {
        player.readOpponent(DATA);
      }
    }
  },
  getMove: () => {
    console.log(`Current card: ${player.card}`);

    return player.getMove();
  },
};
