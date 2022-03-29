import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const profileOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
const popupNameForm = document.querySelector('.popup__form');//определили форму
const nameInput = popupNameForm.querySelector('.popup__input_set_name'); //поле ввода имени
const statusInput = popupNameForm.querySelector('.popup__input_set_status'); //поле ввода статуса
const newCardOpenButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');

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

const formValidators = {}
//Функция включения валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function handleProfileSubmitForm (data) {
  userInfo.setUserInfo({newUserName: data.name, newUserInfo: data.status});

  popupProfile.close();

  const userData = userInfo.getUserInfo();
  // переопределяем значения по умолчанию
  nameInput.setAttribute('value', userData.name)
  statusInput.setAttribute('value', userData.info);
}

function createCard (data) {
  const card = new Card(data, '.element__template', popupImage.open);
  const cardElement = card.createCard();
  return cardElement;
}

function handleNewCardSubmitForm (data) {
  const newPlace = {
    name: data.place,
    link: data.link
  };
  section.addItem(createCard(newPlace));
  popupNewCard.close();
};

function renderCard (data) {
  elements.prepend(createCard(data));
}

function openProfilePopup () {
  formValidators.formNameStatus.resetValidation();
  popupProfile.open();
}

function openNewCardPopup () {
  formValidators.formNewItem.resetValidation();
  popupNewCard.open();
}

enableValidation(validationConfig);

const popupImage = new PopupWithImage('.popup_sec_img');
const popupProfile = new PopupWithForm('.popup_sec_profile', handleProfileSubmitForm);
const popupNewCard = new PopupWithForm('.popup_sec_new', handleNewCardSubmitForm);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupNewCard.setEventListeners();

profileOpenButton.addEventListener('click', openProfilePopup);
newCardOpenButton.addEventListener('click', openNewCardPopup);

const section = new Section({items: initialCards, renderer: renderCard}, '.elements');
section.renderAllElements();

const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userInfoSelector: '.profile__info-status'})