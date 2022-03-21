export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
  }

  _formSubmit(evt) {
    evt.preventDefault();
  };

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

    const inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._button = this._form.querySelector(this._config.buttonSelector);
    this._toggleButtonState();
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();

      })
    })
  }



}