const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_jwt_secret"; // Убедись, что это тот же ключ, который используется при генерации токена

const verifyToken = (req, res, next) => {
  console.log("Все заголовки запроса:", req.headers); // Логирование всех заголовков
  const authHeader = req.headers.authorization;

  console.log("Заголовок авторизации:", authHeader); // Логирование заголовка авторизации

  // Если заголовок отсутствует или не начинается с "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Нет авторизации" });
  }

  // Получаем токен
  const token = authHeader.split(" ")[1];

  // Верификация токена
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Ошибка верификации токена:", err.message);
      return res
        .status(403)
        .json({ success: false, message: "Недействительный токен" });
    }

    // Если токен валиден, добавляем данные о пользователе в запрос
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
