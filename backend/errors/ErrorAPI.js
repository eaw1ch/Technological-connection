class ErrorAPI extends Error {
  constructor(errorCode, message) {
    super();
    this.errorCode = errorCode;
    this.message = message;
  }

  static badRequest(message) {
    return new ErrorAPI(400, message);
  }

  static forbidden(message) {
    return new ErrorAPI(403, message);
  }

  static notFound(message) {
    return new ErrorAPI(404, message);
  }

  static internalServerError(message) {
    return new ErrorAPI(500, message);
  }

  static notImplemented(message) {
    return new ErrorAPI(501, message);
  }
}

module.exports = ErrorAPI;
