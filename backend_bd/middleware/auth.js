const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Доступ запрещен. Токен отсутствует." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "your_jwt_secret");
    req.user = decoded; // добавляем userId в req для дальнейшего использования
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Неверный или истекший токен." });
  }
};

module.exports = verifyToken;
