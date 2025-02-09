const { Pool } = require("pg");

console.log("Текущий NODE_ENV:", process.env.NODE_ENV); // Логируем текущую среду

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "127.0.0.1", // Для GitHub Actions
  database: process.env.NODE_ENV === "test" ? "testdb" : "CarDealership",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 5432,
});

console.log("Используемая база данных:", pool.options.database);

// Логируем текущую базу данных
pool.query("SELECT current_database()", (err, res) => {
  if (err) {
    console.error("Ошибка при подключении к базе данных:", err);
  } else {
    console.log("Текущая база данных:", res.rows[0].current_database);
  }
});

module.exports = { pool };
