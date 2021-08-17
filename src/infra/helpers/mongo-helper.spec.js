const MongoHelper = require('./mongo-helper');

describe('MongoHelper', () => {
  test('Should reconnect when .getDB is invoked and client is disconnected', async () => {
    const sut = new MongoHelper(process.env.MONGO_URL);
    await sut.connect();
    expect(sut.db).toBeTruthy();
    await sut.disconnect();
    expect(sut.db).toBeFalsy();
    await sut.getDB();
    expect(sut.db).toBeTruthy();
    await sut.disconnect();
  });
});
