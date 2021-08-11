const bcrypt = require('bcrypt');

module.exports = class Encrypter {
  // eslint-disable-next-line class-methods-use-this
  async compare(value, hash) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
};
