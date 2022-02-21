
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
const popupNewForm = document.querySelector('.popup__form_sec_new');
const imagePopup = document.querySelector('.popup_sec_img');
const profilePopup = document.querySelector('.popup_sec_profile');
const image = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__image-title');

const btnClose = document.querySelectorAll('.popup__close-button');
const popupList = document.querySelectorAll('.popup');
const placeInput = document.querySelector('.popup__input_set_place');
const linkInput = document.querySelector('.popup__input_set_link');

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


//Функция создания карточки
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
//Функция отрисовки карточки
function renderCard (el) {
  elements.prepend(createCard(el));
}
initialCards.forEach(renderCard);
//функция открытия попапа
function openPopup (item) {
  item.classList.add('popup_opened');
  //добавляем слушатели закрытия попапа
  item.addEventListener('mousedown', closeOnOverlay);
  document.addEventListener('keydown', closeOnEsc);

}
//Фунция открывает popup редактирования профиля
function openPropfilePopup() {
  openPopup (profilePopup);
  nameInput.value = pasteName.textContent; // вставляем значение имени на страницу в поле ввода имени
  statusInput.value = pasteStatus.textContent; //аналогично со статусом
}
//Функция открывает popup создания новой карточки
function openNewCardPopup (evt) {
  openPopup (popupNew);
}

//Функция открытия картинки
function openImagePopup (evt) {
  const target = evt.target;
  const title = target.closest('.element').querySelector('.element__name');
  image.src = target.src;
  image.alt = title.textContent;
  imageTitle.textContent = title.textContent;

  openPopup (imagePopup);
}

function removeClassOpened(popup) {
  popup.classList.remove('popup_opened');
}

function closePopup () {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.removeEventListener('mousedown', closeOnOverlay);
  removeClassOpened(popupOpened)
  document.removeEventListener('keydown', closeOnEsc);
}

//Функция отправки данных формы
function handleSubmitForm (evt) {
  evt.preventDefault();//отменяем перезагрузку страницы
  pasteName.textContent = nameInput.value;
  pasteStatus.textContent = statusInput.value; //переносим значение статуса на страницу
  closePopup();//Закрываем popup
}


function disableSubmitBtn () {
  popupCreateButton.classList.add('popup__submit-button_disabled');
}

//Функция обработки данных формы new-item
function createNewCard (evt) {
  evt.preventDefault();

  const newPlace = {};
  newPlace.name = placeInput.value;
  newPlace.link = linkInput.value;
  renderCard(newPlace);
  closePopup();
  placeInput.value = "";//обнуляем значение места в поле ввода
  linkInput.value = "";
  disableSubmitBtn();
}
//Функция переключения лайка
function toggleLikeButton (evt) {
  evt.target.classList.toggle('element__like_active');
}
//Функция удаления карточки
function removeCard (evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.element').remove();
}

function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    console.log(evt.target);
    closePopup()
  }
}
function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

//добавляем слушатель к каждой кнопке закрытия
btnClose.forEach((btn) => {
  btn.addEventListener('click', closePopup);
})


//Обработчик кнопки "создать" добавления карточки
popupNewForm.addEventListener('submit', createNewCard);
//вызываем попап редактирования профиля при клике
popupOpenButton.addEventListener('click', openPropfilePopup);
//Обработчик кнопки "сохранить" редактирования профиля
popupNameForm.addEventListener('submit', handleSubmitForm);
//Обработчик кнопки открытия попапа добавления карточки
profileButton.addEventListener('click', openNewCardPopup);
