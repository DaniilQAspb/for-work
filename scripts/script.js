/*
// Найдем кнопку по ID
const submitButton = document.getElementById("submitButton");

// Добавим обработчик события на клик по кнопке

submitButton.addEventListener("click", function (event) {
  // Останавливаем обычное поведение формы (она не будет отправляться)
  event.preventDefault();
  // Найдем значение поля имени
  const name = document.getElementById("name").value;
  // Покажем сообщение с именем
  alert("Форма отправлена! Привет " + name);
});
*/

/*const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const result = document.getElementById("result");
  result.textContent = name;
});
