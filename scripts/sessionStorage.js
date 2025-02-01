// sessionStorage.js

// Функция для получения токена из localStorage
function getToken() {
  return localStorage.getItem("authToken");
}

// Функция для проверки сессии
function isAuthenticated() {
  const token = getToken();
  return token ? true : false;
}

// Функция для отображения информации о сессии
function updateSessionInfo() {
  const sessionStatus = document.getElementById("sessionStatus");

  if (isAuthenticated()) {
    sessionStatus.innerText = "Вы авторизованы!";
  } else {
    sessionStatus.innerText = "Вы не авторизованы.";
  }
}

// Экспортируем функции для использования на других страницах
export { getToken, isAuthenticated, updateSessionInfo };
