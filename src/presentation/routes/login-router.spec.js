/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const LoginRouter = require('./login-router');
const {
  UnauthorizedError,
  InternalServerError,
} = require('../errors');
const {
  MissingParamError,
  InvalidParamError,
} = require('../../utils/errors');

const makeSut = () => {
  class AuthUseCaseSpy {
    async auth(email, password) {
      this.email = email;
      this.password = password;
      return 'access_token';
    }
  }

  class EmailValidatorSpy {
    // eslint-disable-next-line no-unused-vars
    isValid(email) {
      return true;
    }
  }

  const authUserCaseSpy = new AuthUseCaseSpy();
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new LoginRouter(authUserCaseSpy, emailValidatorSpy);

  return { sut, authUserCaseSpy, emailValidatorSpy };
};

describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 500 if invalid httpRequest is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route({});
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should call AuthUserCase with correct params', async () => {
    const { sut, authUserCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    await sut.route(httpRequest);
    expect(authUserCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUserCaseSpy.password).toBe(httpRequest.body.password);
  });

  test('Should returns 401 if invalid credentials are provided', async () => {
    const { sut, authUserCaseSpy } = makeSut();
    jest.spyOn(authUserCaseSpy, 'auth').mockReturnValueOnce(null);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });

  test('Should returns 200 valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.accessToken).toEqual(expect.any(String));
  });

  test('Should returns 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should returns 500 if AuthUseCase has no auth method', async () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should returns 500 if AuthUseCase throws', async () => {
    const { sut, authUserCaseSpy } = makeSut();
    jest.spyOn(authUserCaseSpy, 'auth').mockImplementationOnce(async () => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should returns 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should returns 500 if no EmailValidator is provided', async () => {
    const { authUserCaseSpy } = makeSut();
    const sut = new LoginRouter(authUserCaseSpy);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should returns 500 if no EmailValidator has no isValid method', async () => {
    const { authUserCaseSpy } = makeSut();
    const sut = new LoginRouter(authUserCaseSpy, {});
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should returns 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  test('Should EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };
    await sut.route(httpRequest);
    expect(isValidSpy).toBeCalledWith('any_email@mail.com');
  });
});
