export const profileOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
const popupNameForm = document.querySelector('.popup__form');//определили форму
export const nameInput = popupNameForm.querySelector('.popup__input_set_name'); //поле ввода имени
export const statusInput = popupNameForm.querySelector('.popup__input_set_status'); //поле ввода статуса
export const newCardOpenButton = document.querySelector('.profile__button');
export const avatarLinkOpenButton = document.querySelector('.profile__avatar');
export const buttonText = {};
export const userId = {};


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  buttonClassDisabled: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error'
}