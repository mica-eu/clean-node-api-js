const request = require('supertest');
const app = require('../config/app');

describe('JSON parser middleware', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test-json-parser', (req, res) => res.send(req.body));
    const res = await request(app)
      .post('/test-json-parser')
      .send({ foo: 'bar' });
    expect(res.body).toEqual(expect.objectContaining({ foo: 'bar' }));
  });
});
