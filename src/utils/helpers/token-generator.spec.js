/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');

class TokenGenerator {
  async generate(id) {
    return jwt.sign(id, 'secret');
  }
}

const makeSut = () => {
  const sut = new TokenGenerator();
  return { sut };
};

describe('TokenGenerator', () => {
  test('Should return null if jwt return null', async () => {
    const { sut } = makeSut();
    jest.spyOn(jwt, 'sign').mockReturnValueOnce(null);
    const token = await sut.generate('any_id');
    expect(token).toBeNull();
  });

  test('Should return a token if jwt returns jwt', async () => {
    const { sut } = makeSut();
    jest.spyOn(jwt, 'sign').mockReturnValueOnce('valid_jsonwebtoken');
    const token = await sut.generate('any_id');
    expect(token).toBe('valid_jsonwebtoken');
  });
});
