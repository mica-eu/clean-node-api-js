const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('../helpers/mongo-helper');
const UpdateAccessTokenRepository = require('./update-access-token-repository');

const client = new MongoHelper(process.env.MONGO_URL);

let db;
let userId;

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
    const userModel = db.collection('users');
    await userModel.deleteMany();
    const { insertedId } = await userModel.insertOne({
      email: 'any_email@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    });
    userId = insertedId;
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut();
    await sut.update(userId, 'valid_access_token');
    const user = await userModel.findOne({ _id: userId });
    expect(user.accessToken).toBe('valid_access_token');
  });

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository();
    const promise = sut.update(userId, 'access_token');
    expect(promise).rejects.toThrow();
  });

  test('Should throw if no params are provided', async () => {
    const { sut } = makeSut();
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'));
    expect(sut.update(userId)).rejects.toThrow(
      new MissingParamError('accessToken'),
    );
  });
});
