const moves = require('./moves');
const strategy = require('./currentStrategy');

const cards = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

let opponentChips = 100;

class Player {
  constructor(name, strategy) {
    this.name = name;
    this.chips = 100;
    this.currentBet = 0;
    this.card = 2;
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

  call() {
    return moves.call();
  }

  fold() {
    return moves.fold();
  }

  readOpponent(move) {
    this.opponentsLastMove = move;
  }

  getMove() {
    if (this.card < cards[8]) {
      this.updateChips(0 - this.currentBet);
      return this.fold();
    }

    if (this.currentBet > 10 && this.card !== cards.A) {
      return this.call();
    }

    if (this.opponentsLastMove) {
      if (this.opponentsLastMove.includes('BET')) {
        const [, bet] = this.opponentsLastMove.split(':');

        if (bet) {
          const betVal = Number(bet);

          if (betVal > 2) {
            if (this.card > cards.K) {
              return this.makeBet(betVal + 2);
            }

            return this.call();
          }
        }
      }
    }

    return this.makeBet();
  }

  updateChips(change) {
    this.chips += change;
    opponentChips = 200 - this.chips;
  }
}

const bot = new Player();

module.exports = {
  onUpdate: ({ COMMAND, DATA }) => {
    console.log(`Update received: ${COMMAND} Data: ${DATA}`);
    switch (COMMAND) {
      case 'CARD':
        bot.receiveCard(DATA);
        break;

      case 'RECEIVE_CHIPS': {
        bot.updateChips(DATA);
      }
        break;

      case 'OPPONENT_MOVE': {
        bot.readOpponent(DATA);
      }
    }
  },
  getMove: () => {
    console.log(`Current card: ${bot.card}`);

    return bot.getMove();
  },
};
