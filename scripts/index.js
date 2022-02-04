let popupOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
let popup = document.querySelector('.popup'); //Определили блок popup
let popupCloseButton = document.querySelector('.popup__close-button');//определили крестик
let popupNameForm = document.querySelector('.popup__form');//определили форму
let nameInput = popup.querySelector('.popup__input_set_name'); //поле ввода имени
let statusInput = popup.querySelector('.popup__input_set_status'); //поле ввода статуса
let pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя (заголовок на странице)
let pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус (подзаголовок на странице)

const profileButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.element__template').content;
const newItemCreateButton = document.querySelector('.new-item__create-button');


const newItem = document.querySelector('.new-item');
const newItemCloseButton = document.querySelector('.new-item__close-button');





const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//добавляем initialCards на страницу
initialCards.forEach(function (el) {
  const cardsTemplate = templateElement.cloneNode(true);

  cardsTemplate.querySelector('.element__name').textContent = el.name;
  cardsTemplate.querySelector('.element__picture').src = el.link;
  elements.append(cardsTemplate);
})


//эта фунция добавляет popup класс popup_opened и вставляет в инпуты значения со страницы
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = pasteName.textContent; // вставляем значение имени на страницу в поле ввода имени
  statusInput.value = pasteStatus.textContent; //аналогично со статусом
}


//функция удаляет popup_opened
function popupClose() {
  popup.classList.remove('popup_opened');
}

function newItemOpen () {
  newItem.classList.add('new-item_opened');
}

function newItemClose () {
  newItem.classList.remove('new-item_opened');
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


//Функция добавления карточки в начало страницы
function addCardBefore (item) {
  const cardsTemplate = templateElement.cloneNode(true);
  cardsTemplate.querySelector('.element__name').textContent = item.name;
  cardsTemplate.querySelector('.element__picture').src = item.link;
  elements.append(cardsTemplate);
}

//Функция обработки данных формы new-item
function newItemFormHandler (evt) {
  evt.preventDefault();
  const placeInputValue = document.querySelector('.new-item__input_set_place').value;
  const linkInputValue = document.querySelector('.new-item__input_set_link').value;
  let newPlace = {};
  newPlace.name = placeInputValue;
  newPlace.link = linkInputValue;

  addCardBefore(newPlace);
}

newItemCreateButton.addEventListener('click', newItemFormHandler)

//вызываем функцию popupOpen при клике
popupOpenButton.addEventListener('click', popupOpen);
//вызываем функцию удаления popup_opened, если нажали на крестик
popupCloseButton.addEventListener('click', popupClose);
//выполняем функцию отправки формы
popupNameForm.addEventListener('submit', formSubmitHandler);

profileButton.addEventListener('click', newItemOpen);
newItemCloseButton.addEventListener('click', newItemClose);
//test





