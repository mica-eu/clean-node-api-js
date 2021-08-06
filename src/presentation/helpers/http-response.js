module.exports = class HttpResponse {
  static badRequest(body) {
    return {
      body,
      statusCode: 400,
    };
  }

  static internalError() {
    return {
      statusCode: 500,
    };
  }

  static unauthorized(body) {
    return {
      body,
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
