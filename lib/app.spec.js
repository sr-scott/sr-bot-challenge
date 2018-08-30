const supertest = require('supertest');

const app = require('./app');

describe('Poker bot', () => {
  describe('POST /start', () => {
    it('should respond with status 200', () => supertest(app).post('/start').expect(200));
  });

  describe('POST /update', () => {
    it('should respond with status 200', () => supertest(app).post('/update').expect(200));
  });

  describe('GET /move', () => {
    it('should respond with status 200', () => supertest(app).post('/move').expect(200));
  });
});
