const InternalServerError = require('./internal-server-error');
const MissingParamError = require('./missing-param-error');
const UnauthorizedError = require('./unauthorized-error');

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      body: new MissingParamError(paramName),
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
