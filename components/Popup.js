export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open  ()  {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  _handleEscClose = (evt) => {
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
  };
}