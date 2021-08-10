/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const { MissingParamError, InvalidParamError } = require('../../utils/errors');

class AuthUseCase {
  constructor(loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }

  // eslint-disable-next-line class-methods-use-this
  async auth(email, password) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository');
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository');
    }
    await this.loadUserByEmailRepository.load(email);
  }
}

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      return null;
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy);
  return { sut, loadUserByEmailRepositorySpy };
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
    expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'));
  });

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth('valid_email@email.com', 'any_password');
    expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'));
  });
});
