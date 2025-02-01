document
  .getElementById("updateCarForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const carId = document.getElementById("car_id").value;
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;
    const price = document.getElementById("price").value;
    const mileage = document.getElementById("mileage").value;
    const fueltype = document.getElementById("fueltype").value;
    const transmission = document.getElementById("transmission").value;
    const description = document.getElementById("description").value;

    // Получаем токен из localStorage
    const token = localStorage.getItem("authToken");

    // Если токен не найден, показываем ошибку и выходим
    if (!token) {
      alert("Вы не авторизованы!");
      return;
    }

    // Проверка на пустые значения
    if (
      !carId ||
      !brand ||
      !model ||
      !year ||
      !price ||
      !mileage ||
      !fueltype ||
      !transmission ||
      !description
    ) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    // Вывод в консоль для отладки
    console.log({
      carId,
      brand,
      model,
      year,
      price,
      mileage,
      fueltype,
      transmission,
      description,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/update-car/${carId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
          },
          body: JSON.stringify({
            brand,
            model,
            year,
            price,
            mileage,
            fueltype,
            transmission,
            description,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Машина успешно обновлена!");
      } else {
        alert(`Ошибка: ${data.error || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка при обновлении машины:", error);
      alert("Ошибка при обновлении машины.");
    }
  });
