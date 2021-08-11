const jwt = require('jsonwebtoken');

class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }

  async generate(id) {
    return jwt.sign(id, this.secret);
  }
}

const makeSut = () => {
  const sut = new TokenGenerator('valid_secret#');
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

  test('Should calls jwt with correct values', async () => {
    const { sut } = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.generate('any_id');
    expect(signSpy).toBeCalledWith('any_id', sut.secret);
  });
});
