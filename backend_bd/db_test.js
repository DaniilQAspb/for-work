const { Pool } = require("pg");

console.log("Текущий NODE_ENV:", process.env.NODE_ENV); // Логируем текущую среду

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database:
    process.env.NODE_ENV === "test" ? "CarDealership_test" : "CarDealership", // Проверка среды
  password: "root",
  port: 5432,
});

console.log(
  "Используемая база данных:",
  process.env.NODE_ENV === "test" ? "CarDealership_test" : "CarDealership"
);
// Логируем текущую базу данных
pool.query("SELECT current_database()", (err, res) => {
  if (err) {
    console.error("Ошибка при подключении к базе данных:", err);
  } else {
    console.log("Текущая база данных:", res.rows[0].current_database);
  }
});

module.exports = { pool };
