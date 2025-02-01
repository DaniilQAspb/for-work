document.addEventListener("DOMContentLoaded", () => {
  const deleteCarForm = document.getElementById("deleteCarForm");
  const carDetails = document.getElementById("carDetails");

  deleteCarForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const carId = document.getElementById("car_id").value.trim();

    if (!carId) {
      carDetails.innerHTML = "<p>Пожалуйста, введите ID автомобиля.</p>";
      return;
    }

    try {
      // Отправляем запрос на удаление машины
      const response = await fetch(`/delete-car/${carId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        carDetails.innerHTML = `<p>Машина с ID ${carId} успешно удалена.</p>`;
      } else {
        carDetails.innerHTML = `<p>Ошибка: ${result.error}</p>`;
      }
    } catch (error) {
      carDetails.innerHTML = `<p>Произошла ошибка: ${error.message}</p>`;
    }
  });
});
