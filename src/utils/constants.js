'use strict';
import avatarSrc from './images/avatar.jpg';

const yosemiteImage = new URL('./images/yosemite.jpg', import.meta.url);
const louiseImage = new URL('./images/lake-louise.png', import.meta.url);
const baldImage = new URL('./images/bald-mountains.png', import.meta.url);
const latemarImage = new URL('./images/latemar.png', import.meta.url);
const vanoiseImage = new URL('./images/vanois.png', import.meta.url);
const lagoImage = new URL('./images/lago-di-braies.png', import.meta.url);
const avatarImage = document.getElementById('avatar');
avatarImage.src = avatarSrc;

// Cards array
export const initialCards = [
  {
    name: 'Yosemite Valley',
    link: yosemiteImage,
  },
  {
    name: 'Lake Louise',
    link: louiseImage,
  },
  {
    name: 'Bald Mountains',
    link: baldImage,
  },
  {
    name: 'Latemar',
    link: latemarImage,
  },
  {
    name: 'Vanoise National Park',
    link: vanoiseImage,
  },
  {
    name: 'Lago di Braies',
    link: lagoImage,
  },
];
// Image Popup
export const popupImg = document.querySelector('.popup_type_image');
export const popupImgClose = document.querySelector('.popup__close_type_image');
export const popupImgFigImg = document.querySelector('.popup__image');
export const popupImgFigCaption = document.querySelector('.popup__caption');

// Edit profile
export const buttonEdit = document.querySelector('.button_edit');
export const popupEdit = document.querySelector('.popup_type_edit');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const formEdit = document.querySelector('.form_type_edit');
export const formInputName = document.querySelector('.form__input_name');
export const formInputJob = document.querySelector('.form__input_job');
export const formList = Array.from(
  document.querySelectorAll(formConfig.formElement)
);

// Add cards
export const buttonAdd = document.querySelector('.button_add');
export const popupAdd = document.querySelector('.popup_type_add');
export const formInputTitle = document.querySelector('.form__input_title');
export const formInputUrl = document.querySelector('.form__input_url');
export const formAdd = document.querySelector('.form_type_add');

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
  popupImgElement: '.popup_type_image',
  buttonElement: '.popup__close_type_image',
  popupFigImg: '.popup__image',
  popupFigCaption: '.popup__caption',
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
