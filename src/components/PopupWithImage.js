import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  open = (name, link) => {
    const image = this._popup.querySelector('.popup__image');
    const title = this._popup.querySelector('.popup__image-title');
  image.src = link;
  image.alt = name;
  title.textContent = name;
  super.open();
  };
}