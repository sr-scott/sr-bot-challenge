const app = require('./lib/app');

try {
  app.listen(3000);

  console.log('Server started');
} catch (e) {
  console.log(`Error starting server: ${e.message}`);
}
