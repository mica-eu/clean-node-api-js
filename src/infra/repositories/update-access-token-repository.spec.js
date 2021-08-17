const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('../helpers/mongo-helper');

const client = new MongoHelper(process.env.MONGO_URL);

let db;

class UpdateAccessTokenRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async update(userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId');
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken');
    }
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

  test('Should throw if no userModel is provided', async () => {
    const { userModel } = makeSut();
    const sut = new UpdateAccessTokenRepository();
    const { insertedId: userId } = await userModel.insertOne({
      email: 'any_email@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    });
    const promise = sut.update(userId, 'access_token');
    expect(promise).rejects.toThrow();
  });

  test('Should throw if no params are provided', async () => {
    const { sut, userModel } = makeSut();
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'));
    const { insertedId: userId } = await userModel.insertOne({
      email: 'any_email@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    });
    expect(sut.update(userId)).rejects.toThrow(
      new MissingParamError('accessToken'),
    );
  });
});
