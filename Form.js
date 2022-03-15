class Card {
  constructor (data, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
  }

  createCard() {
    const cardsTemplate = this._templateElement.cloneNode(true);
    cardsTemplate.querySelector('.element__name').textContent = el.name;
    cardsTemplate.querySelector('.element__picture').src = el.link;
    cardsTemplate.querySelector('.element__picture').alt = el.name;
  }

  function createCard (el) {
    const cardsTemplate = templateElement.cloneNode(true);
    cardsTemplate.querySelector('.element__name').textContent = el.name;
    cardsTemplate.querySelector('.element__picture').src = el.link;
    cardsTemplate.querySelector('.element__picture').alt = el.name;
    //добавляем обработчик лайка
    cardsTemplate.querySelector('.element__like').addEventListener('click', toggleLikeButton);
    //добавляем обработчик удаления карточки
    cardsTemplate.querySelector('.element__remove').addEventListener('click', removeCard);
    //добавим обработчик открытия картинки
    cardsTemplate.querySelector('.element__picture').addEventListener('click', openImagePopup);
    return cardsTemplate;
  }

}


const cardNew = new Card()