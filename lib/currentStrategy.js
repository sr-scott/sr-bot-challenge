const cards = require('./cards');
const moves = require('./moves');

const { logger } = require('./logger');

const makeMove = (move, bet = 0) => ({
  toString: () => move,
  valueOf: () => bet,
});

module.exports = ({ card, currentBet, opponentsLastMove }) => {
  logger.info(`State: card=${card}, currentBet=${currentBet}, oppLastMove=${opponentsLastMove}`);

  if (card < cards[8]) {
    return makeMove(moves.fold());
  }

  if (currentBet > 10 && card !== cards.A) {
    return makeMove(moves.call());
  }

  if (opponentsLastMove) {
    if (opponentsLastMove.includes('BET')) {
      const [, bet] = opponentsLastMove.split(':');

      if (bet) {
        const betVal = Number(bet);

        if (betVal > 2) {
          if (card > cards.K) {
            return makeMove(moves.bet(betVal + 2), betVal + 2);
          }

          return makeMove(moves.call(), betVal);
        }
      }
    }
  }

  return makeMove(moves.bet(), 2);
};
