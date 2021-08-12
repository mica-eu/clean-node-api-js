/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class LoadUserByEmailRepository {
  async load(email) {
    return null;
  }
}

const makeSut = () => {
  const sut = new LoadUserByEmailRepository();
  return { sut };
};

describe('LoadUserByEmailRepository', () => {
  test('Should return null if no user is found', async () => {
    const { sut } = makeSut();
    const user = await sut.load('invalid_email@email.com');
    expect(user).toBeNull();
  });
});
