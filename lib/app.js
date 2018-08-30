const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const Round = require('./round');

const { logger } = require('./logger');

let currentGame;

const app = express();

app.use(morgan('common'));

app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  logger.info(req.method, req.path, req.body);

  next();
});

app.post('/start', (req, res) => {
  const { OPPONENT_NAME } = req.body;

  logger.info(`Round started: ${OPPONENT_NAME}`);

  let chips = 1000;
  currentGame = new Round(OPPONENT_NAME, chips);

  res.end();
});

app.get('/move', (req, res) => {
  const move = currentGame.getMove();

  logger.info(`Our move: ${move}`);

  res.send(move);
});

app.post('/update', (req, res) => {
  currentGame.onUpdate(req.body);

  res.send();
});

app.use((err, req, res, next) => {
  logger.error(err);

  res.status(500);

  res.end();
});

module.exports = app;
