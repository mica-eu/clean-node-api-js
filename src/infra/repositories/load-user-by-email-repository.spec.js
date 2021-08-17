const MongoHelper = require('../helpers/mongo-helper');
const LoadUserByEmailRepository = require('./load-user-by-email-repository');

const client = new MongoHelper(process.env.MONGO_URL);

let db;

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);
  return { sut, userModel };
};

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    db = await client.getDB();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    await client.disconnect();
  });

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut();
    const user = await sut.load('invalid_email@email.com');
    expect(user).toBeNull();
  });

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut();
    const userData = {
      email: 'any_email@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    };
    const { insertedId } = await userModel.insertOne(userData);
    const user = await sut.load('any_email@email.com');
    expect(user).toEqual({
      _id: insertedId,
      password: userData.password,
    });
  });

  test('Should throws if no userModel is provided', async () => {
    const sut = new LoadUserByEmailRepository();
    const promise = sut.load('any_email@email.com');
    expect(promise).rejects.toThrow();
  });
});
