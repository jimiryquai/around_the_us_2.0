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
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }

  // this._element.querySelector('.button_trash') = this._buttonTrash;
  // this._element.querySelector('.button_heart') = this.buttonHeart;

  //   cardImage.addEventListener('click', e => {
  //     renderPopupImg(e);
  //     popupToggle(popupImg);
  //   });

  //   buttonTrash.addEventListener('click', e => {
  //     e.target.parentElement.remove();
  //   });

  //   buttonHeart.addEventListener('click', e => {
  //     e.target.classList.toggle('button_heart_liked');
  //   });
}
