document
  .getElementById("deleteUserForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = document.getElementById("user_id").value;
    const token = localStorage.getItem("authToken"); // Токен должен быть в authToken, а не в token

    console.log("Отправляем токен:", token); // Проверяем, есть ли токен перед отправкой запроса

    if (!token) {
      document.getElementById("UserDetails").innerHTML =
        "<p style='color: red;'>Вы не авторизованы!</p>";
      return;
    }

    try {
      const response = await fetch(`/delete-user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
        },
      });

      const data = await response.json();
      console.log("Ответ от сервера:", data);

      if (response.ok) {
        document.getElementById("UserDetails").innerHTML =
          `<p style='color: green;'>${data.message}</p>`;
      } else {
        document.getElementById("UserDetails").innerHTML =
          `<p style='color: red;'>Ошибка: ${data.message}</p>`;
      }
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      document.getElementById("UserDetails").innerHTML =
        "<p style='color: red;'>Ошибка сервера.</p>";
    }
  });
