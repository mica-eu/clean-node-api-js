const validator = require('validator');
const EmailValidator = require('./email-validator');
const { MissingParamError } = require('../errors');

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

  test('Should call validator with correct email', () => {
    const { sut } = makeSut();
    sut.isValid('any_email@email.com');
    expect(validator.email).toBe('any_email@email.com');
  });

  test('Should throws if no email is provided', async () => {
    const { sut } = makeSut();
    expect(sut.isValid).toThrow(new MissingParamError('email'));
  });
});
