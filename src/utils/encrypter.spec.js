/* eslint-disable */
class Encrypter {
  async compare(password, hashedPassowrd) {
    return true;
  }
}

describe('Encrypter', () => {
  test('Shuld return true if bcrypt return true', async () => {
    const sut = new Encrypter();
    const isValid = await sut.compare('valid_password', 'hashed_password');
    expect(isValid).toBe(true);
  });
});
