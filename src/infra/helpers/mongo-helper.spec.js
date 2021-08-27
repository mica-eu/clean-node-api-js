const MongoHelper = require('./mongo-helper');

describe('MongoHelper', () => {
  const sut = new MongoHelper(process.env.MONGO_URL);

  beforeAll(async () => {
    await sut.connect();
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect when .getDB is invoked and client is disconnected', async () => {
    expect(sut.db).toBeTruthy();
    await sut.disconnect();
    expect(sut.db).toBeFalsy();
    await sut.getDB();
    expect(sut.db).toBeTruthy();
  });
});
