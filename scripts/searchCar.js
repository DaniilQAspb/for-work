document
  .getElementById("searchCarForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const carId = document.getElementById("car_id").value;
    const responseContainer = document.getElementById("carDetails");

    // Получаем токен из localStorage
    const token = localStorage.getItem("authToken");

    // Если токен не найден, показываем ошибку и выходим
    if (!token) {
      responseContainer.innerHTML = `<p style="color: red;">Ошибка: Вы не авторизованы!</p>`;
      return;
    }

    try {
      // Отправляем запрос на сервер с токеном в заголовке
      const response = await fetch(`http://localhost:3000/car/${carId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Машина не найдена или ошибка авторизации");
      }

      const carData = await response.json();

      // Отображаем информацию о машине
      responseContainer.innerHTML = ` 
        <h3 style="text-align: center;">Информация о машине:</h3>
        <p><strong>Бренд:</strong> ${carData.brand}</p>
        <p><strong>Модель:</strong> ${carData.model}</p>
        <p><strong>Год:</strong> ${carData.year}</p>
        <p><strong>Цена:</strong> ${carData.price}</p>
        <p><strong>Пробег:</strong> ${carData.mileage}</p>
        <p><strong>Тип топлива:</strong> ${carData.fueltype}</p>
        <p><strong>Трансмиссия:</strong> ${carData.transmission}</p>
        <p><strong>Описание:</strong> ${carData.description}</p>
      `;
    } catch (error) {
      responseContainer.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
  });
