const bcrypt = require('bcrypt');
const { MissingParamError } = require('../errors');

module.exports = class Encrypter {
  // eslint-disable-next-line class-methods-use-this
  async compare(value, hash) {
    if (!value) {
      throw new MissingParamError('value');
    }
    if (!hash) {
      throw new MissingParamError('hash');
    }
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
};
