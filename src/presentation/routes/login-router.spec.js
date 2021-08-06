/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
class LoginRouter {
  route(httpRequest) {
    const requiredFields = ['email', 'password'];

    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500,
      };
    }

    const hasMissingParams = !requiredFields.every(
      (field) => Object.keys(httpRequest.body).includes(field),
    );

    if (hasMissingParams) {
      return {
        statusCode: 400,
      };
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
