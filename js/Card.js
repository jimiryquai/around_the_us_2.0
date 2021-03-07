import { popupConfig, cardConfig } from './index.js';

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
      .content.querySelector(cardConfig.cardElement)
      .cloneNode(true);
    // return the DOM element of the card
    return cardElement;
  }

  generateCard() {
    // public method that returns a fully functional card populated with data
    this._element = this._getTemplate();
    this._image = this._element.querySelector(cardConfig.cardImageElement);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(
      cardConfig.cardTitleElement
    ).textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleOpenPopup() {
    popupConfig.popupFigImg.src = this._link;
    popupConfig.popupFigImg.alt = this._name;
    popupConfig.popupFigCaption.textContent = this._name;
    popupConfig.popupImgElement.classList.add(popupConfig.popupOpenedClass);
  }

  _handleClosePopup() {
    popupConfig.popupFigImg.src = '';
    popupConfig.popupFigImg.alt = '';
    popupConfig.popupFigCaption.textContent = '';
    popupConfig.popupImgElement.classList.remove(popupConfig.popupOpenedClass);
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard(e) {
    e.target.classList.toggle(cardConfig.cardLikedClass);
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      // open the popup
      this._handleOpenPopup();
    });

    popupConfig.buttonElement.addEventListener('click', () => {
      // close the popup
      this._handleClosePopup();
    });

    this._element
      .querySelector(cardConfig.cardDeleteElement)
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(cardConfig.cardLikeElement)
      .addEventListener('click', e => {
        this._handleLikeCard(e);
      });
  }
}
