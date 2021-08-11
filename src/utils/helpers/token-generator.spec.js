/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

class TokenGenerator {
  async generate(_id) {
    return null;
  }
}

const makeSut = () => {
  const sut = new TokenGenerator();
  return { sut };
};

describe('TokenGenerator', () => {
  test('Should return null if jwt return null', async () => {
    const { sut } = makeSut();
    const token = await sut.generate('any_id');
    expect(token).toBeNull();
  });
});
