const express = require('express');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const { onUpdate, getMove } = require('./player');

// const Round = require('./round');
const { logger } = require('./logger');

// let currentGame = new Round();

const app = express();

app.use(morgan('common'));

app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  logger.info(req.method, req.path, req.body);

  next();
})

app.post('/start', (req, res) => {
  const { OPPONENT_NAME } = req.body;

  logger.info(`Round started: ${OPPONENT_NAME}`);

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

app.use((err, req, res, next) => {
  logger.error(err);
})

module.exports = app;
