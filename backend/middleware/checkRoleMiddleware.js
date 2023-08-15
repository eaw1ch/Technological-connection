const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer ТОКЕН
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
      }
      const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
      if (tokenVerify.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = tokenVerify;
      next();
    } catch (e) {
      res.status(401).json({ message: "Не авторизован" });
    }
  };
};
