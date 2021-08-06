/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
class MissingParamError extends Error {
  constructor(paramName) {
    super(`Missing param <${paramName}>`);
    this.name = 'MissingParamError';
  }
}

class HttpResponse {
  static badRequest(message) {
    return {
      body: message,
      statusCode: 400,
    };
  }

  static internalError() {
    return {
      statusCode: 500,
    };
  }
}
class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.internalError();
    }
    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest(new MissingParamError('email'));
    }
    if (!password) {
      return HttpResponse.badRequest(new MissingParamError('password'));
    }
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test('Should return 500 if invalid httpRequest is provided', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });
});
