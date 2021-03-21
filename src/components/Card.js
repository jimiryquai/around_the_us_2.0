import { cardConfig } from '../utils/constants.js';

export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, userId },
    cardTemplate
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._id = data._id;
    this._user = userId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

    this._delete = this._element.querySelector(cardConfig.cardDeleteElement);
    if (this._owner !== this._user) {
      this._delete.style.display = 'none';
    }

    this._image = this._element.querySelector(cardConfig.cardImageElement);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(
      cardConfig.cardTitleElement
    ).textContent = this._name;
    this._element.querySelector(
      cardConfig.cardLikesElement
    ).textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard(e) {
    e.target.classList.toggle(cardConfig.cardLikedClass);
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      // open the popup
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });

    this._element
      .querySelector(cardConfig.cardDeleteElement)
      .addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });

    this._element
      .querySelector(cardConfig.cardButtonElement)
      .addEventListener('click', e => {
        this._handleLikeCard(e);
      });
  }
}
