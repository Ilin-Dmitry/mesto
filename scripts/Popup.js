export class Popup {
  //Создайте класс Popup, который отвечает за открытие и закрытие попапа.
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open  ()  {

    //отвечают за открытие и закрытие попапа.
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  close () {
    //отвечают за открытие и закрытие попапа.
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  _handleEscClose = (evt) => {
    //содержит логику закрытия попапа клавишей Esc.
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners  ()  {
    this._closeBtn.addEventListener('click', this.close);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    //?????!!!!!!! document.addEventListener('keydown', this._handleEscClose);
    //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  };
}