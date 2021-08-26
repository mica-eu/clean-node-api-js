const request = require('supertest');

describe('Content-Type middleware', () => {
  let app;

  beforeEach(() => {
    jest.resetModules();
    // eslint-disable-next-line
    app = require('../config/app');
  });

  test('Should return json content type as default', async () => {
    app.get('/test-content-type', (req, res) => res.send(''));
    const res = await request(app).get('/test-content-type');
    expect(res.header['content-type']).toMatch(/json/);
  });

  test('Should return xml content type if forced', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml');
      res.send('');
    });
    const res = await request(app).get('/test-content-type-xml');
    expect(res.header['content-type']).toMatch(/xml/);
  });
});
