import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmitForm) {
    super (popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues () {
    this._inputsValues = {}
    this._inputsList.forEach((input) => {
      const value = input.value;
      this._inputsValues[input.name] = value;
    })
    return this._inputsValues;

  }

  setEventListeners = () => {
    super.setEventListeners();
    // document.addEventListener('keydown', this._handleEscClose);
    this._form.addEventListener('submit',() => this._handleSubmitForm(this._getInputValues()));

    //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  };

  close = () => {
    super.close();
    this._form.reset();
  };

  // open = () => {
  //   console.log(this._handleEscClose);

  //   //отвечают за открытие и закрытие попапа.
  //   this._popup.classList.add('popup_opened');
  //   document.addEventListener('keydown', this._handleEscClose);
  // };
}