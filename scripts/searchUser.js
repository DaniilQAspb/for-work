document
  .getElementById("searchUserForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем ID пользователя из формы
    const userId = document.getElementById("user_id").value;

    if (!userId) {
      alert("Введите ID пользователя.");
      return;
    }

    // Получаем токен из localStorage
    const token = localStorage.getItem("authToken");

    // Проверяем, есть ли токен
    if (!token) {
      alert("Ошибка: Вы не авторизованы!");
      return;
    }

    try {
      // Отправляем запрос на сервер с токеном в заголовках
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Если запрос успешен, выводим данные пользователя
        const userDetails = document.getElementById("userDetails");
        userDetails.innerHTML = `
          <h3>Пользователь найден:</h3>
          <p><strong>Username:</strong> ${data.username}</p>
          <p><strong>Email:</strong> ${data.email}</p>
        `;
      } else {
        // Если ошибка (например, пользователя не нашли)
        document.getElementById("userDetails").innerHTML =
          `<p>${data.error}</p>`;
      }
    } catch (error) {
      console.error("Ошибка при поиске пользователя:", error);
      document.getElementById("userDetails").innerHTML =
        "<p>Произошла ошибка. Попробуйте позже.</p>";
    }
  });
