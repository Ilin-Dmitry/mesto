import {image, imageTitle, openPopup, imagePopup} from './index.js'
export class Card {
  constructor (data, templateElementSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = document.querySelector(`${templateElementSelector}`).content;
  }


  _openImagePopup = () => {
      image.src = this._link;
      image.alt = this._name;
      imageTitle.textContent = this._name;

      openPopup (imagePopup);
    }

  _toggleLikeButton = () => {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _removeCard = () => {
    console.log(this._buttonRemove.closest('.element'));
    this._buttonRemove.closest('.element').remove();
  }

  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', this._toggleLikeButton);
    this._buttonRemove.addEventListener('click', this._removeCard);
    this._cardImage.addEventListener('click', this._openImagePopup);
  }
  createCard() {
    this._cardsTemplate = this._templateElement.cloneNode(true);
    this._buttonLike = this._cardsTemplate.querySelector('.element__like');
    this._buttonRemove = this._cardsTemplate.querySelector('.element__remove');
    this._cardImage = this._cardsTemplate.querySelector('.element__picture');

    this._cardsTemplate.querySelector('.element__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._cardsTemplate;
  }
}