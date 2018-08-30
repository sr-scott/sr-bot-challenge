const moves = require('./moves');

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

let nextMove = moves.bet();

let card = cards[2];

let currentBet = 0;

module.exports = {
  onUpdate: ({ COMMAND, DATA }) => {
    console.log(`Update received: ${COMMAND} Data: ${DATA}`);
    switch (COMMAND) {
      case 'CARD':
        card = cards[DATA];
        if (card > 8) {
          nextMove = moves.bet();
        } else {
          nextMove = moves.fold();
        }
        break;

      case 'OPPONENT_MOVE': {
        switch (DATA) {
          case 'FOLD':
            currentBet = 0;
            break;
          case 'CALL':
            nextMove = moves.call();
            currentBet = 0;
            break;
        }
      }
        break;
    }
  },
  getMove: () => {
    console.log(`Current card: ${card}`);

    if (nextMove === moves.bet()) {
      currentBet += 2;
    }

    if (currentBet > 10) {
      nextMove = moves.call();
    }

    return nextMove;
  },
};
