const request = require("supertest");
const app = require("../app"); // Импортируем приложение
const { pool } = require("../db_test"); // Импортируем pool для тестов

describe("Тесты API", () => {
  // Тест для главной страницы
  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    });
  });

  // Хук afterAll для закрытия соединения с базой данных после всех тестов
  afterAll(async () => {
    await pool.end(); // Закрытие соединения с базой данных
  });
});
