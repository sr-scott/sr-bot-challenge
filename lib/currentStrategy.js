const cards = require('./cards');
const moves = require('./moves');

module.exports = ({ card, currentBet, opponentsLastMove }) => {
  if (card < cards[8]) {
    return moves.fold();
  }

  if (currentBet > 10 && card !== cards.A) {
    return moves.call();
  }

  if (opponentsLastMove) {
    if (opponentsLastMove.includes('BET')) {
      const [, bet] = opponentsLastMove.split(':');

      if (bet) {
        const betVal = Number(bet);

        if (betVal > 2) {
          if (card > cards.K) {
            moves.bet(betVal + 2);
          }

          return moves.call();
        }
      }
    }
  }

  return moves.bet();
};
