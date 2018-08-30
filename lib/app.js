const express = require('express');

const bodyParser = require('body-parser');

const { onUpdate, getMove } = require('./bot');

// const Round = require('./round');

// let currentGame = new Round();

const app = express();

app.use(bodyParser.urlencoded());

app.post('/start', (req, res) => {
  const { OPPONENT_NAME } = req.body;

  console.log(`Round started: ${OPPONENT_NAME}`);

  // currentGame = new Round(OPPONENT_NAME);

  res.end();
});

app.get('/move', (req, res) => {
  res.send(getMove());
});

app.post('/update', (req, res) => {
  onUpdate(req.body);

  res.send();
});

module.exports = app;
