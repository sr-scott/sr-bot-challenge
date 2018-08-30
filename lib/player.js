const cards = require('./cards');
const strategy = require('./currentStrategy');
const { logger } = require('./logger');

class Player {
  constructor(name, opponent, chips) {
    this.name = name;
    this.strategy = strategy;
    this.opponent = opponent;
    this.pot = chips;

    this.state = {
      ourChips: chips,
      theirChips: chips,
      opponent,
      chips: 100,
      currentBet: 0,
      card: 2,
      moves: ['FOLD'],
    };
  }

  receiveCard(card) {
    console.log(`New card: ${card}. Chips available: ${this.state.ourChips}`);

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
    const ourNewChipsTotal = this.state.ourChips + chips;
    this.state.ourChips = ourNewChipsTotal;
    this.state.theirChips = this.pot - ourNewChipsTotal;
  }

  getMove() {
    const move = this.strategy(this.state);

    this.state.currentBet = this.state.currentBet + move.valueOf();

    console.log(move.valueOf());

    return move.toString();
  }
}

module.exports = Player;
