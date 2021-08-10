const InternalServerError = require('./internal-server-error');
const InvalidParamError = require('./invalid-param-error');
const MissingParamError = require('./missing-param-error');
const UnauthorizedError = require('./unauthorized-error');

module.exports = {
  InternalServerError,
  InvalidParamError,
  MissingParamError,
  UnauthorizedError,
};
