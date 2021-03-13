import { popupConfig } from '../utils/constants';

export default class Popup {
  //The constructor has a single parameter, which is the popup selector.
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add(popupConfig.popupOpenedClass);
  }

  close(e) {
    this._element.classList.remove(popupConfig.popupOpenedClass);
    e.stopPropagation();
  }

  //It stores a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close(e);
    }
  }
  //It stores a public method named setEventListeners() that adds a click event listener to the close icon of the popup.
  setEventListeners() {
    this._element
      .querySelector(popupConfig.buttonElement)
      .addEventListener('click', e => this.close(e));

    this._element.addEventListener('click', e => {
      if (e.target.classList.contains(popupConfig.popupOpenedClass)) {
        this.close(e);
      }
    });

    window.addEventListener('keydown', e => this._handleEscClose(e));
  }
}
