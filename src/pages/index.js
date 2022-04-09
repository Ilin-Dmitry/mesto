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
import { api } from "../components/Api.js";


import './index.css';

let userId

api.getProfile()
.then(res => {
  userInfo.setUserInfo({newUserName: res.name, newUserInfo: res.about})
  userId = res._id
  console.log('UserID', userId);
})

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
  api.editProfile(data.name, data.status)
  .then(res => {userInfo.setUserInfo({newUserName: res.name, newUserInfo: res.about})
  })
  popupProfile.close()
}

function createCard (data) {
  console.log('createCard (data) это оунер', data.owner._id);
  console.log("userId это юзер", userId);
  console.log('стр 52',data);
  data.userId = userId;



  const card = new Card(data, '.element__template', popupImage.open, (id) => {
    // console.log('id1', data._id);
    // console.log('data.id', data.id);

    popupRemoveConfirm.open();
    popupRemoveConfirm.changeSubmitHandler(() => {
      // console.log('id2', data._id);
      api.deleteCard(data._id)
        .then(res => {
          popupRemoveConfirm.close()
          // console.log(res)
          card._removeCard();
        })
    });
  });
  const cardElement = card.createCard();
  return cardElement;
}


function handleNewCardSubmitForm (data) {

  api.addCard(data.place, data.link)
  .then(res => {
    const newPlace = {
      name: res.name,
      link: res.link,
      likes: res.likes,
      _id: res._id,
      owner: res.owner,
      userId: userId
    }
    // console.log(newPlace);
    section.addItem(newPlace);
  })

  popupNewCard.close();
};

function openProfilePopup () {
  const profileName = document.querySelector('.profile__info-title').textContent;
  const profileStatus = document.querySelector('.profile__info-status').textContent;
  nameInput.setAttribute('value', profileName);
  statusInput.setAttribute('value', profileStatus);
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
// const popupRemoveConfirm = new PopupWithForm('.popup_sec_remove-confirm', () => {
//   api.deleteCard('625130be3407a100bb11b3ca')
//     .then(res => {
//       console.log('res', res)
//     })
//   // console.log('delete');
//   popupRemoveConfirm.close();
// });

const popupRemoveConfirm = new PopupWithForm('.popup_sec_remove-confirm');

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupRemoveConfirm.setEventListeners();

profileOpenButton.addEventListener('click', openProfilePopup);
newCardOpenButton.addEventListener('click', openNewCardPopup);

const section = new Section({items: initialCards, renderer: createCard}, '.elements');
// section.renderAllElements();

const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userInfoSelector: '.profile__info-status'})





api.getInitialCards()
.then(cards => {
  const section = new Section({items: cards, renderer: createCard}, '.elements');
  section.renderAllElements();

})
