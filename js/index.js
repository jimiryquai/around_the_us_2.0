'use strict';
// Selectors
const buttonEdit = document.querySelector('.button_edit');
const popupOverlay = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formInputName = document.querySelector('.form__input_name');
const formInputJob = document.querySelector('.form__input_job');
const formEdit = document.querySelector('.form_type_edit');

const popupToggle = () => {
  popupOverlay.classList.toggle('popup_opened');
};

const editFormLoadHandler = () => {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
};

const editFormSubmitHandler = () => {
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
};

// Event listeners
buttonEdit.addEventListener('click', () => {
  popupToggle();
  editFormLoadHandler();
});

popupClose.addEventListener('click', () => {
  popupToggle();
});

formEdit.addEventListener('submit', e => {
  e.preventDefault();
  editFormSubmitHandler();
  popupToggle();
});
