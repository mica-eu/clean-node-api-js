const { MongoClient } = require('mongodb');

let connection;
let db;

class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    const user = await this.userModel.findOne({ email });
    return user || null;
  }
}

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);
  return { sut, userModel };
};

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    connection.close();
  });

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut();
    const user = await sut.load('invalid_email@email.com');
    expect(user).toBeNull();
  });

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut();
    await userModel.insertOne({ email: 'any_email@email.com' });
    const user = await sut.load('any_email@email.com');
    expect(user.email).toBe('any_email@email.com');
  });
});
