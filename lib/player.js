const cards = require('./cards');
const strategy = require('./currentStrategy');
const { logger } = require('./logger');

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
    this.state.chips = this.state.chips + chips;
  }

  getMove() {
    const move = this.strategy(this.state);

    this.state.currentBet = this.state.currentBet + move.valueOf();

    console.log(move.valueOf());

    return move.toString();
  }
}

module.exports = Player;
