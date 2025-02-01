document.addEventListener("DOMContentLoaded", () => {
  const fields = document.querySelectorAll('input[name="fields"]');
  const updateCarForm = document.getElementById("updateCarForm");
  const updateFields = document.getElementById("updateFields");

  // Обработчик для изменения состояния чекбоксов
  fields.forEach((field) => {
    field.addEventListener("change", (e) => {
      const fieldValue = e.target.value;
      const fieldContainer = document.getElementById(`${fieldValue}Field`);

      // Показываем или скрываем соответствующие поля
      if (e.target.checked) {
        fieldContainer.style.display = "block";
      } else {
        fieldContainer.style.display = "none";
      }

      // Показываем сам контейнер для всех полей, если хотя бы одно поле выбрано
      if (Array.from(fields).some((f) => f.checked)) {
        updateFields.style.display = "block";
      } else {
        updateFields.style.display = "none";
      }
    });
  });

  // Инициализация состояния полей на старте
  fields.forEach((field) => {
    if (field.checked) {
      const fieldContainer = document.getElementById(`${field.value}Field`);
      fieldContainer.style.display = "block";
    }
  });

  // Обработчик для отправки формы
  updateCarForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы

    const carId = document.getElementById("car_id").value;
    const selectedFields = document.querySelectorAll(
      'input[name="fields"]:checked'
    );
    const updates = {};

    // Получаем токен из localStorage
    const token = localStorage.getItem("authToken");

    // Если токен не найден, показываем ошибку и выходим
    if (!token) {
      alert("Вы не авторизованы!");
      return;
    }

    // Собираем данные для обновления
    selectedFields.forEach((checkbox) => {
      const fieldName = checkbox.value;
      const fieldValue = document.getElementById(fieldName).value;
      if (fieldValue) {
        updates[fieldName] = fieldValue;
      }
    });

    // Если хотя бы одно поле выбрано для обновления
    if (Object.keys(updates).length > 0 && carId) {
      try {
        const response = await fetch(`/update-car/${carId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
          body: JSON.stringify(updates),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Данные успешно обновлены!");
          console.log(result);
        } else {
          alert(result.error || "Что-то пошло не так");
        }
      } catch (error) {
        console.error("Ошибка при отправке PATCH-запроса:", error);
        alert("Произошла ошибка при обновлении данных.");
      }
    } else {
      alert("Пожалуйста, выберите хотя бы одно поле для обновления.");
    }
  });
});
