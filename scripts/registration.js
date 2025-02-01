document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Отправляем POST-запрос на сервер
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Показать ответ от сервера
        const registrationResponse = document.getElementById(
          "registrationResponse"
        );
        if (data.success) {
          registrationResponse.innerHTML = "<p>Регистрация успешна!</p>";
        } else {
          registrationResponse.innerHTML = `<p>Ошибка: ${data.message}</p>`;
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
        document.getElementById("registrationResponse").innerHTML =
          "<p>Произошла ошибка, попробуйте снова.</p>";
      });
  });
