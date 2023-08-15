const ErrorAPI = require("../errors/ErrorAPI");

module.exports = function (err, req, res, next) {
  if (err instanceof ErrorAPI) {
    return res.status(err.errorCode).json({ message: err.message });
  }
  return res.status(500).json({ message: "Внутренняя ошибка сервера!" });
};
