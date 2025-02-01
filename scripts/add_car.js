document.addEventListener("DOMContentLoaded", () => {
  const addCarForm = document.querySelector(".registration-form");

  addCarForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем токен из localStorage
    const token = localStorage.getItem("authToken");

    // Проверяем, есть ли токен
    if (!token) {
      alert("Ошибка: Вы не авторизованы!");
      return;
    }

    const formData = new FormData(addCarForm);

    const carData = {};
    formData.forEach((value, key) => {
      carData[key] = value;
    });

    try {
      const response = await fetch("http://localhost:3000/add-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify(carData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Машина успешно добавлена!");
        addCarForm.reset(); // Очищаем форму
      } else {
        alert(`Ошибка: ${result.error || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка при добавлении машины:", error);
      alert("Произошла ошибка при добавлении машины.");
    }
  });
});
