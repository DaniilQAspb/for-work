const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CarDealership_test", // Пробуем основную базу данных
  password: "root",
  port: 5432,
});

// Логируем текущую базу данных
pool.query("SELECT current_database()", (err, res) => {
  if (err) {
    console.error("Ошибка при подключении к базе данных:", err);
  } else {
    console.log("Текущая база данных:", res.rows[0].current_database);
  }
});

module.exports = { pool };
