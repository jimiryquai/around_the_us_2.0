'use strict';
// Selector variables
const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupsClose = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formInputName = document.querySelector('.form__input_name');
const formInputJob = document.querySelector('.form__input_job');
const formEdit = document.querySelector('.form_type_edit');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

// Cards array
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];

// Reusable functions
const createCard = card => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  return cardElement;
};

const renderCard = card => cardsContainer.prepend(createCard(card));

initialCards.forEach(card => renderCard(card));

const popupToggle = popup => popup.classList.toggle('popup_opened');

const editFormLoadHandler = () => {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
};

const editFormSubmitHandler = e => {
  e.preventDefault();
  profileName.textContent = formInputName.value;
  profileJob.textContent == formInputJob.value;
};

// Event listeners
// Popup toggling
buttonEdit.addEventListener('click', () => {
  popupToggle(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  popupToggle(popupAdd);
});

formEdit.addEventListener('submit', () => {
  popupToggle(popupEdit);
});

popupsClose.forEach(popup => {
  popup.addEventListener('click', e => {
    e.target.classList.contains('popup__close_type_edit') &&
    !e.target.classList.contains('popup__close_type_image')
      ? popupToggle(popupEdit)
      : popupToggle(popupAdd);
  });
});

// Form handling
buttonEdit.addEventListener('click', editFormLoadHandler);
formEdit.addEventListener('submit', editFormSubmitHandler);
