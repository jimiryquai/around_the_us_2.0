'use strict';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export const cardConfig = {
  cardElement: '.card',
  cardTemplateElement: '.card-template',
  cardContainerElement: '.cards',
  cardImageElement: '.card__image',
  cardTitleElement: '.card__title',
  cardLikeElement: '.button_heart',
  cardDeleteElement: '.button_trash',
  cardLikedClass: 'button_heart_liked',
};

export const popupConfig = {
  popupElement: '.popup',
  popupImgElement: document.querySelector('.popup_type_image'),
  buttonElement: document.querySelector('.popup__close_type_image'),
  popupFigImg: document.querySelector('.popup__image'),
  popupFigCaption: document.querySelector('.popup__caption'),
  popupOpenedClass: 'popup_opened',
  popupEditCloseClass: 'popup__close_type_edit',
  popupAddCloseClass: 'popup__close_type_add',
};

export const formConfig = {
  formElement: '.form',
  formSetElement: '.form__set',
  inputElement: '.form__input',
  buttonElement: '.button_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};
// validate all forms
(function () {
  const formList = Array.from(
    document.querySelectorAll(formConfig.formElement)
  );
  formList.forEach(form => {
    form = new FormValidator(formConfig, formConfig.formElement);
    form.enableValidation();
  });
})();

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
  const card = new Card(element, cardConfig.cardTemplateElement).generateCard();
  // Add to the DOM
  document.querySelector(cardConfig.cardContainerElement).append(card);
};

initialCards.forEach(item => renderCard(item));

function popupToggle(popup) {
  popup.classList.toggle(popupConfig.popupOpenedClass);
  // closes popup with click on overlay
  popup.addEventListener('click', e => {
    if (e.target.classList.contains(popupConfig.popupOpenedClass)) {
      popupToggle(popup);
    }
  });
  // closes popup with click on overlay
  window.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      popup.classList.contains(popupConfig.popupOpenedClass)
    ) {
      popupToggle(popup);
    }
  });
  // closes popup with click on close button
  const popupList = document.querySelectorAll(popupConfig.popupElement);
  popupList.forEach(popupElement => {
    popupElement.addEventListener('click', e => {
      if (e.target.classList.contains(popupConfig.popupEditCloseClass)) {
        popupToggle(popupElement);
      } else if (e.target.classList.contains(popupConfig.popupAddCloseClass)) {
        popupToggle(popupElement);
      }
    });
  });
}

// Profile editing
(function () {
  const buttonEdit = document.querySelector('.button_edit');
  const popupEdit = document.querySelector('.popup_type_edit');
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');
  const formEdit = document.querySelector('.form_type_edit');
  const formInputName = document.querySelector('.form__input_name');
  const formInputJob = document.querySelector('.form__input_job');

  const editFormLoadHandler = () => {
    formInputName.value = profileName.textContent;
    formInputJob.value = profileJob.textContent;
  };

  const editFormSubmitHandler = () => {
    profileName.textContent = formInputName.value;
    profileJob.textContent = formInputJob.value;
  };

  buttonEdit.addEventListener('click', () => {
    popupToggle(popupEdit);
  });

  formEdit.addEventListener('submit', () => {
    popupToggle(popupEdit);
  });

  buttonEdit.addEventListener('click', editFormLoadHandler);
  formEdit.addEventListener('submit', editFormSubmitHandler);
})();

// Adding cards
(function () {
  const buttonAdd = document.querySelector('.button_add');
  const popupAdd = document.querySelector('.popup_type_add');
  const formInputTitle = document.querySelector('.form__input_title');
  const formInputUrl = document.querySelector('.form__input_url');
  const formAdd = document.querySelector('.form_type_add');

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

  buttonAdd.addEventListener('click', () => {
    popupToggle(popupAdd);
  });

  formAdd.addEventListener('submit', () => {
    popupToggle(popupAdd);
  });
  formAdd.addEventListener('submit', addFormSubmitHandler);
})();
