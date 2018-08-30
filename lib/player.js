const cards = require('./cards');
const strategy = require('./currentStrategy');

class Player {
  constructor(name) {
    this.name = name;
    this.chips = 100;
    this.currentBet = 0;
    this.card = 2;
    this.moves = ['FOLD'];
    this.strategy = strategy;
  }

  receiveCard(card) {
    console.log(`New card: ${card}. Chips available: ${this.chips}`);

    this.opponentsLastMove = 'FOLD';
    this.card = cards[card];
    this.currentBet = 0;
  }

  get lastMove() {
    return this.moves[-1];
  }

  updateMoves(move) {
    this.moves.push(move);
  }

  getMove() {
    return this.strategy({
      card: this.card,
      currentBet: this.currentBet,
      opponentsLastMove: this.opponentsLastMove,
    });
  }
}

module.exports = Player;
