module.exports = class HttpResponse {
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

  static unauthorized(message) {
    return {
      body: message,
      statusCode: 401,
    };
  }
};
