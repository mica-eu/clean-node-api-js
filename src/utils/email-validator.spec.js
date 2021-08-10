/* eslint-disable class-methods-use-this */
const validator = require('validator');

class EmailValidator {
  isValid(email) {
    return validator.isEmail(email);
  }
}

const makeSut = () => {
  const sut = new EmailValidator();
  return { sut };
};

describe('EmailValidator', () => {
  test('Should return true if validator return true', () => {
    const { sut } = makeSut();
    const isEmailValid = sut.isValid('any_email@email.com');
    expect(isEmailValid).toBe(true);
  });

  test('Should return false if validator return false', () => {
    validator.isEmailValid = false;
    const { sut } = makeSut();
    const isEmailValid = sut.isValid('invalid_email@email.com');
    expect(isEmailValid).toBe(false);
  });
});
