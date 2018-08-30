const express = require('express');

const bodyParser = require('body-parser');

const { onUpdate, getMove } = require('./lib/bot');

const app = express();

app.use(bodyParser.urlencoded());

app.post('/start', (req, res) => {
  res.send('');
});

app.get('/move', (req, res) => {
  res.send(getMove());
});

app.post('/update', (req, res) => {
  onUpdate(req.body);

  res.send();
});

try {
  app.listen(3000);

  console.log('Server started');
} catch (e) {
  console.log(`Error starting server: ${e.message}`);
}
