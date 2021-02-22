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
const formEditSubmit = formEdit.querySelector('.button_submit');

buttonEdit.addEventListener('click', () => {
  popupOverlay.classList.toggle('popup_opened');
  formInputName.value = profileName.textContent;
  formInputJob.value = profileJob.textContent;
});

popupClose.addEventListener('click', () => {
  popupOverlay.classList.toggle('popup_opened');
});

formEditSubmit.addEventListener('click', e => {
  e.preventDefault();
  profileName.textContent = formInputName.value;
  profileJob.textContent = formInputJob.value;
  popupOverlay.classList.toggle('popup_opened');
});
