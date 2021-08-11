const validator = require('validator');
const { MissingParamError } = require('../errors');

module.exports = class EmailValidator {
  // eslint-disable-next-line class-methods-use-this
  isValid(email) {
    if (!email) {
      throw new MissingParamError('email');
    }
    return validator.isEmail(email);
  }
};
