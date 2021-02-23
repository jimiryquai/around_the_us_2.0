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

// Reusable functions
const popupToggle = () => {
  popupOverlay.classList.toggle('popup_opened');
};

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
