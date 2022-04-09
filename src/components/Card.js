export class Card {
  constructor (data, templateElementSelector, handleCardClick, handleRemoveBtnClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    console.log(data, this._userId, this._ownerId);

    this._templateElement = document.querySelector(`${templateElementSelector}`).content;
    this._handleCardClick = handleCardClick;
    this._handleRemoveBtnClick = handleRemoveBtnClick;
  }

  _toggleLikeButton = () => {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _removeCard = () => {
    this._buttonRemove.closest('.element').remove();
  }

  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', this._toggleLikeButton);
    this._buttonRemove.addEventListener('click', () => {this._handleRemoveBtnClick(this._id)});
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  _setLikesNumber () {
    const likeNumberElement = this._cardsTemplate.querySelector('.element__like-number');
    likeNumberElement.textContent = this._likes.length;
  }
  createCard() {
    this._cardsTemplate = this._templateElement.cloneNode(true);
    this._buttonLike = this._cardsTemplate.querySelector('.element__like');
    this._buttonRemove = this._cardsTemplate.querySelector('.element__remove');
    this._cardImage = this._cardsTemplate.querySelector('.element__picture');

    this._cardsTemplate.querySelector('.element__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setLikesNumber();
    this._setEventListeners();

    if (this._userId !== this._ownerId) {
      this._buttonRemove.style.display = 'none';
    }
    return this._cardsTemplate;
  }
}