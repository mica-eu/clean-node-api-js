const { InternalServerError, UnauthorizedError } = require('../errors');

module.exports = class HttpResponse {
  static badRequest(body) {
    return {
      body,
      statusCode: 400,
    };
  }

  static internalError() {
    return {
      body: new InternalServerError(),
      statusCode: 500,
    };
  }

  static unauthorized() {
    return {
      body: new UnauthorizedError(),
      statusCode: 401,
    };
  }

  static ok(body) {
    return {
      body,
      statusCode: 200,
    };
  }
};
