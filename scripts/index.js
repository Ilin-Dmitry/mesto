const popup = document.querySelector('.popup'); //Определили блок popup
const popupOpenButton = document.querySelector('.profile__info-edit-button'); //определили блок с кнопкой
const popupCloseButton = document.querySelector('.popup__close-button');//определили крестик
const popupNameForm = document.querySelector('.popup__form');//определили форму
const nameInput = popupNameForm.querySelector('.popup__input_set_name'); //поле ввода имени
const statusInput = popupNameForm.querySelector('.popup__input_set_status'); //поле ввода статуса
const pasteName = document.querySelector('.profile__info-title');//сюда вставляем имя (заголовок на странице)
const pasteStatus = document.querySelector('.profile__info-status');// сюда вставляем статус (подзаголовок на странице)

const profileButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('.element__template').content;
const popupCreateButton = document.querySelector('.popup__submit-button_type_create');

const popupNew = document.querySelector('.popup_sec_new');
// const newItemCloseButton = document.querySelector('.new-item__close-button');

const imagePopup = document.querySelector('.popup_sec_img');




const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//добавляем initialCards на страницу
initialCards.forEach(function (el) {
  const cardsTemplate = templateElement.cloneNode(true);

  cardsTemplate.querySelector('.element__name').textContent = el.name;
  cardsTemplate.querySelector('.element__picture').src = el.link;
  cardsTemplate.querySelector('.element__picture').alt = el.name;
  //добавляем обработчик лайка
  cardsTemplate.querySelector('.element__like').addEventListener('click', likeToggle);
  //добавляем обработчик удаления карточки
  cardsTemplate.querySelector('.element__remove').addEventListener('click', removeElement);
  //добавим обработчик открытия картинки
  cardsTemplate.querySelector('.element__picture').addEventListener('click', imagePopupOpen)

  elements.append(cardsTemplate);
})



//эта фунция добавляет popup класс popup_opened и вставляет в инпуты значения со страницы
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = pasteName.textContent; // вставляем значение имени на страницу в поле ввода имени
  statusInput.value = pasteStatus.textContent; //аналогично со статусом
  closeBtnPopup()
}

function popupNewOpen (evt) {
  popupNew.classList.add('popup_opened');
  closeBtnPopup ();
}
//закрытие popup при нажатии на крестик
 function closeBtnPopup () {
  const popupOpened = document.querySelector('.popup_opened');
  const btnClose = popupOpened.querySelector('.popup__close-button');
  btnClose.addEventListener('click', closePopup)
 }
//закрытие popup
function closePopup () {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
}

//Функция открытия картинки
function imagePopupOpen (evt) {
  const target = evt.target;
  const title = target.closest('.element').querySelector('.element__name');
  const image = imagePopup.querySelector('.popup__image');
  image.src = target.src;
  imagePopup.querySelector('.popup__image-title').textContent = title.textContent;
  imagePopup.querySelector('.popup__close-button').addEventListener('click', closeBtnPopup);
  imagePopup.classList.add('popup_opened');
}


//Функция отправки данных формы
function formSubmitHandler (evt) {
  evt.preventDefault();//отменяем перезагрузку страницы


  let name //объявили переменную, в которой хранится введенное значение имени
  let status // объявили переменную, в которой хранится введенное значение статуса


  name = nameInput.value; //берем значение из поля ввода
  status = statusInput.value; //берем значение из поля ввода


  pasteName.textContent = name;//переносим значение инпута в заголовок
  pasteStatus.textContent = status; //переносим значение статуса на страницу

  closePopup();//Закрываем popup
}


//Функция добавления карточки в начало страницы
function addCardBefore (item) {
  const cardsTemplate = templateElement.cloneNode(true);
  cardsTemplate.querySelector('.element__name').textContent = item.name;
  cardsTemplate.querySelector('.element__picture').src = item.link;
  cardsTemplate.querySelector('.element__picture').alt = item.name;
  //добавляем обработчик лайка для вновь добавленых элементов
  cardsTemplate.querySelector('.element__like').addEventListener('click', likeToggle);
  //добавляем обработчик удаления карточки
  cardsTemplate.querySelector('.element__remove').addEventListener('click', removeElement);
  cardsTemplate.querySelector('.element__picture').addEventListener('click', imagePopupOpen);

  elements.prepend(cardsTemplate);

}

//Функция обработки данных формы new-item
function createNewCard (evt) {
  evt.preventDefault();
  const placeInputValue = document.querySelector('.popup__input_set_place').value;
  document.querySelector('.popup__input_set_place').value = "";//обнуляем значение места в поле ввода
  const linkInputValue = document.querySelector('.popup__input_set_link').value;
  document.querySelector('.popup__input_set_link').value = "";//обнуляем значение ссылки в поле ввода

  let newPlace = {};
  newPlace.name = placeInputValue;
  newPlace.link = linkInputValue;

  addCardBefore(newPlace);

  closePopup ();
}


function likeToggle (evt) {
  evt.target.classList.toggle('element__like_active');
}

function removeElement (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.element').remove();
}




popupCreateButton.addEventListener('click', createNewCard);

//вызываем функцию popupOpen при клике
popupOpenButton.addEventListener('click', popupOpen);
//вызываем функцию удаления popup_opened, если нажали на крестик
//popupCloseButton.addEventListener('click', popupClose);
//выполняем функцию отправки формы
popupNameForm.addEventListener('submit', formSubmitHandler);

profileButton.addEventListener('click', popupNewOpen);
//newItemCloseButton.addEventListener('click', newItemClose);



//popupCloseButton.addEventListener('click', closePopup);
