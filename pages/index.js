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
const pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя (заголовок на странице)
const pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус (подзаголовок на странице)

const profileButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const popupNew = document.querySelector('.popup_sec_new');
const popupNewForm = document.querySelector('.popup__form_sec_new');
export const imagePopup = document.querySelector('.popup_sec_img');
const profilePopup = document.querySelector('.popup_sec_profile');
export const image = imagePopup.querySelector('.popup__image');
export const imageTitle = imagePopup.querySelector('.popup__image-title');

const closeButtons = document.querySelectorAll('.popup__close-button');
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

// function sayHi () {
//   console.log('hi-hi');
// }
function handleProfileSubmitForm (data) {
  userInfo.setUserInfo({newUserName: data.name, newUserInfo: data.status});
  // pasteName.textContent = data.name;
  // pasteStatus.textContent = data.status; //переносим значение статуса на страницу

  popupProfile.close();//Закрываем popup
  const userData = userInfo.getUserInfo();
  // переопределяем значения по умолчанию
  nameInput.setAttribute('value', userData.name)
  statusInput.setAttribute('value', userData.info);
}

function handleNewCardSubmitForm (data) {
  const newPlace = {
    name: data.place,
    link: data.link
  };
  // newPlace.name = placeInput.value;
  // newPlace.link = linkInput.value;

  section.addItem(createCard(newPlace));
  popupNewCard.close();
};

enableValidation(validationConfig);

const popupImage = new PopupWithImage('.popup_sec_img');
const popupProfile = new PopupWithForm('.popup_sec_profile', handleProfileSubmitForm);
const popupNewCard = new PopupWithForm('.popup_sec_new', handleNewCardSubmitForm);
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupNewCard.setEventListeners();


function handleCardClick(name, link) {
  // image.src = link;
  // image.alt = name;
  // imageTitle.textContent = name;
  // openPopup (imagePopup);
  console.log('name: ',name,'link: ', link);
  popupImage.open(name, link);
}

function createCard (data) {
  const card = new Card(data, '.element__template', popupImage.open);
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard (data) {

  elements.prepend(createCard(data));
}
// initialCards.forEach(renderCard);

//функция открытия попапа
// export function openPopup (item) {
  // item.classList.add('popup_opened');
  // item.addEventListener('mousedown', closeOnOverlay);
  // document.addEventListener('keydown', closeOnEsc);

// }

// //Фунция открывает popup редактирования профиля
// function openPropfilePopup() {
//   formValidators.formNameStatus.resetValidation();

//   openPopup (profilePopup);
//   nameInput.value = pasteName.textContent; // вставляем значение имени на страницу в поле ввода имени
//   statusInput.value = pasteStatus.textContent; //аналогично со статусом
// }
// //Функция открывает popup создания новой карточки
// function openNewCardPopup () {
//   formValidators.formNewItem.resetValidation();
//   openPopup (popupNew);
// }


function removeClassOpened(popup) {
  popup.classList.remove('popup_opened');
}

// function closePopup () {
//   const popupOpened = document.querySelector('.popup_opened');
//   popupOpened.removeEventListener('mousedown', closeOnOverlay);
//   removeClassOpened(popupOpened)
//   document.removeEventListener('keydown', closeOnEsc);
// }

//Функция отправки данных формы
// function handleProfileSubmitForm (evt) {
//   evt.preventDefault();//отменяем перезагрузку страницы
//   pasteName.textContent = nameInput.value;
//   pasteStatus.textContent = statusInput.value; //переносим значение статуса на страницу
//   closePopup();//Закрываем popup

// }





//Функция обработки данных формы new-item
// function createNewCard (evt) {
//   evt.preventDefault();

//   const newPlace = {};
//   newPlace.name = placeInput.value;
//   newPlace.link = linkInput.value;

//   section.addItem(createCard(newPlace));
//   closePopup();
//   placeInput.value = "";//обнуляем значение места в поле ввода
//   linkInput.value = "";


// }

function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup()
  }
}
// function closeOnEsc(evt) {
//   console.log(evt);
//   console.log(evt.key);
//   if (evt.key === 'Escape') {
//     closePopup();
//   }
// }

//добавляем слушатель к каждой кнопке закрытия
// closeButtons.forEach((btn) => {
//   btn.addEventListener('click', closePopup);
// })

//Обработчик кнопки "создать" добавления карточки
// popupNewForm.addEventListener('submit', createNewCard);
//вызываем попап редактирования профиля при клике

function openProfilePopup () {
  formValidators.formNameStatus.resetValidation();
  popupProfile.open();
}

function openNewCardPopup () {
  formValidators.formNewItem.resetValidation();
  popupNewCard.open();
}

profileOpenButton.addEventListener('click', openProfilePopup);
//Обработчик кнопки "сохранить" редактирования профиля
// popupNameForm.addEventListener('submit', handleProfileSubmitForm);
//Обработчик кнопки открытия попапа добавления карточки
profileButton.addEventListener('click', openNewCardPopup);



/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////NEW_CLASSES///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function renderer (item, place) {
  place.append(item);
}



const section = new Section({items: initialCards, renderer: renderCard}, '.elements');
section.renderAllElements();
/////////////////
////REPEAT///////
/*
export function openPopup (item) {
  item.classList.add('popup_opened');
  item.addEventListener('mousedown', closeOnOverlay);
  document.addEventListener('keydown', closeOnEsc);

}


function closePopup () {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.removeEventListener('mousedown', closeOnOverlay);
  removeClassOpened(popupOpened)
  document.removeEventListener('keydown', closeOnEsc);
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


*/
/////////////////















const userInfo = new UserInfo({userNameSelector: '.profile__info-title', userInfoSelector: '.profile__info-status'})
////////////////
////////////////