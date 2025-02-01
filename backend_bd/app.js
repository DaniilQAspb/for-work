const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CarDealership",
  password: "root",
  port: 5432,
});

const app = express();

// Разрешаем CORS
app.use(cors());

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

// Запуск сервера
const PORT = 3000;
// Получение списка всех машин
app.get("/cars", async (req, res) => {
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
app.get("/car/:id", async (req, res) => {
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
app.post("/add-car", async (req, res) => {
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
app.put("/update-car/:id", async (req, res) => {
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
app.patch("/update-car/:id", async (req, res) => {
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
app.delete("/delete-car/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
