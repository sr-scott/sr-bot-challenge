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

module.exports = Player;
