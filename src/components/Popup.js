import { popupConfig } from '../utils/constants';

export default class Popup {
  //The constructor has a single parameter, which is the popup selector.
  constructor(popupSelector) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add(popupConfig.popupOpenedClass);
  }

  close() {
    this._popupElement.classList.remove(popupConfig.popupOpenedClass);
  }

  //It stores a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.
  _handleEscClose() {
    window.addEventListener('keydown', e => {
      if (
        e.key === 'Escape' &&
        this._popupElement.classList.contains(popupConfig.popupOpenedClass)
      ) {
        this._popupElement.close();
      }
    });
  }
  //It stores a public method named setEventListeners() that adds a click event listener to the close icon of the popup.
  setEventListeners() {
    this._popup
      .querySelector(popupConfig.popupCloseClass)
      .addEventListener('click', () => this._popup.close());
  }
}
