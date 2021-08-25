const request = require('supertest');
const app = require('./app');

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/test-x-powered-by', (req, res) => res.send(''));
    const res = await request(app).get('/test-x-powered-by');
    expect(res.header['x-powered-by']).toBeUndefined();
  });

  test('Should enable CORS', async () => {
    app.get('/test-cors', (req, res) => res.send(''));
    const res = await request(app).get('/test-cors');
    expect(res.header['access-control-allow-origin']).toBe('*');
    expect(res.header['access-control-allow-methods']).toBe('*');
    expect(res.header['access-control-allow-headers']).toBe('*');
  });
});
