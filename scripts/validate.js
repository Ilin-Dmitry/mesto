const formSubmit = (evt) => {
  evt.preventDefault();
};

const checkInputValidity = (config, form, input) => {
  const errorMessage = form.querySelector(`.${input.name}-error`);
  if (input.validity.valid) {
    errorMessage.textContent = "";
    input.classList.remove(config.inputErrorClass);
  } else {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
}

const checkFormValidity = (config, form, button) => {
  if (form.checkValidity()) {
    button.removeAttribute('disabled', false);
    button.classList.remove(config.buttonClassDisabled)
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonClassDisabled);
  }
}


function validateForm(config, form) {
  form.addEventListener('submit', formSubmit);

  const inputs = form.querySelectorAll(config.inputSelector);
  const button = form.querySelector(config.buttonSelector);
  checkFormValidity(config, form, button);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(config, form, input);
      checkFormValidity(config, form, button);
    })
  })
}


const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((item) => {
    validateForm(config, item);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  buttonClassDisabled: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error'
});