const Bot = require('./bot');

class Round {
  constructor(opponent) {
    this.us = new Bot({ name: 'redbotpoker' });

    this.them = new Bot({ name: opponent });
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
