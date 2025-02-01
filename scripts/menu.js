// Получаем элементы
const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownContent = document.querySelector(".dropdown-content");

// Обработчик клика по кнопке (открытие/закрытие меню)
dropdownToggle.addEventListener("click", function (event) {
  // Переключаем класс active для отображения/скрытия меню
  dropdown.classList.toggle("active");
  // Блокируем распространение события, чтобы клик по кнопке не закрывал меню
  event.stopPropagation();
});

// Обработчик клика по всему документу
document.addEventListener("click", function (event) {
  // Если клик был вне выпадающего меню, то закрываем его
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});

// Блокируем клик внутри выпадающего меню, чтобы не закрывать его при клике внутри
dropdownContent.addEventListener("click", function (event) {
  event.stopPropagation();
});
