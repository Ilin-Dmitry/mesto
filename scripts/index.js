let popupOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
let popup = document.querySelector('.popup'); //Определили блок popup
let popupCloseButton = document.querySelector('.popup__close-button');//определили крестик
let popupNameForm = document.querySelector('.popup__form');//определили форму
let nameInput = popup.querySelector('.popup__input_set_name'); //поле ввода имени
let statusInput = popup.querySelector('.popup__input_set_status'); //поле ввода статуса
let pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя (заголовок на странице)
let pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус (подзаголовок на странице)


//эта фунция добавляет popup класс popup_opened и вставляет в инпуты значения со страницы
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = pasteName.textContent; // вставляем значение имени на страницуе в поле ввода имени
  statusInput.value = pasteStatus.textContent; //аналогично со статусом
}


//функция удаляет popup_opened
function popupClose() {
  popup.classList.remove('popup_opened');
}



/*
//функцию удаления popup_opened, если нажали мимо формы
function popupCloseField() {
  //console.log(event.target, event.currentTarget); //Если раскомментировать, увидим значения таргетов
  if (event.target === event.currentTarget) {
    popupClose()
  }
}

//и вызов этой функции
popup.addEventListener('click', popupCloseField);

*/


//Функция отправки данных формы
function formSubmitHandler (evt) {
  evt.preventDefault();//отменяем перезагрузку страницы


  let name //объявили переменную, в которой хранится введенное значение имени
  let status // объявили переменную, в которой хранится введенное значение статуса


  name = nameInput.value; //берем значение из поля ввода
  status = statusInput.value; //берем значение из поля ввода


  pasteName.textContent = name;//переносим значение инпута в заголовок
  pasteStatus.textContent = status; //переносим значение статуса на страницу

  popupClose();//Закрываем popup
}

//вызываем функцию popupOpen при клике
popupOpenButton.addEventListener('click', popupOpen);
//вызываем функцию удаления popup_opened, если нажали на крестик
popupCloseButton.addEventListener('click', popupClose);
//выполняем функцию отправки формы
popupNameForm.addEventListener('submit', formSubmitHandler);






