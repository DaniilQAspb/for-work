// db_test.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CarDealership_test", // Используйте другую базу данных для тестов
  password: "root",
  port: 5432,
});

module.exports = { pool };
