import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
const popupOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
const popupCloseButton = document.querySelector('.popup__close-button');//определили крестик
const popupNameForm = document.querySelector('.popup__form');//определили форму
const nameInput = popupNameForm.querySelector('.popup__input_set_name'); //поле ввода имени
const statusInput = popupNameForm.querySelector('.popup__input_set_status'); //поле ввода статуса
const pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя (заголовок на странице)
const pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус (подзаголовок на странице)

const profileButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.element__template').content;
const popupCreateButton = document.querySelector('.popup__submit-button_type_create');
const popupProfileForm = document.querySelector('.popup__form_sec_profile');
const popupNew = document.querySelector('.popup_sec_new');
const popupNewForm = document.querySelector('.popup__form_sec_new');
export const imagePopup = document.querySelector('.popup_sec_img');
const profilePopup = document.querySelector('.popup_sec_profile');
export const image = imagePopup.querySelector('.popup__image');
export const imageTitle = imagePopup.querySelector('.popup__image-title');

const btnClose = document.querySelectorAll('.popup__close-button');
const popupList = document.querySelectorAll('.popup');
const placeInput = document.querySelector('.popup__input_set_place');
const linkInput = document.querySelector('.popup__input_set_link');

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  buttonClassDisabled: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error'
}

const popupNewFormValidator = new FormValidator(validationConfig, popupNewForm);
const popupProfileFormValidator = new FormValidator(validationConfig, popupProfileForm);
popupNewFormValidator.enableValidation();
popupProfileFormValidator.enableValidation();


function renderCard (data) {
  const cardItem = new Card(data, '.element__template')
  elements.prepend(cardItem.createCard())
}
initialCards.forEach(renderCard);

//функция открытия попапа
export function openPopup (item) {
  item.classList.add('popup_opened');
  //добавляем слушатели закрытия попапа
  item.addEventListener('mousedown', closeOnOverlay);
  document.addEventListener('keydown', closeOnEsc);

}

//Фунция открывает popup редактирования профиля
function openPropfilePopup() {

  openPopup (profilePopup);
  nameInput.value = pasteName.textContent; // вставляем значение имени на страницу в поле ввода имени
  statusInput.value = pasteStatus.textContent; //аналогично со статусом
}
//Функция открывает popup создания новой карточки
function openNewCardPopup (evt) {
  openPopup (popupNew);
}


function removeClassOpened(popup) {
  popup.classList.remove('popup_opened');
}

function closePopup () {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.removeEventListener('mousedown', closeOnOverlay);
  removeClassOpened(popupOpened)
  document.removeEventListener('keydown', closeOnEsc);
}

//Функция отправки данных формы
function handleSubmitForm (evt) {
  evt.preventDefault();//отменяем перезагрузку страницы
  pasteName.textContent = nameInput.value;
  pasteStatus.textContent = statusInput.value; //переносим значение статуса на страницу
  closePopup();//Закрываем popup

}


function setBtnClassDisabled () {
  popupCreateButton.classList.add('popup__submit-button_disabled');
}

function setBtnAttrDisabled () {
  popupCreateButton.setAttribute('disabled', true);
}

//Функция обработки данных формы new-item
function createNewCard (evt) {
  evt.preventDefault();

  const newPlace = {};
  newPlace.name = placeInput.value;
  newPlace.link = linkInput.value;
  renderCard(newPlace);
  closePopup();
  placeInput.value = "";//обнуляем значение места в поле ввода
  linkInput.value = "";
  setBtnClassDisabled();
  setBtnAttrDisabled();
}

function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup()
  }
}
function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

//добавляем слушатель к каждой кнопке закрытия
btnClose.forEach((btn) => {
  btn.addEventListener('click', closePopup);
})

//Обработчик кнопки "создать" добавления карточки
popupNewForm.addEventListener('submit', createNewCard);
//вызываем попап редактирования профиля при клике
popupOpenButton.addEventListener('click', openPropfilePopup);
//Обработчик кнопки "сохранить" редактирования профиля
popupNameForm.addEventListener('submit', handleSubmitForm);
//Обработчик кнопки открытия попапа добавления карточки
profileButton.addEventListener('click', openNewCardPopup);






