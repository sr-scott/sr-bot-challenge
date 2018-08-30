const cards = require('./cards');
const strategy = require('./currentStrategy');

class Player {
  constructor(name, opponent) {
    this.name = name;
    this.strategy = strategy;
    this.opponent = opponent;

    this.state = {
      chips: 100,
      currentBet: 0,
      card: 2,
      moves: ['FOLD'],
    };
  }

  receiveCard(card) {
    console.log(`New card: ${card}. Chips available: ${this.state.chips}`);

    this.state.opponentsLastMove = 'FOLD';
    this.state.card = cards[card];
    this.state.currentBet = 0;
  }

  get lastMove() {
    return this.state.moves[-1];
  }

  updateMoves(move) {
    this.moves.push(move);
  }

  updateChips(chips) {
    this.state = this.state + chips;
  }

  getMove() {
    return this.strategy(this.state);
  }
}

module.exports = Player;
