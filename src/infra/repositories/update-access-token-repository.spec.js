const MongoHelper = require('../helpers/mongo-helper');

const client = new MongoHelper(process.env.MONGO_URL);

let db;

class UpdateAccessTokenRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async update(userId, accessToken) {
    await this.userModel.updateOne({ _id: userId }, { $set: { accessToken } });
  }
}

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new UpdateAccessTokenRepository(userModel);
  return { sut, userModel };
};

describe('UpdateAccessTokenRepository', () => {
  beforeAll(async () => {
    db = await client.getDB();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut();
    const { insertedId: userId } = await userModel.insertOne({
      email: 'any_email@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    });
    await sut.update(userId, 'valid_access_token');
    const user = await userModel.findOne({ _id: userId });
    expect(user.accessToken).toBe('valid_access_token');
  });
});
