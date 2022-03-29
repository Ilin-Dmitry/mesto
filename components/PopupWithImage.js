import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  open = (name, link) => {
    //popup__image
    //popup__image-title
    const image = this._popup.querySelector('.popup__image');
    const title = this._popup.querySelector('.popup__image-title');
  image.src = link;
  image.alt = name;
  title.textContent = name;
  super.open();
  // this._popup.classList.add('popup_opened');
  //   document.addEventListener('keydown', this._handleEscClose);
    //нужно вставлять в попап картинку с src изображения и подписью к картинке
  };
}