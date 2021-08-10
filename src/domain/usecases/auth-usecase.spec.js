const { MissingParamError } = require('../../utils/errors');

class AuthUseCase {
  // eslint-disable-next-line class-methods-use-this
  async auth(email) {
    if (!email) {
      throw new MissingParamError('email');
    }
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });
});
