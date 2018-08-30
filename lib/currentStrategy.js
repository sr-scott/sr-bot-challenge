const cards = require('./cards');
const moves = require('./moves');

const { logger } = require('./logger');

const makeMove = (move, bet = 0) => ({
  toString: () => move,
  valueOf: () => bet,
});

const shouldFold = card => card < cards[8];

const shouldCall = ({ card, currentBet }) => currentBet > 50 && card < cards.K;

module.exports = ({ card, currentBet, opponent }) => {
  logger.info(`State: card=${card}, currentBet=${currentBet}, oppLastMove=${opponent.lastMove}`);

  if (shouldFold(card)) {
    return makeMove(moves.fold());
  }

  if (shouldCall({ card, currentBet })) {
    return makeMove(moves.call());
  }

  if (opponent.lastMove) {
    if (opponent.lastMove.includes('BET')) {
      const [, bet] = opponent.lastMove.split(':');

      if (bet) {
        const betVal = Number(bet);

        if (betVal > 50) {
          if (card > cards.K) {
            return makeMove(moves.bet(betVal + 10), betVal + 10);
          }

          return makeMove(moves.call(), betVal);
        }
      }
    }
  }

  return makeMove(moves.bet(), 2);
};
