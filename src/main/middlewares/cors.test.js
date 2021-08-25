const request = require('supertest');
const app = require('../config/app');

describe('CORS middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test-cors', (req, res) => res.send(''));
    const res = await request(app).get('/test-cors');
    expect(res.header['access-control-allow-origin']).toBe('*');
    expect(res.header['access-control-allow-methods']).toBe('*');
    expect(res.header['access-control-allow-headers']).toBe('*');
  });
});
