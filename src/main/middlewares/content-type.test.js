const request = require('supertest');
const app = require('../config/app');

describe('Content-Type middleware', () => {
  test('Should return json content type as default', async () => {
    app.get('/test-content-type', (req, res) => res.send(''));
    const res = await request(app).get('/test-content-type');
    expect(res.header['content-type']).toMatch(/json/);
  });
});
