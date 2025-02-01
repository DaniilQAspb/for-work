// Функция для проверки авторизации
function checkSession() {
  const token = localStorage.getItem("authToken"); // Извлекаем токен из localStorage

  if (token) {
    // Если токен есть, показываем, что пользователь авторизован
    document.getElementById("sessionStatus").innerText = "Вы авторизованы!";
  } else {
    // Если токена нет, показываем, что пользователь не авторизован
    document.getElementById("sessionStatus").innerText = "Вы не авторизованы.";
  }
}

// Вызываем функцию для проверки сессии при загрузке страницы
checkSession();

// Авторизация пользователя (вход)
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Если авторизация успешна, сохраняем токен в localStorage
      localStorage.setItem("authToken", data.token);

      // Отображаем успешную авторизацию
      document.getElementById("loginResponse").innerText =
        "Авторизация прошла успешно!";

      // Обновляем информацию о сессии
      checkSession();
    } else {
      // Если ошибка при авторизации
      document.getElementById("loginResponse").innerText = data.message;
    }
  } catch (err) {
    console.error("Ошибка при авторизации:", err);
    document.getElementById("loginResponse").innerText =
      "Ошибка при авторизации.";
  }
});
