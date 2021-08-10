const validator = require('validator');

module.exports = class EmailValidator {
  // eslint-disable-next-line class-methods-use-this
  isValid(email) {
    return validator.isEmail(email);
  }
};
