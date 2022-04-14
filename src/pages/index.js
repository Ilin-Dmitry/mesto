import {
  profileOpenButton,
  nameInput,
  statusInput,
  newCardOpenButton,
  validationConfig,
  avatarLinkOpenButton
} from '../utils/constants.js';

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

import './index.css';

let buttonText;
let userId;


Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({newUserName: userData.name, newUserInfo: userData.about, newUserAvatar: userData.avatar})
    userId = userData._id
    section.renderAllElements(cards)
  })
  .catch(err => {
    console.log('Error # =>', err)
  });



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
  showBtnSubmitStatus(this.popupSubmtButton, true)
  api.editProfile(data.name, data.status)
  .then(res => {
    userInfo.setUserInfo({newUserName: res.name, newUserInfo: res.about, newUserAvatar: res.avatar})
    popupProfile.close()
  })
  .catch((res) => {console.log('error # ',res)})
  .finally(() => showBtnSubmitStatus(this.popupSubmtButton, false))
}


function removeCard (data, card) {
  popupRemoveConfirm.open();
  popupRemoveConfirm.changeSubmitHandler(() => {
    api.deleteCard(data._id)
      .then(() => {
        popupRemoveConfirm.close()
        card._removeCard();
      })
      .catch((res) => {console.log('error # ',res)})
  });

}

function handleClickLikeButton (id, card) {
  if(!card.isCardLiked()) {
    api.addLike(id)
    .then(res => {
      card.changeLikeNumber(res.likes.length)
    })
    .catch((res) => {console.log('error # ',res)})
   } else {
     api.deleteLike(id)
     .then(res => {
      card.changeLikeNumber(res.likes.length)
    })
    .catch((res) => {console.log('error # ',res)})
   }
}

function createCard (data) {
  data.userId = userId;
  const card = new Card(data, '.element__template', popupImage.open, () => {removeCard(data, card)}, (id) => {handleClickLikeButton(id, card)});
  const cardElement = card.createCard();
  return cardElement;
}

function handleNewCardSubmitForm (data) {
  showBtnSubmitStatus(this.popupSubmtButton, true)
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
    section.addItem(newPlace);
    popupNewCard.close();
  })
  .catch((res) => {console.log('error # ',res)})
  .finally(() => showBtnSubmitStatus(this.popupSubmtButton, false))
};

function handleChangeAvatarSubmitForm (res) {
  showBtnSubmitStatus(this.popupSubmtButton, true)
  api.setAvatar(res.avatarLink)
    .then(res => {
      avatarLinkOpenButton.style.backgroundImage = `url(${res.avatar})`
      popupChangeAvatar.close()
    })
    .catch((res) => {console.log('error # ',res)})
    .finally(() => showBtnSubmitStatus(this.popupSubmtButton, false))
}

function openProfilePopup () {
  const profileName = userInfo.getUserInfo().name;
  const profileStatus = userInfo.getUserInfo().info;

  nameInput.setAttribute('value', profileName);
  statusInput.setAttribute('value', profileStatus);
  formValidators.formNameStatus.resetValidation();
  popupProfile.open();
}

function openNewCardPopup () {
  formValidators.formNewItem.resetValidation();
  popupNewCard.open();
}

function openAvatarLinkPopup () {
  formValidators.formNewAvatar.resetValidation();
  popupChangeAvatar.open();
}


function showBtnSubmitStatus (button, isLoading) {
  if(isLoading) {
    buttonText = button.textContent;
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = buttonText;
  }
}
enableValidation(validationConfig);

const popupImage = new PopupWithImage('.popup_sec_img');
const popupProfile = new PopupWithForm('.popup_sec_profile', handleProfileSubmitForm);
const popupNewCard = new PopupWithForm('.popup_sec_new', handleNewCardSubmitForm);
const popupRemoveConfirm = new PopupWithForm('.popup_sec_remove-confirm');
const popupChangeAvatar = new PopupWithForm('.popup_sec_avatar', handleChangeAvatarSubmitForm);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupRemoveConfirm.setEventListeners();
popupChangeAvatar.setEventListeners();

profileOpenButton.addEventListener('click', openProfilePopup);
newCardOpenButton.addEventListener('click', openNewCardPopup);
avatarLinkOpenButton.addEventListener('click', openAvatarLinkPopup);

const section = new Section(createCard, '.elements');
const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userInfoSelector: '.profile__info-status', profileAvatarSelector: '.profile__avatar'})

