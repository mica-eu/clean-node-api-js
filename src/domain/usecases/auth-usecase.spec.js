/* eslint-disable */
const AuthUseCase = require('./auth-usecase');
const { MissingParamError } = require('../../utils/errors');

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      return {
        id: 'valid_id',
        password: 'valid_password',
      };
    }
  }
  class EncrypterSpy {
    async compare(password, hashedPassowrd) {
      return true;
    }
  }
  class TokenGeneratorSpy {
    async generate(userId) {
      return 'valid_token';
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const encrypterSpy = new EncrypterSpy();
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy, tokenGeneratorSpy);
  return { sut, loadUserByEmailRepositorySpy, encrypterSpy, tokenGeneratorSpy };
};

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.auth('valid_email@email.com');
    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });

  test('Should call LoadUserByEmailRepository with correct', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(loadUserByEmailRepositorySpy, 'load');
    await sut.auth('valid_email@email.com', 'any_password');
    expect(loadSpy).toBeCalledWith('valid_email@email.com');
  });

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('valid_email@email.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth('valid_email@email.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  test('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'load').mockResolvedValueOnce(null);
    const accessToken = await sut.auth('invalid_email@email.com', 'any_password');
    expect(accessToken).toBeNull();
  });
  
  test('Should return null if an invalid password is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'load').mockResolvedValueOnce(null);
    const accessToken = await sut.auth('valid_email@email.com', 'invalid_password');
    expect(accessToken).toBeNull();
  });

  test('Should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'load').mockResolvedValueOnce({ password: '#123456789'})
    const compareSpy = jest.spyOn(encrypterSpy, 'compare');
    await sut.auth('valid_email@email.com', 'valid_password');
    expect(compareSpy).toHaveBeenCalledWith('valid_password', '#123456789');
  });

  test('Should call TokenGenerator with correct user id', async () => {
    const { sut, tokenGeneratorSpy } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorSpy, 'generate');
    await sut.auth('valid_email@email.com', 'valid_password');
    expect(generateSpy).toHaveBeenCalledWith('valid_id');
  });
});
