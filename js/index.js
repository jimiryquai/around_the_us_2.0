'use strict';
// Selector variables
const buttonEdit = document.querySelector('.button_edit');
const popupOverlay = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
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

const popupToggle = () => popupOverlay.classList.toggle('popup_opened');

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
buttonEdit.addEventListener('click', popupToggle);
buttonEdit.addEventListener('click', editFormLoadHandler);
formEdit.addEventListener('submit', editFormSubmitHandler);
formEdit.addEventListener('submit', popupToggle);
popupClose.addEventListener('click', popupToggle);
