const { Pool } = require("pg");

console.log("Текущий NODE_ENV:", process.env.NODE_ENV);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database:
    process.env.NODE_ENV === "test" ? "CarDealership_test" : "CarDealership",
  password: "root",
  port: 5432,
});

console.log(
  "Используемая база данных:",
  process.env.NODE_ENV === "test" ? "CarDealership_test" : "CarDealership"
);

module.exports = { pool };
