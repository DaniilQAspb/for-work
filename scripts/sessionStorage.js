// sessionStorage.js

// Функция для получения токена из localStorage
export function getToken() {
  const token = localStorage.getItem("authToken");
  console.log("Получен токен из localStorage:", token); // Логирование токена
  return token;
}

// Функция для проверки сессии
export function isAuthenticated() {
  const token = getToken();
  console.log("Проверка сессии, токен:", token); // Логирование для проверки сессии
  return token ? true : false;
}

// Функция выхода из системы
export function logout() {
  console.log("Выполнение выхода, удаление токена"); // Логирование при выходе
  localStorage.removeItem("authToken"); // Удаляем токен
  updateSessionInfo(); // Обновляем информацию о сессии
  window.location.reload(); // Перезагружаем страницу
}

// Функция для отображения информации о сессии
export function updateSessionInfo() {
  const sessionStatus = document.getElementById("sessionStatus");
  const logoutButton = document.getElementById("logoutButton");

  const token = getToken();
  console.log("Обновление информации о сессии, токен:", token); // Логирование токена

  if (isAuthenticated()) {
    sessionStatus.innerText = "Вы авторизованы!";
    if (logoutButton) logoutButton.style.display = "inline-block"; // Показываем кнопку выхода
  } else {
    sessionStatus.innerText = "Вы не авторизованы.";
    if (logoutButton) logoutButton.style.display = "none"; // Скрываем кнопку выхода
  }
}

// Обновляем информацию о сессии после полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен, обновление информации о сессии");
  updateSessionInfo(); // Обновляем информацию о сессии, когда DOM полностью загружен
});
