'use strict';
import avatarSrc from '../images/avatar.jpg';

const yosemiteImage = new URL('../images/yosemite.jpg', import.meta.url);
const louiseImage = new URL('../images/lake-louise.png', import.meta.url);
const baldImage = new URL('../images/bald-mountains.png', import.meta.url);
const latemarImage = new URL('../images/latemar.png', import.meta.url);
const vanoiseImage = new URL('../images/vanois.png', import.meta.url);
const lagoImage = new URL('../images/lago-di-braies.png', import.meta.url);
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

// Edit profile
export const buttonEdit = document.querySelector('.button_edit');
export const formInputName = document.querySelector('.form__input_name');
export const formInputJob = document.querySelector('.form__input_job');
export const formList = Array.from(document.querySelectorAll('.form'));

export const profileConfig = {
  buttonAddElement: '.button_add',
  buttonEditElement: '.button_edit',
  buttonAvatarElement: '.button_avatar',
};

// Add cards
export const buttonAdd = document.querySelector('.button_add');

export const cardConfig = {
  cardElement: '.card',
  cardTemplateElement: '.card-template',
  cardContainerElement: '.cards',
  cardImageElement: '.card__image',
  cardTitleElement: '.card__title',
  cardButtonElement: '.button_heart',
  cardLikesElement: '.card__likes',
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
  popupCloseClass: 'popup__close',
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
