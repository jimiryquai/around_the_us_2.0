import {
  popupImg,
  popupFigImg,
  popupFigCaption,
  popupImgClose,
} from './index.js';
export default class Card {
  // the contrustor will store dynamic data,
  // each instance will have its own personal data
  constructor(data, cardTemplate) {
    // the name and the link are private fields,
    // they're only needed inside the class
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    // taking the markup from HTML and cloning the element
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector('.card')
      .cloneNode(true);
    // return the DOM element of the card
    return cardElement;
  }

  generateCard() {
    // public method that returns a fully functional card populated with data
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleOpenPopup() {
    popupFigImg.src = this._link;
    popupFigImg.alt = this._name;
    popupFigCaption.textContent = this._name;
    popupImg.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupFigImg.src = '';
    popupFigImg.alt = '';
    popupFigCaption.textContent = '';
    popupImg.classList.remove('popup_opened');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard(e) {
    e.target.classList.toggle('button_heart_liked');
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      // open the popup
      this._handleOpenPopup();
    });

    popupImgClose.addEventListener('click', () => {
      // close the popup
      this._handleClosePopup();
    });

    this._element
      .querySelector('.button_trash')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector('.button_heart')
      .addEventListener('click', e => {
        this._handleLikeCard(e);
      });
  }
}
