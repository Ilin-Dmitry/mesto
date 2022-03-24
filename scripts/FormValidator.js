export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
  }

  _formSubmit(evt) {
    evt.preventDefault();
  };


  _hideError = (input) => {
    this._errorMessage.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  }

  _showError (input) {
    this._errorMessage.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _checkInputValidity (input) {
    this._errorMessage = this._form.querySelector(`.${input.name}-error`);
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _toggleButtonState () {
    if (this._form.checkValidity()) {
      this._button.removeAttribute('disabled', false);
      this._button.classList.remove(this._config.buttonClassDisabled)
    } else {
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._config.buttonClassDisabled);
    }
  }

  enableValidation () {
    this._form.addEventListener('submit', this._formSubmit);


    this._button = this._form.querySelector(this._config.buttonSelector);
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();

      })
    })
  }

  resetValidation () {

    this._form.reset();
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._errorMessage = this._form.querySelector(`.${input.name}-error`);
      this._hideError(input);
    })
  }

}