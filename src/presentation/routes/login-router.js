/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
const HttpResponse = require('../helpers/http-response');
const MissingParamError = require('../helpers/missing-param-error');
const UnauthorizedError = require('../helpers/unauthorized-error');

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

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
    this.authUseCase.auth(email, password);
    return HttpResponse.unauthorized(new UnauthorizedError());
  }
};
