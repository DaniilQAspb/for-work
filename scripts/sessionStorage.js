/// sessionStorage.js

// Функция для получения токена из localStorage
function getToken() {
  return localStorage.getItem("authToken");
}

// Функция для проверки сессии
function isAuthenticated() {
  const token = getToken();
  return token ? true : false;
}

// Функция выхода из системы
function logout() {
  localStorage.removeItem("authToken"); // Удаляем токен
  updateSessionInfo(); // Обновляем информацию о сессии
  window.location.reload(); // Перезагружаем страницу
}

// Функция для отображения информации о сессии
function updateSessionInfo() {
  const sessionStatus = document.getElementById("sessionStatus");
  const logoutButton = document.getElementById("logoutButton");

  if (isAuthenticated()) {
    sessionStatus.innerText = "Вы авторизованы!";
    if (logoutButton) logoutButton.style.display = "inline-block"; // Показываем кнопку выхода
  } else {
    sessionStatus.innerText = "Вы не авторизованы.";
    if (logoutButton) logoutButton.style.display = "none"; // Скрываем кнопку выхода
  }
}

// Экспортируем функции
export { getToken, isAuthenticated, updateSessionInfo, logout };
