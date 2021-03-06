import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmitForm) {
    super (popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this.popupSubmtButton = this._form.querySelector('.popup__submit-button')
  }

  _getInputValues () {
    this._inputsValues = {}
    this._inputsList.forEach((input) => {
      const value = input.value;
      this._inputsValues[input.name] = value;
    })
    return this._inputsValues;

  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmitForm = newSubmitHandler;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', () => this._handleSubmitForm(this._getInputValues()));
  };

  close = () => {
    super.close();
    this._form.reset();
  };
}