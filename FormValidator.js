const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  buttonClassDisabled: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error'
}

class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
  }

  _checkInputValidity (input) {
    const errorMessage = this._form.querySelector(`.${input.name}-error`);
    if (input.validity.valid) {
      errorMessage.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    } else {
      errorMessage.textContent = input.validationMessage;
      input.classList.add(this._config.inputErrorClass);
    }
  }

  _checkFormValidity (button) {
    if (this._form.checkValidity()) {
      button.removeAttribute('disabled', false);
      button.classList.remove(this._config.buttonClassDisabled)
    } else {
      button.setAttribute('disabled', true);
      button.classList.add(this._config.buttonClassDisabled);
    }
  }

  enableValidation (config) {
    this._form.addEventListener('submit', formSubmit);

    const inputs = this._form.querySelectorAll(this._config.inputSelector);
    const button = this._form.querySelector(this._config.buttonSelector);
    this._checkFormValidity(button);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._checkFormValidity(button);
      })
    })
  }
}