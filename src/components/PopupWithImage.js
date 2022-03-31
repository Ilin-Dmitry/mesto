import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  open = (name, link) => {
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__image-title');
  this._image.src = link;
  this._image.alt = name;
  this._title.textContent = name;
  super.open();
  };
}