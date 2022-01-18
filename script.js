let popupOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
let popup = document.querySelector('.popup'); //Определили блок popup
let popupCloseButton = document.querySelector('.popup__close-button');

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

/*
// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
*/


let nameInput = popup.querySelector('.popup__input_set_name'); //имя
let statusInput = popup.querySelector('.popup__input_set_status'); //статус

//console.log(nameInput, statusInput);
function formSubmitHandler (evt) {
  evt.preventDefault();//отменяем перезагрузку страницы
  let name = nameInput.value; //значение inputa имя
  let status = statusInput.value; //значение inputa статуса
  console.log(name, status);

  let pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя
  let pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус

  console.log(pasteName, pasteStatus )
  pasteName.textContent = name;//переносим значение инпута в заголовок
  pasteStatus.textContent = status;

  popupClose();//Закрываем popup

}
let saveButton = document.querySelector('.popup__save-button');
saveButton.addEventListener('click', formSubmitHandler);

