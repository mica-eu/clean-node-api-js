/* eslint-disable */
const bcrypt = require('bcrypt');
class Encrypter {
  async compare(value, hash) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}

describe('Encrypter', () => {
  test('Shuld return true if bcrypt return true', async () => {
    const sut = new Encrypter();
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(true);
  });

  test('Shuld return false if bcrypt return false', async () => {
    const sut = new Encrypter();
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
    const isValid = await sut.compare('any_value', 'hash');
    expect(isValid).toBe(false);
  });
});
