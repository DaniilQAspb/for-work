const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const verifyToken = require("./middleware/auth");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CarDealership",
  password: "root",
  port: 5432,
});

const app = express();

// Загружаем swagger.yaml
const swaggerDocument = YAML.load(
  path.join(__dirname, "..", "config", "swagger.yaml")
);
// Путь к файлу swagger.yaml

// Разрешаем CORS
app.use(cors());

// Подключаем Swagger UI по пути /api-docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui { background-color: #f4f4f4; }", // кастомный стиль
    customSiteTitle: "Car Dealership API Documentation", // заголовок страницы
  })
);

// Поддержка JSON-запросов и форм
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем статические файлы
const publicDir = path.resolve(
  "C:/Users/dsadg/OneDrive/Рабочий стол/Разработка и управление проектами/Global_project"
);
app.use(express.static(publicDir));

// Главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// Регистрируем нового пользователя
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверка, существует ли уже пользователь с таким email
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(checkUserQuery, [email]);

    if (result.rows.length > 0) {
      return res.json({
        success: false,
        message: "Пользователь с таким email уже существует.",
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10); // 10 - это соль

    // Добавление нового пользователя в базу данных
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const newUser = await pool.query(query, [username, email, hashedPassword]);

    // Генерация JWT токена
    const token = jwt.sign(
      { userId: newUser.rows[0].user_id }, // Включаем userId в токен
      "your_jwt_secret", // Секретный ключ для генерации токена
      { expiresIn: "1h" } // Время жизни токена
    );

    res.json({
      success: true,
      message: "Пользователь успешно зарегистрирован.",
      user: newUser.rows[0],
      token, // Возвращаем токен в ответе
    });
  } catch (err) {
    console.error("Ошибка при регистрации пользователя:", err.message);
    res.status(500).json({
      success: false,
      message: "Ошибка при регистрации пользователя.",
    });
  }
});

// Авторизация пользователя (вход)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Находим пользователя по email
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.json({
        success: false,
        message: "Пользователь с таким email не найден.",
      });
    }

    const user = result.rows[0];

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Неверный пароль.",
      });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { userId: user.user_id }, // Включаем userId в токен
      "your_jwt_secret", // Секретный ключ
      { expiresIn: "1h" } // Время жизни токена
    );

    res.json({
      success: true,
      message: "Авторизация прошла успешно.",
      user,
      token, // Возвращаем токен
    });
  } catch (err) {
    console.error("Ошибка при авторизации:", err.message);
    res.status(500).json({
      success: false,
      message: "Ошибка при авторизации.",
    });
  }
});

// Получение списка всех пользователей
app.get("/users", verifyToken, async (req, res) => {
  try {
    const query = "SELECT user_id, username, email FROM users"; // Запрос для получения пользователей без паролей
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.json({
        success: false,
        message: "Нет пользователей в системе.",
      });
    }

    res.json({
      success: true,
      users: result.rows, // Отправляем список пользователей
    });
  } catch (err) {
    console.error("Ошибка при получении списка пользователей:", err.message);
    res.status(500).json({
      success: false,
      message: "Ошибка при получении списка пользователей.",
    });
  }
});

// Запуск сервера
const PORT = 3000;
// Получение списка всех машин
app.get("/cars", verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars ORDER BY car_id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Ошибка при получении списка машин:", err.message);
    res.status(500).json({
      error: "Ошибка при получении списка машин.",
      details: err.message,
    });
  }
});

// Поиск машины по ID
app.get("/car/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Ищем машину с ID:", id); // Логирование ID

    // Получаем машину по ID
    const query = "SELECT * FROM cars WHERE car_id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Машина не найдена." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка при поиске машины:", err.message);
    res.status(500).json({ error: "Ошибка при поиске машины." });
  }
});

// Добавление машины в базу
app.post("/add-car", verifyToken, async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      mileage,
      fueltype,
      transmission,
      description,
    } = req.body;

    const query = `
      INSERT INTO cars (brand, model, year, price, mileage, fueltype, transmission, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      brand,
      model,
      year,
      price,
      mileage,
      fueltype,
      transmission,
      description,
    ]);

    res.json({
      message: "Машина успешно добавлена!",
      car: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при записи в базу данных:", err);
    res.status(500).json({ error: "Ошибка при добавлении машины." });
  }
});

// Обновление машины по ID
app.put("/update-car/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      brand,
      model,
      year,
      price,
      mileage,
      fueltype,
      transmission,
      description,
    } = req.body;

    console.log("Получены данные для обновления:", req.body); // Логирование данных

    // Проверяем, существует ли машина
    const checkQuery = "SELECT * FROM cars WHERE car_id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Машина не найдена." });
    }

    // Обновляем данные машины
    const updateQuery = `
      UPDATE cars 
      SET brand = $1, model = $2, year = $3, price = $4, mileage = $5, 
          fueltype = $6, transmission = $7, description = $8
      WHERE car_id = $9
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [
      brand,
      model,
      year,
      price,
      mileage,
      fueltype,
      transmission,
      description,
      id,
    ]);

    console.log("Обновленные данные машины:", result.rows[0]); // Логирование результата

    res.json({
      message: "Машина успешно обновлена!",
      updatedCar: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении машины:", err.message);
    res.status(500).json({ error: "Ошибка при обновлении машины." });
  }
});

// Частичное обновление машины по ID
app.patch("/update-car/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Проверяем, существует ли машина
    const checkQuery = "SELECT * FROM cars WHERE car_id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Машина не найдена." });
    }

    // Генерируем динамический SQL-запрос
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = Object.values(updates);

    const updateQuery = `
      UPDATE cars 
      SET ${setClause}
      WHERE car_id = $${values.length + 1}
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [...values, id]);

    res.json({
      message: "Машина успешно обновлена!",
      updatedCar: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при частичном обновлении машины:", err.message);
    res.status(500).json({ error: "Ошибка при обновлении машины." });
  }
});

// Удаление машины по ID
app.delete("/delete-car/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Проверяем, существует ли машина
    const checkQuery = "SELECT * FROM cars WHERE car_id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Машина не найдена." });
    }

    // Удаляем машину
    const deleteQuery = "DELETE FROM cars WHERE car_id = $1 RETURNING *";
    const result = await pool.query(deleteQuery, [id]);

    res.json({
      message: "Машина успешно удалена!",
      deletedCar: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при удалении машины:", err.message);
    res.status(500).json({ error: "Ошибка при удалении машины." });
  }
});

// Поиск пользователя по ID
app.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Получаем пользователя по ID
    const query =
      "SELECT user_id, username, email FROM users WHERE user_id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка при поиске пользователя:", err.message);
    res.status(500).json({ error: "Ошибка при поиске пользователя." });
  }
});

// Удаляем пользователя по ID
app.delete("/delete-user/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Проверяем, существует ли пользователь
    const checkUserQuery = "SELECT * FROM users WHERE user_id = $1";
    const userResult = await pool.query(checkUserQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Пользователь не найден." });
    }

    // Удаляем пользователя
    const deleteQuery = "DELETE FROM users WHERE user_id = $1";
    await pool.query(deleteQuery, [userId]);

    res.json({ success: true, message: "Пользователь успешно удален." });
  } catch (err) {
    console.error("Ошибка при удалении пользователя:", err);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при удалении пользователя." });
  }
});

// Экспортируем приложение для тестов
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
}

module.exports = app; // Экспортируем приложение для тестов
