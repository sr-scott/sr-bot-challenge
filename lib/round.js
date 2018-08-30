const Player = require('./player');

class Round {
  constructor(opponent) {
    this.us = new Player({ name: 'redbotpoker' });

    this.them = new Player({ name: opponent });
  }

  dealCard(card) {
    this.us.receiveCard(card);
  }

  onUpdate({ COMMAND, DATA }) {
    console.log(`Game update: ${COMMAND} Data: ${DATA}`);

    const actions = {
      CARD: card => this.dealCard(card),
    };

    if (actions[COMMAND]) actions[COMMAND](DATA);
  }
}

module.exports = Round;
