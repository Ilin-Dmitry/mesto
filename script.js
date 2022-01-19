let popupOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
let popup = document.querySelector('.popup'); //Определили блок popup
let popupCloseButton = document.querySelector('.popup__close-button');//определили крестик

//эта фунция добавляет popup класс popup_opened
function popupOpen() {
  popup.classList.add('popup_opened');
}

//вызываем функцию popupOpen при клике
popupOpenButton.addEventListener('click', popupOpen);

//функция удаляет popup_opened
function popupClose() {
  popup.classList.remove('popup_opened');
}

//вызываем функцию удаления popup_opened, если нажали на крестик
popupCloseButton.addEventListener('click', popupClose);

//функцию удаления popup_opened, если нажали мимо формы
function popupCloseField() {
  //console.log(event.target, event.currentTarget); //Если раскомментировать, увидим значения таргетов
  if (event.target === event.currentTarget) {
    popupClose()
  }
}

//и вызов этой функции
popup.addEventListener('click', popupCloseField);




let nameInput = popup.querySelector('.popup__input_set_name'); //поле ввода имени
let statusInput = popup.querySelector('.popup__input_set_status'); //поле ввода статуса

//Функция отправки данных формы
function formSubmitHandler (evt) {
  evt.preventDefault();//отменяем перезагрузку страницы

  let pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя (заголовок на странице)
  let pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус (подзаголовок на странице)
  let name //объявили переменную, в которой хранится введенное значение имени
  let status // объявили переменную, в которой хранится введенное значение статуса

  //здесь сброс значения имени, если введено пустое поле
  if (nameInput.value !== "") {
    name = nameInput.value; //берем значение из поля ввода
  } else {
    name = pasteName.textContent; //значение на странице оставляем прежним
    nameInput.value = name; // а плейсхолдер берем уже со страницы
  }

  //здесь сброс значения статуса, если введено пустое поле
  if (statusInput.value !== "") {
    status = statusInput.value; //берем значение из поля ввода
  } else {
    status = pasteStatus.textContent; //значение на странице оставляем прежним
    statusInput.value = status; // а плейсхолдер берем уже со страницы
  }

  pasteName.textContent = name;//переносим значение инпута в заголовок
  pasteStatus.textContent = status; //переносим значение статуса на страницу

  popupClose();//Закрываем popup
}

popup.addEventListener('submit', formSubmitHandler); //выполняем функцию отправки формы






