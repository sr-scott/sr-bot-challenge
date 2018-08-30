const cards = require('./cards');
const moves = require('./moves');
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

  makeBet(bet = 2) {
    this.currentBet += bet;

    this.chips -= bet;

    return moves.bet(bet);
  }

  call() {
    return moves.call();
  }

  fold() {
    return moves.fold();
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
