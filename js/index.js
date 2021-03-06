'use strict';
import Card from './Card.js';
// Selector variables
const buttonEdit = document.querySelector('.button_edit');
const buttonAdd = document.querySelector('.button_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_image');
const popupFigImg = popupImg.querySelector('.popup__image');
const popupFigCaption = popupImg.querySelector('.popup__caption');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formInputName = document.querySelector('.form__input_name');
const formInputJob = document.querySelector('.form__input_job');
const formInputTitle = document.querySelector('.form__input_title');
const formInputUrl = document.querySelector('.form__input_url');
const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
// const cardsContainer = document.querySelector('.cards');
// const cardTemplate = document.querySelector('.card-template').content;

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
const renderCard = element => {
  const card = new Card(element, '.card-template').generateCard();
  // Add to the DOM
  document.querySelector('.cards').append(card);
};

initialCards.forEach(item => renderCard(item));

const renderPopupImg = e => {
  popupFigImg.src = e.target.src;
  popupFigImg.alt = e.target.alt;
  popupFigCaption.textContent = e.target.alt;
};

const editFormLoadHandler = () => {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
};

const editFormSubmitHandler = () => {
  profileName.textContent = formInputName.value;
  profileJob.textContent == formInputJob.value;
};

const addFormSubmitHandler = () => {
  // Get values from form inputs
  const title = formInputTitle.value;
  const url = formInputUrl.value;
  // create an object that mimics initialCards structure
  // assign form values to relevant keys
  // pass object into renderCard function
  renderCard({ name: title, link: url });
  formAdd.reset();
};

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
  // closes popup with click on overlay
  popup.addEventListener('click', e => {
    if (e.target.classList.contains('popup_opened')) {
      popupToggle(popup);
    }
  });
  // closes popup with click on overlay
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popupToggle(popup);
    }
  });
  // closes popup with click on close button
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach(popupElement => {
    popupElement.addEventListener('click', e => {
      if (e.target.classList.contains('popup__close_type_edit')) {
        popupToggle(popupElement);
      } else if (e.target.classList.contains('popup__close_type_add')) {
        popupToggle(popupElement);
      } else if (e.target.classList.contains('popup__close_type_image')) {
        popupToggle(popupElement);
      }
    });
  });
}

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

formAdd.addEventListener('submit', () => {
  popupToggle(popupAdd);
});

// Form handling
buttonEdit.addEventListener('click', editFormLoadHandler);
formEdit.addEventListener('submit', editFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);
