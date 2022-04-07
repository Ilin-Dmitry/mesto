import {
  profileOpenButton,
  nameInput,
  statusInput,
  newCardOpenButton,
  initialCards,
  validationConfig
} from '../utils/constants.js';

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import './index.css';



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
  section.addItem(newPlace);
  popupNewCard.close();
};

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

const section = new Section({items: initialCards, renderer: createCard}, '.elements');
section.renderAllElements();

const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userInfoSelector: '.profile__info-status'})