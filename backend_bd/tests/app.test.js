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

  // Тест для регистрации пользователя
  describe("POST /register", () => {
    const newUser = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };

    beforeEach(async () => {
      // Очистка таблицы пользователей перед каждым тестом (если требуется)
      await pool.query("DELETE FROM users WHERE email = $1", [newUser.email]);
    });

    it("should register a new user successfully", async () => {
      const response = await request(app).post("/register").send(newUser);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Пользователь успешно зарегистрирован."
      );
      expect(response.body.token).toBeDefined(); // Проверяем, что токен был получен
    });

    it("should return error if email already exists", async () => {
      // Сначала регистрируем пользователя
      await request(app).post("/register").send(newUser);

      // Пытаемся зарегистрировать того же пользователя снова
      const response = await request(app).post("/register").send(newUser);

      expect(response.status).toBe(400); // Исправлено на 400
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Пользователь с таким email уже существует."
      );
    });
  });

  // Хук afterAll для закрытия соединения с базой данных после всех тестов
  afterAll(async () => {
    await pool.end(); // Закрытие соединения с базой данных
    console.log("Connection to the database closed.");
  });
});
